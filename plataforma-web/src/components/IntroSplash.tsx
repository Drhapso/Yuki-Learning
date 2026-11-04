'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface IntroSplashProps {
  onFinished: () => void;
  videoSrc?: string;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({
  onFinished,
  videoSrc = '/intro_page.mp4',
}) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasFinishedRef = useRef<boolean>(false);

  // Cierre y transición suave de salida
  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFadingOut(true);

    // Permitir que termine la animación de fade-out (700ms) antes de desmontar
    setTimeout(() => {
      onFinished();
    }, 700);
  };

  // Intentar reproducir automáticamente garantizando muted y playsInline para móviles
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay bloqueado por el navegador o interacción requerida:', err);
        });
      }
    }

    // Temporizador de seguridad: si el video dura ~10s, garantizar salida a los 11.5s máximo
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 11500);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden select-none transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Fondo ambiental difuminado para pantallas verticales (móviles) o ultra-anchas */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <video
          src={videoSrc}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover blur-3xl scale-125"
        />
      </div>

      {/* Botón flotante para omitir la introducción */}
      <button
        onClick={handleFinish}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800/90 border border-slate-700/60 hover:border-slate-500 text-xs font-semibold text-slate-200 hover:text-white backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95"
        title="Omitir introducción y entrar a la plataforma"
      >
        <span>Omitir</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Contenedor central del video con preservación estricta de relación de aspecto */}
      <div
        onClick={handleFinish}
        className="relative z-20 w-full h-full flex items-center justify-center p-0 sm:p-4 cursor-pointer"
        title="Toca para entrar"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          onEnded={handleFinish}
          onError={handleFinish}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full max-h-screen object-contain shadow-2xl"
        />
      </div>

      {/* Barra de progreso sutil inferior */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-900/50 z-30">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-indigo-500 to-rose-400 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default IntroSplash;

