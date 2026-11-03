'use client';

import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  BookOpen,
  Lightbulb,
  Check,
  Play,
} from 'lucide-react';
import { ActiveLessonContent, LessonQuestion } from '../types';
import { soundManager } from '../lib/audio';

interface ActiveLessonProps {
  lesson: ActiveLessonContent;
  onFinishLesson?: (xpGanada: number) => void;
  onClose?: () => void;
}

export const ActiveLesson: React.FC<ActiveLessonProps> = ({
  lesson,
  onFinishLesson = (xp) => console.log('Lección finalizada. XP:', xp),
  onClose = () => console.log('Salir de la lección'),
}) => {
  const [phase, setPhase] = useState<'teoria' | 'quiz'>(lesson.teoria ? 'teoria' : 'quiz');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const totalQuestions = lesson.preguntas.length;
  const currentQuestion: LessonQuestion = lesson.preguntas[currentIdx] || lesson.preguntas[0];
  const progressPercent = Math.round(((currentIdx + (isAnswered ? 1 : 0)) / totalQuestions) * 100);

  // Reproducir audio nativo con el motor de audio híbrido (MP3 + TTS fallback)
  const playAudio = (text: string, audioUrl?: string) => {
    setIsPlayingAudio(true);
    soundManager.playAudio({
      text,
      audioUrl,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.indiceCorrecto) {
      setCorrectCount((prev) => prev + 1);
      soundManager.playCorrectSound();
    } else {
      soundManager.playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundManager.playLevelUpSound();
      const xpGanada = correctCount * 15 + 25; // Recompensa base + aciertos
      onFinishLesson(xpGanada);
    }
  };

  const handleRestart = () => {
    setPhase(lesson.teoria ? 'teoria' : 'quiz');
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  // ==========================================================================
  // PANTALLA 1: FASE DE TEORÍA DINÁMICA (MICRO-APRENDIZAJE INTERACTIVO)
  // ==========================================================================
  if (phase === 'teoria' && lesson.teoria) {
    const { teoria } = lesson;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans">
        {/* Cabecera de Teoría */}
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Salir"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Paso 1 de 2 · Fundamento Teórico
              </span>
              <h1 className="text-lg md:text-xl font-black text-white">{lesson.titulo}</h1>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            {lesson.nivel_jlpt}
          </span>
        </div>

        {/* Tarjeta de Contenido Teórico Dinámico */}
        <main className="max-w-2xl mx-auto w-full my-auto py-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 backdrop-blur-sm">
            
            {/* Título y Concepto */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{teoria.subtitulo}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">{teoria.titulo}</h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {teoria.conceptoClave}
              </p>
            </div>

            {/* Fórmula o Regla Gramatical */}
            {teoria.reglaOFormula && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Fórmula / Regla de Oro:
                </span>
                <div className="text-sm md:text-base font-black text-amber-300">
                  {teoria.reglaOFormula}
                </div>
              </div>
            )}

            {/* Puntos Clave */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Puntos clave para recordar:</span>
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                {teoria.puntosClave.map((punto, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ejemplos con Audio */}
            {teoria.ejemplos && teoria.ejemplos.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Ejemplos en contexto:
                </span>
                <div className="space-y-2">
                  {teoria.ejemplos.map((ej, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-white">{ej.japones}</div>
                        <div className="text-[11px] text-rose-400 font-medium">{ej.lectura}</div>
                        <div className="text-[11px] text-slate-400">{ej.espanol}</div>
                      </div>
                      <button
                        onClick={() => playAudio(ej.lectura || ej.japones, ej.audioUrl)}
                        className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="Escuchar ejemplo"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>

        {/* Botón de Acción para Iniciar Práctica */}
        <footer className="max-w-2xl mx-auto w-full pt-2">
          <button
            onClick={() => setPhase('quiz')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>¡Entendido! Comenzar Ejercicios Prácticos ({totalQuestions} preguntas)</span>
            <Play className="w-4 h-4 fill-current" />
          </button>
        </footer>
      </div>
    );
  }

  // ==========================================================================
  // PANTALLA FINAL: RESULTADOS Y RECOMPENSAS
  // ==========================================================================
  if (isFinished) {
    const xpGanada = correctCount * 15 + 25;
    const porcentajeAcierto = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20 ring-4 ring-amber-400/20">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">¡Lección Completada!</h2>
            <p className="text-sm text-slate-400">お疲れ様でした (Otsukaresama deshita)</p>
          </div>

          {/* Estadísticas de la sesión */}
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Aciertos
              </span>
              <div className="text-2xl font-black text-emerald-400">
                {correctCount} / {totalQuestions}
              </div>
              <span className="text-[11px] text-slate-400">{porcentajeAcierto}% de efectividad</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Experiencia
              </span>
              <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5" /> +{xpGanada}
              </div>
              <span className="text-[11px] text-slate-400">Puntos de XP</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-rose-600/30 transition-all active:scale-[0.98]"
            >
              Continuar al Mapa
            </button>
            <button
              onClick={handleRestart}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Repetir Lección
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQuestion.indiceCorrecto;

  // ==========================================================================
  // PANTALLA 2: FASE DE EVALUACIÓN INTERACTIVA (CERO SPOILERS)
  // ==========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans">
      
      {/* 1. BARRA DE PROGRESO SUPERIOR Y SALIDA */}
      <div className="max-w-3xl mx-auto w-full flex items-center gap-4">
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Salir de la lección"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 space-y-1">
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <span className="text-xs font-bold text-slate-400">
          {currentIdx + 1} / {totalQuestions}
        </span>
      </div>

      {/* 2. ÁREA CENTRAL: PREGUNTA SIN SPOILERS */}
      <main className="max-w-2xl mx-auto w-full my-auto py-6 text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
          {lesson.titulo}
        </div>

        <h2 className="text-lg md:text-xl font-bold text-white">
          {currentQuestion.pregunta}
        </h2>

        {/* Tarjeta de visualización central de caracteres japoneses */}
        <div className="relative p-6 md:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-sm space-y-4">
          
          {/* Botón de reproducción de audio nativo */}
          <button
            onClick={() =>
              playAudio(
                isAnswered
                  ? currentQuestion.lecturaCompleta || currentQuestion.caracterPrincipal
                  : currentQuestion.caracterPrincipal.replace(/\[\s*\?\s*\]/g, '、'),
                currentQuestion.audioUrl
              )
            }
            className={`absolute top-4 right-4 p-3 rounded-2xl border transition-all ${
              isPlayingAudio
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 scale-110 shadow-lg shadow-rose-500/20'
                : 'bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-500/30 text-indigo-400 hover:text-indigo-300'
            }`}
            title="Escuchar pronunciación nativa"
          >
            <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
          </button>

          {/* Carácter principal o frase con hueco masked */}
          <div className="text-3xl md:text-5xl font-black text-white tracking-wide">
            {currentQuestion.caracterPrincipal}
          </div>

          {/* Guía fonética: Muestra sólo la máscara durante el ejercicio (SIN SPOILERS) */}
          <div className="space-y-1">
            {!isAnswered ? (
              <>
                {currentQuestion.lecturaHiragana && (
                  <p className="text-sm md:text-base text-slate-400 font-medium">
                    {currentQuestion.lecturaHiragana}
                  </p>
                )}
                {currentQuestion.romaji && (
                  <p className="text-xs text-slate-500 italic font-mono">
                    {currentQuestion.romaji}
                  </p>
                )}
              </>
            ) : (
              // SOLUCIÓN REVELADA SÓLO TRAS RESPONDER
              <div className="animate-in fade-in duration-200">
                <p className="text-base md:text-lg text-emerald-400 font-bold">
                  {currentQuestion.lecturaCompleta || currentQuestion.lecturaHiragana}
                </p>
                {currentQuestion.romajiCompleto && (
                  <p className="text-xs text-slate-300 italic font-mono">
                    {currentQuestion.romajiCompleto}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Explicación de contexto tras responder */}
        {isAnswered && currentQuestion.explicacionContexto && (
          <div
            className={`p-4 rounded-2xl border text-left text-xs md:text-sm leading-relaxed transition-all animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> ¡Correcto!
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" /> Respuesta incorrecta
                </>
              )}
            </div>
            {currentQuestion.explicacionContexto}
          </div>
        )}
      </main>

      {/* 3. PARTE INFERIOR: OPCIONES MÚLTIPLES Y CONTINUAR */}
      <footer className="max-w-2xl mx-auto w-full space-y-4">
        {/* Grid de opciones de respuesta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.opciones.map((opcion, idx) => {
            let optionStyles = 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700';

            if (isAnswered) {
              if (idx === currentQuestion.indiceCorrecto) {
                optionStyles = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10 font-bold';
              } else if (idx === selectedOption) {
                optionStyles = 'bg-rose-600/20 border-rose-500 text-rose-300 font-bold';
              } else {
                optionStyles = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border text-left text-sm md:text-base font-semibold transition-all duration-150 flex items-center justify-between ${optionStyles}`}
              >
                <span>{opcion}</span>
                <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Botón Siguiente / Continuar */}
        {isAnswered && (
          <div className="pt-2 animate-in fade-in duration-200">
            <button
              onClick={handleNext}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xl ${
                isCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
              }`}
            >
              <span>{currentIdx + 1 === totalQuestions ? 'Ver Resultados' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </footer>

    </div>
  );
};

export default ActiveLesson;
