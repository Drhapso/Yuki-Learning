'use client';

import React, { useState, useRef, useEffect } from 'react';

interface IntroSplashProps {
  onFinished: () => void;
  videoSrc?: string;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({
  onFinished,
  videoSrc = '/intro_page_clean.mp4',
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

  // Reproducción a velocidad natural de 3.0s (video pre-optimizado)
  const applyAcceleratedPlayback = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      const targetDuration = 3.0;
      const speed = video.duration && video.duration > 3.5
        ? video.duration / targetDuration
        : 1.0;
      video.playbackRate = Math.max(1.0, speed);
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

    // Temporizador de rescate fijado a 3.3 segundos
    const timer = setTimeout(() => {
      handleFinish();
    }, 3300);

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
      {/* Halo de luz difuminado con tono sutil sakura y noche índigo */}
      <div className="absolute w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-gradient-to-tr from-rose-500/20 via-indigo-500/20 to-sky-400/20 blur-3xl pointer-events-none animate-pulse" />

      {/* Contenedor transparente donde solo flota el logotipo y texto en movimiento */}
      <div className="relative z-10 max-w-3xl max-h-[80vh] w-auto h-auto flex items-center justify-center pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={applyAcceleratedPlayback}
          onEnded={handleFinish}
          onError={handleFinish}
          className="max-h-[75vh] max-w-[90vw] sm:max-w-2xl w-auto h-auto object-contain mix-blend-screen drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
        >
          <source src="/intro_page_clean.webm" type="video/webm" />
          <source src="/intro_page_clean.mp4" type="video/mp4" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default IntroSplash;
