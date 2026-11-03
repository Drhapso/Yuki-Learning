# Yuki Learning 🌸 · Plataforma Web Frontend (Next.js 16 + React 19)

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com/)

Código fuente de la aplicación cliente y API de **Yuki Learning (雪ラーニング)**, una plataforma web moderna para aprender japonés desde cero hasta el nivel **JLPT N1**, con mecánicas de gamificación, currículo dinámico por niveles, lecciones en 2 fases sin spoilers y Sistema de Repaso Espaciado (SRS).

---

## 🏗️ Arquitectura de Componentes

* **`src/app/`**: Next.js App Router (Layout principal, página de inicio y endpoint de streaming de audio `/api/audio/[...path]`).
* **`src/components/`**:
  * **`Dashboard.tsx`**: Panel principal con racha diaria, barra de XP, resumen de tarjetas pendientes, desglose de etapas SRS y lección recomendada dinámica.
  * **`CurriculumMap.tsx`**: Árbol de habilidades con niveles desde Introducción (Hiragana/Katakana) hasta JLPT N1, bloqueo interactivo y recompensas de experiencia.
  * **`ActiveLesson.tsx`**: Interfaz de lección en dos fases:
    * *Fase 1*: Tarjeta teórica dinámica con conceptos clave, mnemotecnia, fórmulas gramaticales y ejemplos con audio.
    * *Fase 2*: Quizzes interactivos con enmascaramiento anti-spoilers (`わたし [ ? ] がくせいです。`), audio y explicaciones contextuales.
  * **`SRSReview.tsx`**: Interfaz de tarjetas de memoria (Flashcards) con anverso/reverso, calificación de 3 botones (Fácil, Bien, Difícil), atajos de teclado y persistencia inmediata.
  * **`ProfileSetupModal.tsx`**: Asistente de perfil que permite cargar fotografías personalizadas del usuario (<2.5 MB) con conversión a Base64 y vista previa en tiempo real.
* **`src/lib/`**:
  * **`storage.ts`**: Motor de persistencia en `localStorage` para perfil, currículo dinámico y mazo SRS.
  * **`srs.ts`**: Algoritmo matemático SRS (curva de olvido con 9 niveles de retención).
  * **`audio.ts`**: Yuki Audio Engine híbrido con Web Speech API (fonética japonesa limpia) y Web Audio API (efectos de sonido sintetizados).
  * **`lessonsData.ts`**: Contenido pedagógico estructurado para lecciones de Hiragana, Katakana, demostrativos, partículas (*wa*, *ga*, *wo*), verbos en *-masu*, primeros kanjis y la forma *-Te*.
* **`src/types/`**: Definiciones completas de interfaces TypeScript.
* **`database/schema.sql`**: Esquema relacional PostgreSQL / Supabase con Row Level Security (RLS).

---

## 🚀 Puesta en Marcha

```bash
# Instalar dependencias
npm install

# Iniciar entorno de desarrollo
npm run dev

# Compilar para producción (Next.js Turbopack)
npm run build
```

---

## ☁️ Despliegue en Cloudflare Pages

1. Conecta tu repositorio de GitHub en Cloudflare Dashboard.
2. Parámetros de compilación:
   * **Framework preset:** `Next.js`
   * **Root directory:** `plataforma-web`
   * **Build command:** `npm run build`
   * **Build output directory:** `.next`
3. Almacenamiento de audios pesados: Utiliza **Cloudflare R2** para servir archivos `.mp3` de alta fidelidad sin costes por transferencia de datos.
