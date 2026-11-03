'use client';

import React, { useState, useEffect } from 'react';
import {
  RotateCw,
  Volume2,
  Brain,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  X,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { SRSFlashcardItem, SRSRating } from '../types';
import { calculateNextReview, getEtapaSRS } from '../lib/srs';
import { MOCK_FLASHCARDS } from '../lib/mockData';
import { soundManager } from '../lib/audio';
import { updateCardInSRSDeck } from '../lib/storage';

interface SRSReviewProps {
  items?: SRSFlashcardItem[];
  onFinishSession?: (reviewedCount: number, xpEarned: number, updatedDeck?: SRSFlashcardItem[]) => void;
  onClose?: () => void;
}

export const SRSReview: React.FC<SRSReviewProps> = ({
  items = MOCK_FLASHCARDS,
  onFinishSession = (count, xp) => console.log('Sesión SRS finalizada:', count, xp),
  onClose = () => console.log('Cerrar sesión SRS'),
}) => {
  const [deck, setDeck] = useState<SRSFlashcardItem[]>(items);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [reviewedCount, setReviewedCount] = useState<number>(0);
  const [easyCount, setEasyCount] = useState<number>(0);
  const [goodCount, setGoodCount] = useState<number>(0);
  const [hardCount, setHardCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    setDeck(items);
    setCurrentIdx(0);
    setIsFlipped(false);
    setIsCompleted(false);
  }, [items]);

  const totalDeck = deck.length;
  const currentItem = deck[currentIdx];
  const progressPercent = totalDeck > 0 ? Math.round((currentIdx / totalDeck) * 100) : 100;

  // Reproducción de audio nativo híbrido (MP3 original + fallback TTS)
  const playAudio = (text: string, audioUrl?: string) => {
    setIsPlayingAudio(true);
    soundManager.playAudio({
      text,
      audioUrl,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      soundManager.playFlipSound();
    }
  };

  // Atajos de teclado: Espacio para revelar, 1=Difícil, 2=Bien, 3=Fácil
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isFlipped) {
          handleFlip();
        } else {
          setIsFlipped(false);
        }
      } else if (isFlipped) {
        if (e.key === '1') handleRate('dificil');
        if (e.key === '2') handleRate('bien');
        if (e.key === '3') handleRate('facil');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isCompleted, currentIdx]);

  // Manejo de la calificación SRS con feedback sonoro y persistencia inmediata
  const handleRate = (rating: SRSRating) => {
    if (!currentItem) return;

    if (rating === 'facil' || rating === 'bien') {
      soundManager.playCorrectSound();
    } else {
      soundManager.playErrorSound();
    }

    if (rating === 'facil') setEasyCount((prev) => prev + 1);
    if (rating === 'bien') setGoodCount((prev) => prev + 1);
    if (rating === 'dificil') setHardCount((prev) => prev + 1);

    // Persistir tarjeta inmediatamente en localStorage
    const { updatedDeck } = updateCardInSRSDeck(deck, currentItem.id, rating);
    setDeck(updatedDeck);

    const newReviewedCount = reviewedCount + 1;
    setReviewedCount(newReviewedCount);

    if (currentIdx + 1 < totalDeck) {
      setIsFlipped(false);
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      soundManager.playLevelUpSound();
      const totalXP = newReviewedCount * 10;
      onFinishSession(newReviewedCount, totalXP, updatedDeck);
    }
  };

  // Estado vacío: Si no hay tarjetas pendientes
  if (totalDeck === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">¡Todo al día!</h2>
            <p className="text-xs md:text-sm text-slate-400">
              No tienes tarjetas pendientes de repaso en este momento. Las tarjetas se activarán automáticamente según tu curva de olvido y algoritmo SRS.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.98]"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Calcular intervalos proyectados para los 3 botones
  const intervaloDificil = currentItem ? calculateNextReview(currentItem.nivelMemoriaActual, 'dificil').etiquetaIntervalo : '4h';
  const intervaloBien = currentItem ? calculateNextReview(currentItem.nivelMemoriaActual, 'bien').etiquetaIntervalo : '24h';
  const intervaloFacil = currentItem ? calculateNextReview(currentItem.nivelMemoriaActual, 'facil').etiquetaIntervalo : '48h';

  // ==========================================================================
  // PANTALLA FINAL: RESUMEN DE LA SESIÓN SRS
  // ==========================================================================
  if (isCompleted) {
    const totalXP = totalDeck * 10;
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20 ring-4 ring-indigo-500/20">
            <Brain className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">¡Repaso Diario Finalizado!</h2>
            <p className="text-xs md:text-sm text-slate-400">
              Has consolidado {totalDeck} tarjetas en tu memoria a largo plazo.
            </p>
          </div>

          {/* Desglose de Respuestas */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-900/30">
              <span className="text-[10px] font-bold uppercase text-rose-400">Difícil</span>
              <div className="text-xl font-black text-rose-200">{hardCount}</div>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-950/20 border border-indigo-900/30">
              <span className="text-[10px] font-bold uppercase text-indigo-400">Bien</span>
              <div className="text-xl font-black text-indigo-200">{goodCount}</div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-900/30">
              <span className="text-[10px] font-bold uppercase text-emerald-400">Fácil</span>
              <div className="text-xl font-black text-emerald-200">{easyCount}</div>
            </div>
          </div>

          {/* XP Total ganado */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Experiencia adquirida</span>
            </div>
            <span className="font-black text-lg text-amber-400">+{totalXP} XP</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-rose-600/30 transition-all active:scale-[0.98]"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const etapaActual = getEtapaSRS(currentItem.nivelMemoriaActual);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans">
      
      {/* ====================================================================== */}
      {/* 1. TOPBAR DE SESIÓN SRS: PROGRESO Y CONTADOR                           */}
      {/* ====================================================================== */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Salir del repaso"
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

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
            {currentIdx + 1} / {totalDeck}
          </span>
        </div>
      </header>

      {/* ====================================================================== */}
      {/* 2. FLASHCARD CENTRAL: ANVERSO Y REVERSO INTERACTIVO                   */}
      {/* ====================================================================== */}
      <main className="max-w-xl mx-auto w-full my-auto py-4">
        <div
          onClick={() => !isFlipped && handleFlip()}
          className={`relative min-h-[380px] md:min-h-[420px] rounded-3xl p-6 md:p-10 flex flex-col justify-between cursor-pointer border transition-all duration-300 select-none shadow-2xl ${
            isFlipped
              ? 'bg-slate-900 border-indigo-500/40 shadow-indigo-500/10'
              : 'bg-gradient-to-b from-slate-900 to-slate-925 border-slate-800 hover:border-slate-700'
          }`}
        >
          {/* Fila superior de la tarjeta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[11px] font-bold uppercase tracking-wider">
                {currentItem.tipo}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">
                Nivel JLPT {currentItem.nivel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-medium">
                {etapaActual} (Nv. {currentItem.nivelMemoriaActual})
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio(currentItem.lectura || currentItem.caracter, currentItem.audioUrl);
                }}
                className={`p-2 rounded-xl border transition-all ${
                  isPlayingAudio
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 scale-110 shadow-md shadow-rose-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Escuchar pronunciación nativa"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>

          {/* Centro: Carácter en japonés */}
          <div className="text-center py-6 space-y-3">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-wide">
              {currentItem.caracter}
            </h1>
            <p className="text-base md:text-lg text-rose-400 font-bold">
              {currentItem.lectura}
            </p>
            {currentItem.romaji && (
              <p className="text-xs text-slate-400 font-mono italic">
                {currentItem.romaji}
              </p>
            )}
          </div>

          {/* Reverso: Significado, Mnemotecnia y Frase de Ejemplo */}
          {isFlipped ? (
            <div className="pt-4 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-200 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Significado en Español:
                </span>
                <p className="text-lg md:text-xl font-bold text-emerald-400">
                  {currentItem.significado}
                </p>
              </div>

              {currentItem.ejemploJapones && (
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs space-y-0.5">
                  <div className="text-slate-200 font-medium">
                    {currentItem.ejemploJapones}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {currentItem.ejemploEspanol}
                  </div>
                </div>
              )}

              {currentItem.nemotecnica && (
                <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{currentItem.nemotecnica}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800/80 text-center">
              <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" /> Haz clic o presiona <strong>Espacio</strong> para revelar
              </span>
            </div>
          )}
        </div>
      </main>

      {/* ====================================================================== */}
      {/* 3. BOTONERA DE AUTOEVALUACIÓN SRS (FÁCIL / BIEN / DIFÍCIL)              */}
      {/* ====================================================================== */}
      <footer className="max-w-xl mx-auto w-full">
        {isFlipped ? (
          <div className="grid grid-cols-3 gap-3 animate-in fade-in duration-200">
            {/* 1. Botón Difícil */}
            <button
              onClick={() => handleRate('dificil')}
              className="py-3.5 px-3 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 font-bold text-xs md:text-sm transition-all flex flex-col items-center gap-0.5 group active:scale-95"
            >
              <div className="flex items-center gap-1">
                <span>Difícil</span>
                <span className="text-[10px] text-rose-400/80 hidden sm:inline">(1)</span>
              </div>
              <span className="text-[10px] font-normal text-rose-400">
                Repaso: {intervaloDificil}
              </span>
            </button>

            {/* 2. Botón Bien */}
            <button
              onClick={() => handleRate('bien')}
              className="py-3.5 px-3 rounded-2xl bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/40 text-indigo-300 font-bold text-xs md:text-sm transition-all flex flex-col items-center gap-0.5 group active:scale-95 shadow-md shadow-indigo-500/10"
            >
              <div className="flex items-center gap-1">
                <span>Bien</span>
                <span className="text-[10px] text-indigo-400/80 hidden sm:inline">(2)</span>
              </div>
              <span className="text-[10px] font-normal text-indigo-400">
                Repaso: {intervaloBien}
              </span>
            </button>

            {/* 3. Botón Fácil */}
            <button
              onClick={() => handleRate('facil')}
              className="py-3.5 px-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs md:text-sm transition-all flex flex-col items-center gap-0.5 group active:scale-95 shadow-md shadow-emerald-500/10"
            >
              <div className="flex items-center gap-1">
                <span>Fácil</span>
                <span className="text-[10px] text-emerald-400/80 hidden sm:inline">(3)</span>
              </div>
              <span className="text-[10px] font-normal text-emerald-400">
                Repaso: {intervaloFacil}
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleFlip}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm md:text-base shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span>Mostrar Respuesta</span>
            <RotateCw className="w-4 h-4" />
          </button>
        )}
      </footer>

    </div>
  );
};

export default SRSReview;

