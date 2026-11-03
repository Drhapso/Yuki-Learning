'use client';

import React, { useState } from 'react';
import {
  Flame,
  Zap,
  BookOpen,
  Target,
  Trophy,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  UserCog,
  RotateCcw,
  Smartphone,
  X,
} from 'lucide-react';
import { UserProfile, SRSDueSummary, SRSStageBreakdown, LessonNode, JLPTLevel } from '../types';
import { formatNumber } from '../lib/format';

interface RecommendedLessonInfo {
  lesson: LessonNode;
  nivel_jlpt: JLPTLevel;
  nivelTitulo: string;
}

interface DashboardProps {
  user?: UserProfile;
  srsSummary?: SRSDueSummary;
  srsStages?: SRSStageBreakdown;
  recommendedLesson?: RecommendedLessonInfo | null;
  onStartReview?: () => void;
  onOpenCurriculum?: () => void;
  onContinueLesson?: (lessonId?: string) => void;
  onEditProfile?: () => void;
  onResetProfile?: () => void;
  onOpenAuth?: (mode?: 'login' | 'register' | 'sync') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user = {
    id: 'user-default-1',
    nombre: 'Carlos',
    email: 'carlos@ejemplo.com',
    xp_total: 1850,
    racha_actual: 7,
    racha_maxima: 14,
    meta_diaria: 25,
    nivel_actual_jlpt: 'N5',
    nivel_usuario: 5,
    xp_nivel_actual: 350,
    xp_proximo_nivel: 500,
  },
  srsSummary = {
    total: 38,
    kanji: 14,
    vocabulario: 18,
    gramatica: 6,
  },
  srsStages = {
    aprendiz: 124,
    guru: 68,
    maestro: 32,
    iluminado: 15,
  },
  recommendedLesson = null,
  onStartReview = () => console.log('Iniciando sesión SRS...'),
  onOpenCurriculum = () => console.log('Abriendo mapa de estudios...'),
  onContinueLesson = () => console.log('Continuando lección activa...'),
  onEditProfile = () => console.log('Editar perfil'),
  onResetProfile = () => console.log('Reiniciar perfil'),
  onOpenAuth = (mode) => console.log('Abrir auth', mode),
}) => {
  const [showAllReviewedModal, setShowAllReviewedModal] = useState<boolean>(false);

  const porcentajeXP = Math.min(
    100,
    Math.round((user.xp_nivel_actual / user.xp_proximo_nivel) * 100)
  );

  const totalAprendidos =
    (srsStages?.aprendiz || 0) +
    (srsStages?.guru || 0) +
    (srsStages?.maestro || 0) +
    (srsStages?.iluminado || 0);

  const pctAprendiz = totalAprendidos > 0 ? Math.round(((srsStages?.aprendiz || 0) / totalAprendidos) * 100) : 0;
  const pctGuru = totalAprendidos > 0 ? Math.round(((srsStages?.guru || 0) / totalAprendidos) * 100) : 0;
  const pctMaestro = totalAprendidos > 0 ? Math.round(((srsStages?.maestro || 0) / totalAprendidos) * 100) : 0;
  const pctIluminado = totalAprendidos > 0 ? Math.round(((srsStages?.iluminado || 0) / totalAprendidos) * 100) : 0;

  const handleStartReviewClick = () => {
    if (srsSummary.total === 0) {
      setShowAllReviewedModal(true);
    } else {
      onStartReview();
    }
  };

  const diasSemana = [
    { inicial: 'L', activo: true },
    { inicial: 'M', activo: true },
    { inicial: 'M', activo: true },
    { inicial: 'J', activo: true },
    { inicial: 'V', activo: true },
    { inicial: 'S', activo: true },
    { inicial: 'D', activo: true }, // Racha activa perfecta de 7 días
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ==================================================================== */}
        {/* TOPBAR: PERFIL, RACHA Y XP RESUMEN                                   */}
        {/* ==================================================================== */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-rose-500/20 ring-2 ring-slate-800 overflow-hidden">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.nombre} className="w-full h-full object-cover" />
                ) : (
                  user.avatar_icon || user.nombre.charAt(0)
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full uppercase border border-slate-900">
                {user.nivel_actual_jlpt}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  おかえり, {user.nombre}! 👋
                </h1>
                <button
                  onClick={onEditProfile}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Editar mi perfil"
                >
                  <UserCog className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs md:text-sm text-slate-400">
                  Nivel {user.nivel_usuario} · <span className="text-rose-400 font-medium">{user.nivel_actual_jlpt === 'INTRO' ? '初学者 (Principiante)' : '学徒 (Estudiante ' + user.nivel_actual_jlpt + ')'}</span>
                </p>
                <span className="text-slate-600">·</span>
                <button
                  onClick={onResetProfile}
                  className="text-[11px] text-slate-500 hover:text-rose-400 font-medium transition-colors flex items-center gap-1"
                  title="Reiniciar configuración para crear un nuevo perfil"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Nuevo Perfil</span>
                </button>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('sync')}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1"
                  title="Sincronizar progreso con tu celular u otro dispositivo"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Sincronizar Móvil</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Badges: Racha y Total XP */}
          <div className="flex items-center gap-3">
            {/* Racha con fuego */}
            <div className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-amber-400">
              <Flame className="w-6 h-6 fill-amber-500 text-orange-500 animate-pulse" />
              <div>
                <div className="text-lg font-black leading-none">{user.racha_actual}</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-500/80">
                  Días de Racha
                </div>
              </div>
            </div>

            {/* XP Total */}
            <div className="flex items-center gap-2.5 bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-xl text-indigo-400">
              <Zap className="w-6 h-6 fill-indigo-400 text-indigo-400" />
              <div>
                <div className="text-lg font-black leading-none">{formatNumber(user.xp_total)}</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-400/80">
                  XP Total
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* HERO CALL TO ACTION: REPASO DIARIO SRS                               */}
        {/* ==================================================================== */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/90 via-slate-900 to-rose-950/80 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
          {/* Kanji de fondo decorativo japonés */}
          <div className="absolute right-4 -bottom-6 text-[110px] md:text-[140px] font-black text-white/[0.03] select-none pointer-events-none">
            記憶
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {srsSummary.total > 0
                    ? 'Sistema de Repaso Espaciado (SRS)'
                    : 'Repaso Diario Completado (SRS)'}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {srsSummary.total > 0 ? (
                    <>
                      Tienes{' '}
                      <span className="text-amber-400 underline decoration-amber-500/50 underline-offset-4">
                        {srsSummary.total} tarjetas
                      </span>{' '}
                      pendientes hoy
                    </>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400 inline" />
                      ¡Ya viste las tarjetas del día!
                    </span>
                  )}
                </h2>
                <p className="text-sm text-slate-300 max-w-xl">
                  {srsSummary.total > 0
                    ? 'Revisa tus tarjetas programadas antes de que venza el ciclo de retención para fijar el vocabulario y los kanjis en tu memoria a largo plazo.'
                    : 'Has completado todas las tarjetas programadas para el ciclo actual. El algoritmo de memoria las reactivará automáticamente a su debido tiempo.'}
                </p>
              </div>

              {/* Píldoras de desglose */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {srsSummary.total > 0 ? (
                  <>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <strong>{srsSummary.kanji}</strong> Kanji
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      <strong>{srsSummary.vocabulario}</strong> Vocabulario
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <strong>{srsSummary.gramatica}</strong> Gramática
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 ml-1">
                      <Clock className="w-3.5 h-3.5" /> ~{Math.ceil(srsSummary.total * 0.25)} min aprox.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      0 tarjetas pendientes
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-rose-400" />
                      <strong>{totalAprendidos}</strong> en retención activa
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 ml-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> ¡Gran constancia!
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Botón Principal CTA */}
            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
              <button
                onClick={handleStartReviewClick}
                className={`w-full lg:w-auto px-8 py-4 rounded-2xl text-white font-bold text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group ${
                  srsSummary.total > 0
                    ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 shadow-rose-600/30'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/30'
                }`}
              >
                <span>
                  {srsSummary.total > 0
                    ? 'Comenzar Repaso Diario SRS'
                    : 'Comenzar Repaso Diario'}
                </span>
                {srsSummary.total > 0 ? (
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                )}
              </button>
              <p className="text-[11px] text-slate-400 mt-2 text-center lg:text-right w-full">
                {srsSummary.total > 0
                  ? `日々の復習を始める · Suma hasta +${srsSummary.total * 10} XP`
                  : '復習完了 · Repasos del día al 100%'}
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* GRID PRINCIPAL: PROGRESO XP, RACHA SEMANAL Y ÁRBOL DE ESTUDIOS       */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. BARRA DE EXPERIENCIA (XP) Y NIVEL */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Progreso de Nivel</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Nivel {user.nivel_usuario}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span>{user.xp_nivel_actual} XP</span>
                <span className="text-slate-400">{user.xp_proximo_nivel} XP</span>
              </div>
              
              {/* Barra fluida con gradiente */}
              <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${porcentajeXP}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                <span>Faltan {user.xp_proximo_nivel - user.xp_nivel_actual} XP para Nivel {user.nivel_usuario + 1}</span>
                <span className="text-rose-400 font-bold">{porcentajeXP}%</span>
              </div>
            </div>

            {/* Meta diaria de estudio */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Target className="w-4 h-4 text-rose-400" />
                <span>Meta Diaria</span>
              </div>
              <span className="font-bold text-emerald-400">
                {user.meta_diaria} tarjetas / día
              </span>
            </div>
          </div>

          {/* 2. CALENDARIO DE RACHA (DÍAS CONSECUTIVOS) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-white text-sm">Racha Semanal</h3>
              </div>
              <span className="text-xs font-bold text-amber-400">
                {user.racha_actual} días consecutivos
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {diasSemana.map((dia, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                      dia.activo
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                        : 'bg-slate-800 text-slate-500 border border-slate-700/50'
                    }`}
                  >
                    {dia.activo ? <Flame className="w-4 h-4 fill-amber-400" /> : dia.inicial}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{dia.inicial}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 pt-1 text-center">
              ¡Récord histórico: <strong className="text-slate-200">{user.racha_maxima} días</strong>! No rompas el hábito.
            </p>
          </div>

          {/* 3. SIGUIENTE LECCIÓN RECOMENDADA / CURRÍCULO */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white text-sm">
                    {recommendedLesson ? recommendedLesson.nivelTitulo : `Currículo JLPT ${user.nivel_actual_jlpt}`}
                  </h3>
                </div>
                <button
                  onClick={onOpenCurriculum}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-0.5"
                >
                  Ver Mapa <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {recommendedLesson ? (
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      Lección {recommendedLesson.lesson.orden} · {recommendedLesson.lesson.tipo.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      +{recommendedLesson.lesson.xp_recompensa} XP
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {recommendedLesson.lesson.titulo}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {recommendedLesson.lesson.descripcion}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ¡Al día!
                  </span>
                  <h4 className="text-sm font-bold text-white">Todas las lecciones completadas</h4>
                  <p className="text-xs text-slate-400">
                    Revisa el mapa curricular para explorar niveles avanzados o reforzar en SRS.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => onContinueLesson && onContinueLesson(recommendedLesson?.lesson.id)}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>{recommendedLesson ? 'Continuar Lección' : 'Explorar Currículo'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* ETAPAS DE RETENCIÓN SRS (PIRÁMIDE DE MEMORIA DE 9 NIVELES)          */}
        {/* ==================================================================== */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-white text-sm">Estado de Retención SRS (Curva de Memoria)</h3>
            </div>
            <span className="text-xs text-slate-400">
              Total aprendidos:{' '}
              <strong className={totalAprendidos > 0 ? 'text-white' : 'text-slate-400'}>
                {totalAprendidos}
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            {/* Aprendiz */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-rose-400">Aprendiz</span>
                <span className="text-[10px] text-slate-500">Niveles 1-3</span>
              </div>
              <div className="text-xl font-black text-rose-200">{srsStages.aprendiz}</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pctAprendiz}%` }}
                />
              </div>
            </div>

            {/* Gurú */}
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/30 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-purple-400">Gurú</span>
                <span className="text-[10px] text-slate-500">Niveles 4-6</span>
              </div>
              <div className="text-xl font-black text-purple-200">{srsStages.guru}</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pctGuru}%` }}
                />
              </div>
            </div>

            {/* Maestro */}
            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/30 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-blue-400">Maestro</span>
                <span className="text-[10px] text-slate-500">Niveles 7-8</span>
              </div>
              <div className="text-xl font-black text-blue-200">{srsStages.maestro}</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pctMaestro}%` }}
                />
              </div>
            </div>

            {/* Iluminado / Dominado */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-amber-400">Dominado</span>
                <span className="text-[10px] text-slate-500">Nivel 9</span>
              </div>
              <div className="text-xl font-black text-amber-200">{srsStages.iluminado}</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pctIluminado}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* VENTANA EMERGENTE: REPASO DIARIO YA VISTO                            */}
        {/* ==================================================================== */}
        {showAllReviewedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
              {/* Botón cerrar */}
              <button
                onClick={() => setShowAllReviewedModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Cerrar ventana"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icono central de éxito */}
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              {/* Mensaje principal */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <span>✓ Ciclo Diario al Día</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  ¡Ya viste las tarjetas del día!
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Has completado todas las tarjetas de repaso programadas para hoy. No tienes más repasos pendientes en este ciclo.
                </p>
              </div>

              {/* Explicación pedagógica de la curva de retención */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-xs space-y-2 text-left">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <Brain className="w-4 h-4" />
                  <span>¿Cómo funciona tu curva de retención?</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Para fijar el vocabulario en tu memoria a largo plazo sin saturar tu mente, el algoritmo SRS programa pausas de consolidación. Tus tarjetas volverán a activarse automáticamente según su intervalo (4h, 8h, 24h, etc.).
                </p>
                <div className="pt-2 border-t border-slate-700/60 flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Total en retención activa:</span>
                  <span className="font-bold text-white">{totalAprendidos} tarjetas</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowAllReviewedModal(false);
                    if (onOpenCurriculum) onOpenCurriculum();
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Continuar estudiando lecciones</span>
                </button>
                <button
                  onClick={() => setShowAllReviewedModal(false)}
                  className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Entendido, volver al Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
