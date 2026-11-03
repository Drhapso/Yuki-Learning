'use client';

import React from 'react';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Play,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Flame,
  Award,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { CurriculumLevel, LessonNode } from '../types';
import { MOCK_CURRICULUM } from '../lib/mockData';

interface CurriculumMapProps {
  curriculum?: CurriculumLevel[];
  onSelectLesson?: (lessonId: string) => void;
  onBackToDashboard?: () => void;
}

export const CurriculumMap: React.FC<CurriculumMapProps> = ({
  curriculum = MOCK_CURRICULUM,
  onSelectLesson = (id) => console.log('Seleccionada lección:', id),
  onBackToDashboard = () => console.log('Volver al Dashboard'),
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ==================================================================== */}
        {/* NAVEGACIÓN Y ENCABEZADO DEL ÁRBOL                                     */}
        {/* ==================================================================== */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Volver al Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Mapa de Estudios (学習マップ)
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold">
                  Árbol de Habilidades
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-400">
                Avanza secuencialmente desde los fundamentos hasta el dominio nativo (N5 → N1).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">
              Desbloquea el siguiente nivel completando sus lecciones al <strong>100%</strong>
            </span>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* LISTADO DE NIVELES (RUTA SECUENCIAL DE APRENDIZAJE)                  */}
        {/* ==================================================================== */}
        <div className="space-y-8 relative">
          {/* Línea conectora central de fondo */}
          <div className="absolute left-6 md:left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-500 via-rose-500/40 to-slate-800 -z-0" />

          {curriculum.map((level, levelIdx) => {
            const isUnlocked = !level.bloqueado;

            return (
              <section
                key={level.id}
                className={`relative z-10 transition-all rounded-3xl border ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-slate-800 shadow-xl'
                    : 'bg-slate-900/30 border-slate-800/60 opacity-70 grayscale-[25%]'
                } p-5 md:p-7 overflow-hidden`}
              >
                {/* Cabecera del Nivel */}
                <div className="flex items-start gap-4">
                  {/* Badge con ícono de estado (Candado / Número) */}
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 shadow-lg ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-indigo-600 to-rose-500 text-white shadow-rose-500/20 ring-2 ring-indigo-400/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {isUnlocked ? (
                      level.progresoPorcentaje === 100 ? (
                        <CheckCircle2 className="w-7 h-7 text-emerald-300" />
                      ) : (
                        level.id
                      )
                    ) : (
                      <Lock className="w-6 h-6 text-slate-500" />
                    )}
                  </div>

                  {/* Información y progreso del Nivel */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                        {level.subtitulo}
                      </span>
                      {level.progresoPorcentaje === 100 && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completado
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-white">
                      {level.titulo}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed">
                      {level.descripcion}
                    </p>

                    {/* Barra de Progreso del Nivel si está desbloqueado */}
                    {isUnlocked && (
                      <div className="pt-2 max-w-md">
                        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                          <span>Progreso del nivel</span>
                          <span className="font-bold text-indigo-400">{level.progresoPorcentaje}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
                            style={{ width: `${level.progresoPorcentaje}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Requisito previo para niveles bloqueados */}
                    {!isUnlocked && level.requisitoPrevio && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 mt-2">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Requisito: {level.requisitoPrevio}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ================================================================ */}
                {/* NODOS DE LECCIÓN (ÁRBOL DE HABILIDADES)                          */}
                {/* ================================================================ */}
                {isUnlocked && level.lecciones.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Unidades y Módulos Prácticos:
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {level.lecciones.map((lesson) => {
                        const isDone = lesson.estado === 'completado';
                        const isInProgress = lesson.estado === 'en_progreso';
                        const isAvailable = lesson.estado === 'disponible';
                        const isLocked = lesson.estado === 'bloqueado';

                        return (
                          <div
                            key={lesson.id}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                              isDone
                                ? 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60'
                                : isInProgress
                                ? 'bg-indigo-950/30 border-indigo-500/40 ring-1 ring-indigo-500/20'
                                : isAvailable
                                ? 'bg-slate-800/30 border-slate-700/40 hover:border-slate-600'
                                : 'bg-slate-900/20 border-slate-800/40 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Ícono de Estado */}
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                                  isDone
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : isInProgress
                                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 animate-pulse'
                                    : isAvailable
                                    ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                    : 'bg-slate-800/50 text-slate-600'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : isLocked ? (
                                  <Lock className="w-4 h-4 text-slate-500" />
                                ) : (
                                  <span>{lesson.orden}</span>
                                )}
                              </div>

                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    {lesson.tipo}
                                  </span>
                                  <span className="text-slate-600">·</span>
                                  <span className="text-[10px] text-amber-400 font-semibold">
                                    +{lesson.xp_recompensa} XP
                                  </span>
                                </div>
                                <h4 className="text-xs md:text-sm font-bold text-white line-clamp-1">
                                  {lesson.titulo}
                                </h4>
                              </div>
                            </div>

                            {/* Botón de Acción */}
                            <div>
                              {!isLocked ? (
                                <button
                                  onClick={() => onSelectLesson(lesson.id)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                                    isDone
                                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                                  }`}
                                >
                                  {isDone ? 'Repasar' : 'Comenzar'}
                                  <Play className="w-3 h-3 fill-current" />
                                </button>
                              ) : (
                                <Lock className="w-4 h-4 text-slate-600 mr-2" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CurriculumMap;

