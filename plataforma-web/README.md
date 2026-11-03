# Yuki Learning 🌸 · Código Fuente Frontend (Next.js 16 + React 19)

[![Versión](https://img.shields.io/badge/Versión-v1.0.0--beta-indigo?style=flat&logo=github)](https://github.com/Drhapso/Yuki-Learning)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com/)

Código fuente y componentes cliente de **Yuki Learning (雪ラーニング)**, plataforma web interactiva y responsiva para el aprendizaje del idioma japonés (JLPT N5 a N1) con gamificación, repetición espaciada (SRS) y sincronización multidispositivo.

> 📖 **Para la guía técnica completa de arquitectura, modelo de base de datos relacional y configuración con Cloudflare R2:**  
> 👉 Consulta el documento **[DOCUMENTACION_TECNICA.md](../docs/DOCUMENTACION_TECNICA.md)** en el directorio `docs/`.

---

## 🏗️ Módulos y Componentes de la Aplicación

* **`src/components/`**:
  * **`Dashboard.tsx`**: Panel principal con racha diaria, XP, lección recomendada y desglose de etapas SRS.
  * **`CurriculumMap.tsx`**: Árbol de habilidades con niveles desde Introducción (Hiragana/Katakana) hasta N1 con bloqueo dinámico.
  * **`ActiveLesson.tsx`**: Interfaz de lección en dos fases (Fase 1: Tarjeta teórica interactiva; Fase 2: Quiz anti-spoilers).
  * **`SRSReview.tsx`**: Interfaz de flashcards con calificaciones (Fácil, Bien, Difícil) y atajos de teclado.
  * **`AuthModal.tsx`**: Registro, inicio de sesión y sincronización / migración de datos entre computadoras y celulares.
  * **`ProfileSetupModal.tsx`**: Configuración de perfil con soporte para fotografía de avatar personalizada (<2.5 MB).
* **`src/lib/`**:
  * **`storage.ts`**: Motor de persistencia en `localStorage` con retrocompatibilidad.
  * **`auth.ts`**: Criptografía SHA-256 en navegador y generador de claves de migración Base64.
  * **`srs.ts`**: Algoritmo matemático de 9 niveles basado en la curva del olvido.
  * **`audio.ts`**: Yuki Audio Engine con resolución automática hacia Cloudflare R2 y síntesis Web Speech.
  * **`lessonsData.ts`**: Contenidos pedagógicos completos para lecciones de escritura, gramática y kanji.

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
