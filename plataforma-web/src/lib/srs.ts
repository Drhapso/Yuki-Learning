import { SRSRating, NextReviewCalculation } from '../types';

/**
 * Tabla de intervalos de tiempo en horas según el nivel de memoria (1-9)
 * Basado en la curva del olvido de Ebbinghaus y estándares tipo WaniKani / Leitner:
 * 
 * Nivel 1: 4 horas           -> Aprendiz I
 * Nivel 2: 8 horas           -> Aprendiz II
 * Nivel 3: 24 horas (1 día)  -> Aprendiz III
 * Nivel 4: 48 horas (2 días) -> Gurú I
 * Nivel 5: 168 horas (7 días / 1 semana) -> Gurú II
 * Nivel 6: 336 horas (14 días / 2 semanas) -> Gurú III
 * Nivel 7: 720 horas (30 días / 1 mes) -> Maestro I
 * Nivel 8: 2,880 horas (120 días / 4 meses) -> Maestro II
 * Nivel 9: 8,760 horas (365 días / 1 año - Dominado / Burned)
 */
export const INTERVALOS_SRS_HORAS: Record<number, number> = {
  1: 4,
  2: 8,
  3: 24,
  4: 48,
  5: 168,
  6: 336,
  7: 720,
  8: 2880,
  9: 8760,
};

/**
 * Retorna la etapa estética y pedagógica según el nivel de memoria SRS (1-9)
 */
export function getEtapaSRS(nivel: number): 'Aprendiz' | 'Gurú' | 'Maestro' | 'Iluminado' {
  if (nivel <= 3) return 'Aprendiz';
  if (nivel <= 6) return 'Gurú';
  if (nivel <= 8) return 'Maestro';
  return 'Iluminado';
}

/**
 * Formatea el intervalo numérico en horas a una etiqueta amigable y concisa en español
 */
export function formatIntervalo(horas: number): string {
  if (horas < 24) return `${horas}h`;
  const dias = Math.round(horas / 24);
  if (dias < 30) return `${dias}d`;
  const meses = Math.round(dias / 30);
  if (meses < 12) return `${meses}m`;
  const anios = Math.round(meses / 12);
  return `${anios}a`;
}

/**
 * Fase 3: Lógica Base del SRS
 * 
 * Calcula el nuevo nivel de memoria (1 a 9) y la fecha exacta en la que el usuario debe volver a ver esa tarjeta.
 * 
 * Reglas Pedagógicas del Algoritmo:
 * - "facil": Acelera la retención. Salta +2 niveles en etapas tempranas (1-4) o +1 en etapas superiores.
 * - "bien": Avance estándar de consolidación (+1 nivel hacia el dominio).
 * - "dificil": Penalización por olvido o duda. En niveles tempranos reinicia a 1 o retrocede 1;
 *              en niveles altos (>4) retrocede 2 niveles para re-afianzar la curva de memoria.
 * 
 * @param nivelMemoriaActual Nivel actual del ítem entre 1 y 9
 * @param botonSeleccionado Calificación de autoevaluación: 'facil' | 'bien' | 'dificil'
 * @param fechaReferencia Fecha base para el cálculo (por defecto la fecha y hora actual)
 */
export function calculateNextReview(
  nivelMemoriaActual: number,
  botonSeleccionado: SRSRating,
  fechaReferencia: Date = new Date()
): NextReviewCalculation {
  // Asegurar rango base entre 1 y 9
  const nivelSeguro = Math.min(Math.max(1, Math.round(nivelMemoriaActual)), 9);
  let nuevoNivel: number;

  switch (botonSeleccionado) {
    case 'facil':
      // Si la tarjeta resulta trivial, avanzamos rápidamente
      nuevoNivel = nivelSeguro <= 4 ? Math.min(9, nivelSeguro + 2) : Math.min(9, nivelSeguro + 1);
      break;

    case 'bien':
      // Consolidación normal en la curva de Ebbinghaus
      nuevoNivel = Math.min(9, nivelSeguro + 1);
      break;

    case 'dificil':
      // Penalización por olvido o vacilación
      if (nivelSeguro <= 2) {
        nuevoNivel = 1;
      } else if (nivelSeguro <= 4) {
        nuevoNivel = Math.max(1, nivelSeguro - 1);
      } else {
        // En niveles avanzados, el fallo reduce 2 niveles para reforzar antes de olvidar por completo
        nuevoNivel = Math.max(1, nivelSeguro - 2);
      }
      break;

    default:
      nuevoNivel = nivelSeguro;
  }

  const horasHastaRevision = INTERVALOS_SRS_HORAS[nuevoNivel] || 4;
  const fechaProximaRevision = new Date(fechaReferencia.getTime() + horasHastaRevision * 60 * 60 * 1000);

  return {
    nuevoNivel,
    horasHastaRevision,
    fechaProximaRevision,
    etiquetaIntervalo: formatIntervalo(horasHastaRevision),
    etapaSRS: getEtapaSRS(nuevoNivel),
  };
}
