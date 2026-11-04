# Yuki Learning 🌸 · Código Fuente Frontend (Next.js 16 + React 19)

[![Versión](https://img.shields.io/badge/Versión-v1.0.1_Estable-emerald?style=flat&logo=github)](https://github.com/Drhapso/Yuki-Learning)
[![Despliegue](https://img.shields.io/badge/Cloudflare_Pages-En_Línea-success?style=flat&logo=cloudflare)](https://yuki-learning.pages.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-purple?style=flat)](../LICENSE)

Código fuente y componentes cliente de **Yuki Learning (雪ラーニング)**, plataforma web interactiva y responsiva para el aprendizaje y certificación del idioma japonés (JLPT N5 a N1) con gamificación, repetición espaciada (SRS), simulador oficial de exámenes y sincronización multidispositivo.

🌐 **Sitio Web en Producción:** [https://yuki-learning.pages.dev](https://yuki-learning.pages.dev)

> 📖 **Para la guía técnica completa de arquitectura, modelo de base de datos relacional y configuración con Cloudflare R2:**  
> 👉 Consulta el documento **[DOCUMENTACION_TECNICA.md](../docs/DOCUMENTACION_TECNICA.md)** en el directorio `docs/`.

---

## 🏗️ Módulos y Componentes de la Aplicación

* **`src/components/`**:
  * **`IntroSplash.tsx`**: Apertura cinematográfica con video transparente (WebM con canal alfa y MP4 H.264 pre-acelerado a 3s) que flota sobre una capa translúcida con *backdrop blur*.
  * **`Dashboard.tsx`**: Panel principal con racha diaria, medidor de XP, lección recomendada, resumen pedagógico SRS y acceso directo a simuladores de examen.
  * **`CurriculumMap.tsx`**: Árbol de habilidades con niveles desde Introducción (Hiragana/Katakana) hasta N1 con bloqueo dinámico y dependencias curriculares.
  * **`JLPTExamSimulator.tsx`**: Simulador oficial de exámenes reales de JLPT (N4, N3, N2, N1) con cronómetro regresivo oficial, sección de escucha *Choukai* con audios nativos en MP3, comprensión lectora *Dokkai* y cálculo de puntajes con baremo de corte por sección de 19 puntos.
  * **`ActiveLesson.tsx`**: Interfaz de lección en dos fases (Fase 1: Tarjeta teórica interactiva; Fase 2: Quiz anti-spoilers con retroalimentación inmediata).
  * **`SRSReview.tsx`**: Motor de flashcards con calificaciones adaptativas (Fácil, Bien, Difícil), sintetizador de pronunciación y atajos de teclado.
  * **`AuthModal.tsx`**: Registro, inicio de sesión y sincronización / migración de datos entre computadoras y celulares mediante claves criptográficas.
  * **`ProfileSetupModal.tsx`**: Configuración de perfil con soporte para fotografía de avatar personalizada (<2.5 MB) y selección de avatares tradicionales japoneses.
* **`src/lib/`**:
  * **`storage.ts`**: Motor de persistencia en `localStorage` con retrocompatibilidad, fusión de mazos SRS y registro histórico de exámenes.
  * **`examsData.ts`**: Catálogo de preguntas oficiales completas para exámenes reales de certificación (Choukai, Dokkai, Gengo Chishiki).
  * **`lessonsData.ts` / `lessonsN4.ts` / `lessonsN3.ts` / `lessonsN2N1.ts`**: Catálogo curricular completo desde N5 hasta N1 estructurado en unidades pedagógicas.
  * **`kanjiDeckData.ts`**: Mazo maestro SRS con tarjetas de vocabulario y kanji categorizadas por nivel.
  * **`auth.ts`**: Criptografía SHA-256 en navegador y generador de claves de migración Base64.
  * **`srs.ts`**: Algoritmo matemático de 9 niveles basado en la curva del olvido de Ebbinghaus.
  * **`audio.ts`**: Yuki Audio Engine con resolución automática hacia Cloudflare R2 y síntesis Web Speech nativa en japonés.

---

## 🚀 Comandos Rápidos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilación estática de producción (carpeta out/)
npm run build
```
