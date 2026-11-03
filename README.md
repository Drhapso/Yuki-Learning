# Yuki Learning 🌸 · Plataforma Web de Aprendizaje de Japonés (JLPT N5 - N1)

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase / PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com/)
[![Cloudflare R2](https://img.shields.io/badge/Storage-Cloudflare_R2-F38020?style=flat&logo=cloudflare)](https://www.cloudflare.com/products/r2/)

**Yuki Learning (雪ラーニング)** es una plataforma web moderna, inmersiva y de alto rendimiento para el aprendizaje integral del idioma japonés. Diseñada para guiar al estudiante de manera progresiva y natural desde los fundamentos absolutos de la escritura silábica (**Hiragana y Katakana**) hasta la maestría de los exámenes oficiales del **JLPT (Japanese Language Proficiency Test)** desde nivel **N5** hasta **N1**.

La plataforma fusiona principios de **ciencia del aprendizaje**, mecánicas de **gamificación adictiva positiva** (puntos XP, niveles, rachas diarias, avatares fotográficos personalizables) y un **Sistema de Repaso Espaciado (SRS)** matemáticamente calibrado para garantizar la retención a largo plazo sin saturación cognitiva.

---

## 🌟 Pilares y Características Principales

### 1. 📊 Dashboard Principal y Gamificación Positiva
* **Perfil de Usuario Personalizable:** Soporte para carga de fotografía personal desde el dispositivo (procesada en tiempo real a Base64 con cuotas de seguridad) o selección de avatares temáticos tradicionales.
* **Barra de Nivel y Experiencia (XP):** Progresión dinámica calculada en tiempo real. Cada acierto y lección completada otorga experiencia que desbloquea nuevos rangos.
* **Racha de Días (Streaks):** Registro visual interactivo de constancia diaria (fuego animado) y calendario semanal con récord histórico.
* **Call to Action Inteligente (SRS Diario):** Widget central que analiza la base de datos y avisa cuántas tarjetas vencen hoy, desglosadas por categoría (*Kanji*, *Vocabulario*, *Gramática*) con tiempo estimado de sesión.
* **Pirámide de Retención SRS:** Desglose en vivo de la memoria del estudiante en 4 etapas (*Aprendiz*, *Gurú*, *Maestro*, *Dominado*).
* **Siguiente Lección Recomendada:** Identificación algorítmica de la unidad exacta que el estudiante debe cursar a continuación, arrancando siempre desde la Lección 1 en perfiles nuevos.

### 2. 🗺️ Mapa de Estudios (Árbol de Habilidades Secuencial)
* **Currículo Completo de 0 a N1:**
  * **Módulo 0: Fundamentos (Intro):** Hiragana, Katakana, Diacríticos Dakuten/Handakuten y Chōonpu (ー).
  * **Módulo 1: Principiante Básico (JLPT N5):** Demostrativos, Cópula *Desu*, Partículas (*wa*, *ga*, *wo*, *ni*, *de*), Verbos formales (*-masu*) y Forma *-Te*.
  * **Módulo 2: Básico Superior (JLPT N4):** Lenguaje informal, formas de diccionario, condicionales y comparaciones.
  * **Módulos 3 a 5 (JLPT N3 - N1):** Nivel intermedio a nativo profesional (comprensión auditiva avanzada, expresiones honoríficas *Keigo* y matices complejos).
* **Bloqueo Progresivo Real:** Los niveles y lecciones superiores permanecen bloqueados hasta completar secuencialmente los requisitos previos, protegiendo al alumno de saltos abrumadores.

### 3. 📖 Interfaz de Lección Activa en 2 Fases (Anti-Spoilers)
* **Fase 1: Tarjeta Teórica Dinámica y Mnemotécnica:**
  * Concepto clave concreto sin paredes de texto aburridas.
  * Regla o fórmula gramatical destacada.
  * Puntos clave en viñetas directas.
  * Ejemplos prácticos contextuales con audio nativo en streaming.
* **Fase 2: Práctica Guiada Anti-Spoilers:**
  * Preguntas con enmascaramiento estricto (`わたし [ ? ] がくせいです。`), eliminando cualquier revelación accidental de la respuesta en textos secundarios o romaji.
  * Botones de opción múltiple con respuesta y sonido en tiempo real.
  * Revelación post-respuesta con lectura completa, traducción al español y explicación pedagógica del porqué de la respuesta.

### 4. 🧠 Sistema de Repaso Espaciado (SRS Flashcards)
* **Algoritmo de 9 Niveles de Memoria:** Basado en la curva del olvido de Ebbinghaus y el método Leitner.
* **Persistencia Atómica Local:** Cada calificación se guarda de inmediato en el almacenamiento del dispositivo (`localStorage`), garantizando que al refrescar la página no se pierdan las fechas ni el progreso acumulado.
* **Autoevaluación de 3 Botones:**
  * **Difícil:** Reduce el intervalo a horas para afianzar el concepto inmediatamente.
  * **Bien:** Avanza de forma regular en la curva de retención.
  * **Fácil:** Duplica el avance del intervalo para términos dominados.
* **Atajos de Teclado:** Barra espaciadora para voltear; números `1`, `2` y `3` para calificar al instante.

### 5. 🔊 Motor de Audio Híbrido (Yuki Audio Engine)
* **Streaming de Audios Nativos:** Transmisión de grabaciones originales en alta fidelidad (`/api/audio/[...path]`) o desde almacenamiento en la nube **Cloudflare R2**.
* **Síntesis Fonética Nativa (Web Speech API):** Limpieza preventiva de caracteres problemáticos (`〜`, corchetes, notas) y selección automática de voces nativas japonesas (`ja-JP`).
* **Efectos de Sonido Procedurales (Web Audio API):** Acordes pentatónicos de acierto, tonos de error y fanfarrias sintetizadas en el navegador con cero consumo de ancho de banda.

---

## 📁 Arquitectura del Proyecto

```text
├── DATABASE/                 # Arquitectura conceptual del modelo relacional
├── PLAN DE ESTUDIO/          # Plan curricular pedagógico de cero a JLPT N1
├── ESCRITURA/                # Manuales de trazos de Hiragana y Katakana
├── VOCABULARIO/              # Diccionarios ilustrados temáticos por categorías
├── MANUALES INDEPENDIENTES/  # Guías de referencia (Tae Kim, Cardona, gramática)
└── plataforma-web/           # Aplicación Web Frontend & Backend (Next.js 16 + React 19)
    ├── database/             # Script SQL de producción (PostgreSQL / Supabase + RLS)
    ├── src/
    │   ├── app/              # Next.js App Router (Layout, Páginas y API de Streaming)
    │   ├── components/       # Dashboard, CurriculumMap, ActiveLesson, SRSReview, Modal
    │   ├── lib/              # Motor SRS, almacenamiento local seguro y Audio Engine
    │   └── types/            # Tipos estrictos en TypeScript
    ├── package.json          # Dependencias (Next.js 16.4, React 19, Lucide, Tailwind)
    └── README.md             # Documentación técnica específica del frontend
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework Web** | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) | Servidor rápido, SSR y rutas de API optimizadas |
| **Librería UI** | [React 19](https://react.dev/) | Componentes reactivos desacoplados |
| **Tipado** | [TypeScript 5](https://www.typescriptlang.org/) | Robustez y prevención de errores en compilación |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com/) | Diseño responsivo en tema oscuro moderno |
| **Iconos** | [Lucide React](https://lucide.dev/) | Iconografía minimalista |
| **Base de Datos** | [PostgreSQL](https://www.postgresql.org/) / [Supabase](https://supabase.com/) | Esquema relacional con Row Level Security (RLS) |
| **Hosting Web** | [Cloudflare Pages](https://pages.cloudflare.com/) | Alojamiento perimetral ultra rápido con CDN global |
| **Almacenamiento CDN**| [Cloudflare R2](https://www.cloudflare.com/products/r2/) | Alojamiento de gigabytes de audio y PDF con **0 tarifas por egress** |

---

## ☁️ Integración con Cloudflare R2 y Sincronización de Recursos

Dado que el repositorio de GitHub no debe almacenar gigabytes de archivos de audio binarios (`.mp3`) o PDFs pesados (límite de 100 MB por archivo en GitHub), los recursos multimedia adicionales se alojan en **Cloudflare R2** (compatible con la API de Amazon S3 y con 10 GB gratuitos sin costo de transferencia saliente).

### ¿Por qué Cloudflare R2?
1. **Cero costos por transferencia (Zero Egress Fees):** A diferencia de AWS S3 o Google Cloud Storage, Cloudflare R2 no cobra por gigabyte descargado por tus estudiantes al escuchar audios.
2. **Latencia mínima:** Los audios se distribuyen a través de la red perimetral de Cloudflare en más de 300 ciudades del mundo.
3. **Dominio personalizado:** Puedes conectar un subdominio propio como `https://assets.yukilearning.com` o usar la URL pública del bucket `https://pub-xxxxxxxx.r2.dev`.

---

### Paso a Paso para Cargar y Sincronizar Recursos a R2:

#### 1. Crear el Bucket en Cloudflare
1. Inicia sesión en el [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. En el menú lateral izquierdo, ve a **R2** → Haz clic en **Create bucket**.
3. Nombra tu bucket (ejemplo: `yuki-learning-resources`) y selecciona la ubicación predeterminada (automática).
4. En la pestaña **Settings** del bucket, ve a la sección **Public Access** y haz clic en **Allow Access** para habilitar el dominio público R2 (`.r2.dev`) o conecta tu propio dominio personalizado (ej. `assets.tudominio.com`).

#### 2. Cargar Recursos usando la Interfaz Web (Fácil)
* Si vas a cargar carpetas específicas como lecciones de audio o libros de gramática:
  * Entra en tu bucket `yuki-learning-resources` en el panel de Cloudflare.
  * Haz clic en **Upload** → **Upload Folder** o arrastra directamente las carpetas (`GRAMATICA/`, `AUDIO/`, etc.).

#### 3. Sincronización Automática por Línea de Comandos (Recomendado para Grandes Volúmenes)
Para sincronizar automáticamente carpetas completas desde tu computadora hacia Cloudflare R2 sin límites de navegador:

##### Opción A: Usando `rclone` (La herramienta más rápida)
1. Instala `rclone` en tu sistema:
   ```bash
   winget install Rclone.Rclone
   ```
2. Genera un token de API de R2 en Cloudflare Dashboard (**R2** → **Manage R2 API Tokens** → **Create API Token** con permisos de lectura y escritura).
3. Configura el archivo `rclone.conf` con las credenciales S3 compatibles de R2:
   ```ini
   [r2]
   type = s3
   provider = Cloudflare
   access_key_id = <TU_ACCESS_KEY_ID>
   secret_access_key = <TU_SECRET_ACCESS_KEY>
   endpoint = https://<TU_ACCOUNT_ID>.r2.cloudflarestorage.com
   no_check_bucket = true
   ```
4. Ejecuta el comando de sincronización:
   ```bash
   # Sincroniza la carpeta local de audios de gramática con tu bucket de R2
   rclone sync "./GRAMATICA" "r2:yuki-learning-resources/gramatica" --progress

   # Sincroniza el entrenamiento y audios de exámenes JLPT
   rclone sync "./ENTRENAMIENTO JLPT" "r2:yuki-learning-resources/entrenamiento-jlpt" --progress
   ```

##### Opción B: Usando AWS CLI
```bash
# Sincronizar audios locales a Cloudflare R2
aws s3 sync "./GRAMATICA" s3://yuki-learning-resources/gramatica --endpoint-url https://<TU_ACCOUNT_ID>.r2.cloudflarestorage.com
```

#### 4. Conectar los Audios de R2 con la Plataforma Web
En `plataforma-web`, puedes definir una variable de entorno en tu archivo `.env.local` (y en las variables de entorno de Cloudflare Pages):

```env
NEXT_PUBLIC_R2_AUDIO_BASE_URL=https://assets.yukilearning.com
# o el subdominio público directo:
# NEXT_PUBLIC_R2_AUDIO_BASE_URL=https://pub-xxxxxxxxxxxxxxxx.r2.dev
```

En el código de la plataforma, si un audio tiene la URL `/api/audio/...`, puedes cambiarlo a `${process.env.NEXT_PUBLIC_R2_AUDIO_BASE_URL}/audio/leccion_01.mp3`, garantizando que la reproducción sea instantánea directamente desde la CDN de Cloudflare R2 sin sobrecargar tu servidor.

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
* **Node.js** v18.18.0 o superior
* **npm**, **pnpm** o **yarn**

### Comandos de Inicialización:
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/yuki-learning.git
cd yuki-learning

# 2. Entrar a la aplicación web
cd plataforma-web

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo local
npm run dev
```

Abre en tu navegador [http://localhost:3000](http://localhost:3000) para acceder a Yuki Learning.

Para compilar y verificar la build de producción:
```bash
npm run build
npm run start
```

---

## 🚀 Despliegue en Cloudflare Pages

1. Sube tu código a un repositorio en **GitHub**.
2. En tu panel de **Cloudflare Dashboard**, dirígete a **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Selecciona tu repositorio de GitHub `yuki-learning`.
4. Especifica la configuración de compilación:
   * **Framework preset:** `Next.js`
   * **Root directory:** `plataforma-web`
   * **Build command:** `npm run build`
   * **Build output directory:** `.next`
5. Haz clic en **Save and Deploy**. Cloudflare publicará tu sitio con certificado SSL automático y alta disponibilidad global.

---

## 📄 Licencia

Este proyecto se encuentra distribuido bajo la licencia **MIT**. Puedes utilizarlo libremente con fines educativos, personales y adaptaciones de código abierto.
