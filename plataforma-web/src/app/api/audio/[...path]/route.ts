import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API ROUTE: STREAMING DE AUDIO LOCAL Y MULTIMEDIA (OPCIÓN A)
 * 
 * Permite servir bajo demanda cualquiera de los 5,503 archivos MP3 del repositorio
 * (GRAMATICA, IRODORI, MARUGOTO, NHKWORLD, ENTRENAMIENTO JLPT) directamente al navegador
 * con soporte para cabeceras HTTP Range (Seeking y reproducción fluida),
 * sin duplicar los 4.13 GB dentro de public/.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: rawSegments = [] } = await context.params;
    // Decodificar segmentos de URL (ej. espacios '%20', caracteres especiales)
    const decodedSegments = rawSegments.map((segment) => decodeURIComponent(segment));

    // Determinar la raíz de los recursos del proyecto (directorio superior a plataforma-web)
    const projectRoot = path.resolve(process.cwd(), '..');
    const localPublicAudio = path.resolve(process.cwd(), 'public');

    // Construir la ruta absoluta objetivo
    let targetFilePath = path.resolve(projectRoot, ...decodedSegments);

    // Si no existe en la raíz de recursos, buscar en public/
    if (!fs.existsSync(targetFilePath)) {
      targetFilePath = path.resolve(localPublicAudio, ...decodedSegments);
    }

    // Validación de seguridad: evitar Directory Traversal fuera de la raíz del proyecto
    const relativeToProject = path.relative(projectRoot, targetFilePath);
    if (relativeToProject.startsWith('..') && !targetFilePath.startsWith(localPublicAudio)) {
      return NextResponse.json(
        { error: 'Acceso no autorizado a la ruta del archivo.' },
        { status: 403 }
      );
    }

    // Verificar si el archivo existe
    if (!fs.existsSync(targetFilePath) || !fs.statSync(targetFilePath).isFile()) {
      return NextResponse.json(
        { error: 'Archivo de audio no encontrado.', requestedPath: decodedSegments.join('/') },
        { status: 404 }
      );
    }

    const stat = fs.statSync(targetFilePath);
    const fileSize = stat.size;
    const rangeHeader = request.headers.get('range');

    // Soporte para HTTP 206 Partial Content (Streaming y búsqueda en la barra de tiempo)
    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return new NextResponse(null, {
          status: 416,
          headers: { 'Content-Range': `bytes */${fileSize}` },
        });
      }

      const chunksize = end - start + 1;
      const fileStream = fs.createReadStream(targetFilePath, { start, end });

      // Convertir Node ReadableStream a Web ReadableStream
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on('data', (chunk) => controller.enqueue(chunk));
          fileStream.on('end', () => controller.close());
          fileStream.on('error', (err) => controller.error(err));
        },
      });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Respuesta estándar (200 OK) para descarga completa
    const fileStream = fs.createReadStream(targetFilePath);
    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk));
        fileStream.on('end', () => controller.close());
        fileStream.on('error', (err) => controller.error(err));
      },
    });

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        'Content-Length': fileSize.toString(),
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error al transmitir audio:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar el audio.' },
      { status: 500 }
    );
  }
}
