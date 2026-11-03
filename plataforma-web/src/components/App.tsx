'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Brain,
  Flame,
  Zap,
  Globe2,
  UserCog,
} from 'lucide-react';
import { Dashboard } from './Dashboard';
import { CurriculumMap } from './CurriculumMap';
import { ActiveLesson } from './ActiveLesson';
import { SRSReview } from './SRSReview';
import { ProfileSetupModal } from './ProfileSetupModal';
import {
  loadStoredProfile,
  saveStoredProfile,
  loadStoredCurriculum,
  saveStoredCurriculum,
  loadStoredSRSDeck,
  saveStoredSRSDeck,
  calculateSRSMetrics,
  getRecommendedLesson,
  completeLessonAndUnlockNext,
  resetDeviceData,
  getInitialCurriculum,
} from '../lib/storage';
import { getLessonContentById } from '../lib/lessonsData';
import { UserProfile, CurriculumLevel, SRSFlashcardItem, JLPTLevel } from '../types';
import { formatNumber } from '../lib/format';

const DEFAULT_GUEST_USER: UserProfile = {
  id: 'usr_device_guest',
  nombre: 'Estudiante',
  email: 'estudiante@yukilearning.local',
  avatar_icon: '🦊',
  xp_total: 0,
  racha_actual: 1,
  racha_maxima: 1,
  meta_diaria: 20,
  nivel_actual_jlpt: 'INTRO',
  nivel_usuario: 1,
  xp_nivel_actual: 0,
  xp_proximo_nivel: 100,
};

export const App: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'curriculum' | 'lesson' | 'review'>('dashboard');
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST_USER);
  const [curriculum, setCurriculum] = useState<CurriculumLevel[]>([]);
  const [srsDeck, setSrsDeck] = useState<SRSFlashcardItem[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string>('intro_01');
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
  const [canCancelModal, setCanCancelModal] = useState<boolean>(false);

  // Carga inicial y sincronización con el almacenamiento de este dispositivo
  useEffect(() => {
    setMounted(true);
    const stored = loadStoredProfile();
    if (stored) {
      setUser(stored);
      const storedCurr = loadStoredCurriculum(stored.nivel_actual_jlpt);
      setCurriculum(storedCurr);
      const storedDeck = loadStoredSRSDeck();
      setSrsDeck(storedDeck);
    } else {
      // Dispositivo nuevo o configuración limpia: inicializar estado limpio y solicitar perfil
      const { freshProfile, freshCurriculum, freshDeck } = resetDeviceData('INTRO');
      setUser(freshProfile);
      setCurriculum(freshCurriculum);
      setSrsDeck(freshDeck);
      setShowSetupModal(true);
      setCanCancelModal(false);
    }
  }, []);

  // Guardar nuevo perfil o actualización en localStorage
  const handleSaveProfile = (newProfile: UserProfile) => {
    setUser(newProfile);
    saveStoredProfile(newProfile);

    // Sincronizar currículo según el nivel seleccionado
    const updatedCurriculum = loadStoredCurriculum(newProfile.nivel_actual_jlpt);
    setCurriculum(updatedCurriculum);
    setShowSetupModal(false);
  };

  // Reiniciar la configuración para comenzar con un nuevo perfil desde cero
  const handleResetProfile = () => {
    if (confirm('¿Deseas reiniciar la configuración en este dispositivo y crear tu propio perfil?')) {
      const { freshProfile, freshCurriculum, freshDeck } = resetDeviceData('INTRO');
      setUser(freshProfile);
      setCurriculum(freshCurriculum);
      setSrsDeck(freshDeck);
      setActiveLessonId('intro_01');
      setShowSetupModal(true);
      setCanCancelModal(false);
      setCurrentView('dashboard');
    }
  };

  // Abrir modal en modo edición
  const handleEditProfile = () => {
    setShowSetupModal(true);
    setCanCancelModal(true);
  };

  // Otorgar XP y persistir en el perfil del dispositivo
  const addXP = (amount: number) => {
    setUser((prev) => {
      const nuevoTotal = prev.xp_total + amount;
      let nuevoNivelActualXP = prev.xp_nivel_actual + amount;
      let nivelUsuario = prev.nivel_usuario;
      let proximoNivelXP = prev.xp_proximo_nivel;

      if (nuevoNivelActualXP >= proximoNivelXP) {
        nuevoNivelActualXP -= proximoNivelXP;
        nivelUsuario += 1;
        proximoNivelXP = Math.round(proximoNivelXP * 1.25);
      }

      const updated: UserProfile = {
        ...prev,
        xp_total: nuevoTotal,
        nivel_usuario: nivelUsuario,
        xp_nivel_actual: nuevoNivelActualXP,
        xp_proximo_nivel: proximoNivelXP,
      };

      saveStoredProfile(updated);
      return updated;
    });
  };

  // Manejador al finalizar una lección: desbloquea la siguiente y suma XP
  const handleFinishLesson = (xpGanada: number) => {
    addXP(xpGanada);
    if (activeLessonId && curriculum.length > 0) {
      const { updatedCurriculum } = completeLessonAndUnlockNext(curriculum, activeLessonId);
      setCurriculum(updatedCurriculum);
    }
    setCurrentView('curriculum');
  };

  // Manejador al finalizar el repaso SRS
  const handleFinishReview = (count: number, xpGanada: number, updatedDeck?: SRSFlashcardItem[]) => {
    addXP(xpGanada);
    if (updatedDeck) {
      setSrsDeck(updatedDeck);
    }
    setCurrentView('dashboard');
  };

  // Métricas dinámicas calculadas en tiempo real desde localStorage
  const srsMetrics = calculateSRSMetrics(srsDeck);
  const recommendedLesson = getRecommendedLesson(curriculum);
  const activeLessonContent = getLessonContentById(activeLessonId);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg animate-pulse shadow-lg shadow-rose-500/20">
            日
          </div>
          <span className="text-xs text-slate-400 font-medium">Iniciando Yuki Learning...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* ====================================================================== */}
      {/* NAVBAR GLOBAL DE LA PLATAFORMA                                         */}
      {/* ====================================================================== */}
      <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo y Nombre */}
          <div
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              雪
            </div>
            <div>
              <span className="font-extrabold text-sm md:text-base tracking-tight text-white flex items-center gap-1.5">
                Yuki Learning
                <span className="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                  {user.nivel_actual_jlpt}
                </span>
              </span>
            </div>
          </div>

          {/* Menú de pestañas */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView('curriculum')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'curriculum'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Currículo</span>
            </button>

            <button
              onClick={() => setCurrentView('review')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'review'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Repaso SRS</span>
              {srsMetrics.summary.total > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                  {srsMetrics.summary.total}
                </span>
              )}
            </button>
          </div>

          {/* Insignias de Racha, XP y Avatar de Perfil */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{user.racha_actual}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-xl">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{formatNumber(user.xp_total)}</span>
            </div>

            {/* Avatar interactivo en Navbar (Fotografía personalizada o ícono) */}
            <button
              onClick={handleEditProfile}
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-sm shadow-md shadow-rose-500/20 hover:scale-105 transition-transform overflow-hidden border border-slate-700"
              title={`Perfil: ${user.nombre} (Clic para editar)`}
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user.avatar_icon || user.nombre.charAt(0)}</span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* ====================================================================== */}
      {/* VISTA ACTIVA CONDICIONAL                                               */}
      {/* ====================================================================== */}
      <main className="flex-1">
        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            srsSummary={srsMetrics.summary}
            srsStages={srsMetrics.stages}
            recommendedLesson={recommendedLesson}
            onStartReview={() => setCurrentView('review')}
            onOpenCurriculum={() => setCurrentView('curriculum')}
            onContinueLesson={(targetId) => {
              setActiveLessonId(targetId || recommendedLesson?.lesson.id || 'intro_01');
              setCurrentView('lesson');
            }}
            onEditProfile={handleEditProfile}
            onResetProfile={handleResetProfile}
          />
        )}

        {currentView === 'curriculum' && (
          <CurriculumMap
            curriculum={curriculum}
            onSelectLesson={(id) => {
              setActiveLessonId(id);
              setCurrentView('lesson');
            }}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'lesson' && (
          <ActiveLesson
            lesson={activeLessonContent}
            onFinishLesson={handleFinishLesson}
            onClose={() => setCurrentView('curriculum')}
          />
        )}

        {currentView === 'review' && (
          <SRSReview
            items={srsMetrics.dueCards.length > 0 ? srsMetrics.dueCards : srsDeck}
            onFinishSession={handleFinishReview}
            onClose={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* ====================================================================== */}
      {/* MODAL DE CONFIGURACIÓN Y ASISTENTE DE PERFIL POR DISPOSITIVO           */}
      {/* ====================================================================== */}
      <ProfileSetupModal
        isOpen={showSetupModal}
        canCancel={canCancelModal}
        initialProfile={canCancelModal ? user : null}
        onSave={handleSaveProfile}
        onClose={() => setShowSetupModal(false)}
      />

    </div>
  );
};

export default App;
