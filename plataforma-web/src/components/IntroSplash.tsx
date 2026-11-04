'use client';

import React, { useState, useRef, useEffect } from 'react';

interface IntroSplashProps {
  onFinished: () => void;
  videoSrc?: string;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({
  onFinished,
  videoSrc = '/intro_page.mp4',
}) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasFinishedRef = useRef<boolean>(false);

  // Cierre y transición suave de salida (fade-out de 600ms)
  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFadingOut(true);

    setTimeout(() => {
      onFinished();
    }, 600);
  };

  // Ajustar la velocidad a 3 segundos máximo
  const applyAcceleratedPlayback = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      // Si el video dura ~10s, velocidad ~3.33x para finalizar en exactamente 3.0s
      const targetDuration = 3.0;
      const speed = video.duration && video.duration > 0
        ? Math.max(1, video.duration / targetDuration)
        : 3.33;
      video.playbackRate = speed;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      applyAcceleratedPlayback();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay en intro:', err);
        });
      }
    }

    // Temporizador de rescate fijado a 3.2 segundos máximo
    const timer = setTimeout(() => {
      handleFinish();
    }, 3200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer select-none transition-all duration-600 ease-out bg-slate-950/65 backdrop-blur-md ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Halo de luz suave difuminado alrededor del video */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-500/25 to-indigo-500/25 blur-3xl pointer-events-none animate-pulse" />

      {/* Contenedor del video con esquinas redondeadas, sombra y transparencia integrada */}
      <div className="relative z-10 max-w-4xl max-h-[82vh] w-auto h-auto flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={applyAcceleratedPlayback}
          onEnded={handleFinish}
          onError={handleFinish}
          className="max-h-[80vh] max-w-[92vw] sm:max-w-3xl w-auto h-auto object-contain rounded-3xl shadow-2xl ring-1 ring-white/10"
        />
      </div>
    </div>
  );
};

export default IntroSplash;
