# NihongoPlatform 🇯🇵 · Plataforma Web de Aprendizaje de Japonés (JLPT N5 - N1)

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase / PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com/)

Plataforma web interactiva para el aprendizaje autodidacta y guiado del idioma japonés, estructurada según los estándares del **JLPT (Japanese Language Proficiency Test)** desde nivel principiante (**N5**) hasta maestría avanzada (**N1**).

La plataforma combina mecánicas de **gamificación** (rachas diarias, puntos de experiencia XP, niveles y avatares temáticos) con un **Sistema de Repaso Espaciado (SRS)** basado en la curva del olvido de Ebbinghaus para optimizar la retención a largo plazo de kanjis y vocabulario.

---

## 📁 Estructura del Repositorio

```text
├── DATABASE/                 # Arquitectura conceptual del modelo relacional
├── PLAN DE ESTUDIO/          # Plan pedagógico y currículo de cero a JLPT N1
└── plataforma-web/           # Aplicación Web Frontend & Backend (Next.js 16 + React 19)
    ├── database/             # Script SQL de producción (PostgreSQL / Supabase + RLS)
    ├── src/
    │   ├── app/              # Next.js App Router (Layout, Páginas y API de Streaming de Audio)
    │   ├── components/       # Componentes modulares (Dashboard, CurriculumMap, ActiveLesson, SRSReview)
    │   ├── lib/              # Motor SRS matemático, utilidades y Audio Engine
    │   └── types/            # Interfaces estrictas en TypeScript
    ├── package.json          # Dependencias y scripts de ejecución
    └── README.md             # Documentación técnica específica del frontend
```

---

## 🚀 Características Principales

### 1. Dashboard Principal y Gamificación
* **Resumen de Perfil:** Saludo dinámico, avatar temático japonés personalizable y nivel actual.
* **Barra de Experiencia (XP):** Seguimiento porcentual del avance hacia el siguiente nivel.
* **Contador de Racha (Streaks):** Registro visual de constancia diaria (fuego animado) y calendario semanal.
* **Call to Action de Repaso Diario:** Contador inteligente de tarjetas pendientes para hoy con desglose por categoría (Kanji, Vocabulario, Gramática) y tiempo estimado de sesión.
* **Pirámide de Retención SRS:** Monitor en tiempo real de ítems según su estado de afianzamiento en la memoria (Aprendiz, Gurú, Maestro, Dominado).

### 2. Mapa de Estudios (Árbol de Habilidades)
* **Ruta de Aprendizaje Secuencial:** Cubre desde el **Módulo 0: Fundamentos (Hiragana/Katakana)**, pasando por **N5**, **N4**, **N3**, **N2** hasta **N1**.
* **Bloqueo Progresivo:** Los niveles avanzados permanecen visualmente bloqueados con candado y requisitos explícitos hasta que el estudiante domina los módulos previos.
* **Nodos de Lección:** Diferenciación visual por tipología (escritura, gramática, kanji y vocabulario) con recompensas de XP y porcentajes de completitud.

### 3. Interfaz de Lección Activa
* **Entorno Minimalista:** Diseñado para la concentración del estudiante sin distracciones.
* **Visualización de Caracteres:** Kanjis de gran escala con lecturas en Furigana/Hiragana y Romaji.
* **Ejercicios Interactivos:** Preguntas de opción múltiple con validación instantánea, explicaciones gramaticales contextuales y efectos de sonido para aciertos y errores.
* **Audio Nativo Integrado:** Reproducción de pronunciación fonética nativa japonesa con indicador visual de onda.

### 4. Sistema de Repaso Espaciado (SRS Flashcards)
* **Tarjetas Reversibles:** Anverso con el término japonés; reverso con significado en español, frases de ejemplo de uso cotidiano y reglas mnemotécnicas.
* **Autoevaluación Inteligente de 3 Botones:**
  * **Difícil:** Reinicia o reduce el intervalo a horas para afianzar la memoria ante olvidos.
  * **Bien:** Avance estándar de consolidación en la curva de memoria.
  * **Fácil:** Salto acelerado para términos plenamente dominados.
* **Atajos de Teclado:** Tecla `Espacio` para girar la tarjeta; teclas `1`, `2` y `3` para calificar con rapidez.

### 5. Motor de Audio Híbrido
* **Soporte para MP3 Nativos:** Transmisión fluida de grabaciones originales de alta fidelidad.
* **Fallback Fonético Japonés (Web Speech API):** Limpieza automática de tildes fonéticas (`〜`), corchetes y notas romaji para garantizar locución fluida con voces nativas japonesas (`ja-JP`).
* **Efectos de Sonido Sintetizados (Web Audio API):** Acordes musicales de acierto, tonos de advertencia y fanfarrias de nivel generadas proceduralmente en el navegador sin consumir ancho de banda.

### 6. Perfiles Independientes por Dispositivo
* Detección automática al abrir la aplicación en un nuevo dispositivo o navegador.
* Asistente de bienvenida para personalizar nombre, avatar y meta diaria, persistiendo el progreso de manera segura en almacenamiento local (`localStorage`).

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) |
| **Librería de UI** | [React 19](https://react.dev/) |
| **Lenguaje** | [TypeScript 5](https://www.typescriptlang.org/) (Tipado estricto) |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com/) (Tema oscuro de alto contraste) |
| **Iconografía** | [Lucide React](https://lucide.dev/) |
| **Base de Datos** | [PostgreSQL](https://www.postgresql.org/) / [Supabase](https://supabase.com/) (Esquema relacional con RLS e índices) |
| **Alojamiento** | [Cloudflare Pages](https://pages.cloudflare.com/) |

---

## 🧠 Algoritmo de Repaso Espaciado (SRS)

El sistema se basa en 9 niveles de memoria divididos en 4 etapas pedagógicas:

| Nivel | Etapa | Intervalo de Repaso | Descripción |
| :---: | :--- | :---: | :--- |
| **1** | Aprendiz I | **4 horas** | Fase inicial de introducción del término. |
| **2** | Aprendiz II | **8 horas** | Primer refuerzo de retención inmediata. |
| **3** | Aprendiz III | **24 horas (1 día)** | Consolidación diaria básica. |
| **4** | Gurú I | **48 horas (2 días)** | Salto a la memoria a medio plazo. |
| **5** | Gurú II | **1 semana (7 días)** | Afianzamiento semanal. |
| **6** | Gurú III | **2 semanas (14 días)** | Retención quincenal estable. |
| **7** | Maestro I | **1 mes (30 días)** | Entrada a la memoria de largo plazo. |
| **8** | Maestro II | **4 meses (120 días)** | Consolidación semestral. |
| **9** | Dominado (*Burned*) | **1 año (365 días)** | Término plenamente internalizado. |

---

## 🗄️ Modelo de Base de Datos (`plataforma-web/database/schema.sql`)

El esquema relacional está diseñado para soportar millones de registros con políticas de seguridad **Row Level Security (RLS)**:

* **`users`:** Perfiles, XP acumulado, rachas y meta diaria de tarjetas.
* **`lessons`:** Currículo estructurado por nivel JLPT con contenido en JSONB.
* **`user_progress`:** Rastreo del árbol de habilidades y lecciones completadas.
* **`study_items`:** Catálogo universal de kanjis, vocabulario y gramática con lecturas y audios.
* **`user_srs_reviews`:** Fechas de revisión programada, niveles de memoria (1-9) y conteo de aciertos/fallos.

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
* **Node.js** v18.18.0 o superior
* **npm** o **pnpm**

### Pasos
```bash
# 1. Entrar en la carpeta de la plataforma web
cd plataforma-web

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ☁️ Despliegue en Cloudflare Pages

Esta plataforma está lista para desplegarse de manera continua en **Cloudflare Pages**:

### Método 1: Conexión Git (Recomendado)
1. Sube este proyecto a tu cuenta de **GitHub**.
2. Entra en tu consola de [Cloudflare Dashboard](https://dash.cloudflare.com/) y dirígete a **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Selecciona tu repositorio de GitHub.
4. Configura los parámetros de compilación:
   * **Framework preset:** `Next.js`
   * **Root directory:** `plataforma-web`
   * **Build command:** `npm run build`
   * **Build output directory:** `.next`
5. Haz clic en **Save and Deploy**. Cloudflare generará tu dominio público seguro con HTTPS y red CDN global automática.

### Gestión de Multimedia en Producción (Cloudflare R2):
Para bibliotecas de audio extensas (como las grabaciones de exámenes JLPT), la mejor práctica en Cloudflare es alojar los archivos `.mp3` en un bucket de **Cloudflare R2** (con 10 GB gratuitos y cero tarifas por transferencia de datos / *zero egress fees*) y vincular las URLs en la base de datos o en `mockData.ts`.

---

## 📄 Licencia

Este proyecto está disponible bajo la licencia **MIT**. Eres libre de usarlo, modificarlo y adaptarlo con fines educativos y de desarrollo personal.

