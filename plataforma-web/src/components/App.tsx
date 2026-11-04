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
  Smartphone,
  LogIn,
  Trophy,
} from 'lucide-react';
import { Dashboard } from './Dashboard';
import { CurriculumMap } from './CurriculumMap';
import { ActiveLesson } from './ActiveLesson';
import { SRSReview } from './SRSReview';
import { ProfileSetupModal } from './ProfileSetupModal';
import { AuthModal } from './AuthModal';
import { JLPTExamSimulator } from './JLPTExamSimulator';
import { IntroSplash } from './IntroSplash';
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
import { isUserLoggedIn } from '../lib/auth';
import { getLessonContentById } from '../lib/lessonsData';
import { UserProfile, CurriculumLevel, SRSFlashcardItem, JLPTLevel } from '../types';
import { formatNumber } from '../lib/format';

const DEFAULT_GUEST_USER: UserProfile = {
  id: 'usr_device_guest',
  nombre: 'Estudiante',
  email: 'estudiante@yukilearning.local',
  avatar_icon: '🌸',
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
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'curriculum' | 'lesson' | 'review' | 'exam'>('dashboard');
  const [examLevel, setExamLevel] = useState<JLPTLevel>('N2');
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST_USER);
  const [curriculum, setCurriculum] = useState<CurriculumLevel[]>([]);
  const [srsDeck, setSrsDeck] = useState<SRSFlashcardItem[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string>('intro_01');
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
  const [canCancelModal, setCanCancelModal] = useState<boolean>(false);

  // Estados de Autenticación e Inicio de Sesión Cross-Device
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'sync'>('login');

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

  // Manejador tras login o registro exitoso
  const handleAuthSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    const updatedCurriculum = loadStoredCurriculum(newUser.nivel_actual_jlpt);
    setCurriculum(updatedCurriculum);
    const updatedDeck = loadStoredSRSDeck();
    setSrsDeck(updatedDeck);
    setShowAuthModal(false);
  };

  // Manejador de cierre de sesión
  const handleLogout = () => {
    const { freshProfile, freshCurriculum, freshDeck } = resetDeviceData('INTRO');
    setUser(freshProfile);
    setCurriculum(freshCurriculum);
    setSrsDeck(freshDeck);
    setCurrentView('dashboard');
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

  // Manejador para abrir el simulador de exámenes JLPT
  const handleStartExam = (level?: JLPTLevel) => {
    setExamLevel(level || 'N2');
    setCurrentView('exam');
  };

  // Manejador al terminar un simulacro oficial
  const handleFinishExam = (result: any) => {
    if (result?.xpGanada) {
      addXP(result.xpGanada);
    }
  };

  // Métricas dinámicas calculadas en tiempo real desde localStorage
  const srsMetrics = calculateSRSMetrics(srsDeck);
  const recommendedLesson = getRecommendedLesson(curriculum);
  const activeLessonContent = getLessonContentById(activeLessonId);
  const userLoggedIn = isUserLoggedIn();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg animate-pulse shadow-lg shadow-rose-500/20">
            雪
          </div>
          <span className="text-xs text-slate-400 font-medium">Iniciando Yuki Learning...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Animación de apertura sin sonido al ingresar a la plataforma */}
      {showIntro && <IntroSplash onFinished={() => setShowIntro(false)} />}
      
      {/* ====================================================================== */}
      {/* NAVBAR GLOBAL DE LA PLATAFORMA (DESKTOP & TABLET & MOBILE TOP)         */}
      {/* ====================================================================== */}
      <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo y Nombre */}
          <div
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center font-black text-white text-sm sm:text-base shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              雪
            </div>
            <div>
              <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight text-white flex items-center gap-1 sm:gap-1.5">
                Yuki Learning
                <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[9px] font-bold uppercase tracking-wider">
                  v1.0 Beta
                </span>
                <span className="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[9px] sm:text-[10px] font-bold">
                  {user.nivel_actual_jlpt}
                </span>
              </span>
            </div>
          </div>

          {/* Menú de pestañas para Desktop */}
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

            <button
              onClick={() => {
                setExamLevel(user.nivel_actual_jlpt === 'INTRO' || user.nivel_actual_jlpt === 'N5' ? 'N4' : user.nivel_actual_jlpt);
                setCurrentView('exam');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'exam'
                  ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulador JLPT</span>
            </button>
          </div>

          {/* Acciones: Sincronizar, Racha, XP y Avatar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Botón de Sincronización / Iniciar Sesión para Desktop */}
            <button
              onClick={() => {
                setAuthModalMode(userLoggedIn ? 'sync' : 'login');
                setShowAuthModal(true);
              }}
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded-xl transition-colors"
              title="Iniciar sesión o sincronizar con tu celular"
            >
              {userLoggedIn ? <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> : <LogIn className="w-3.5 h-3.5 text-rose-400" />}
              <span>{userLoggedIn ? 'Sincronizar' : 'Acceder'}</span>
            </button>

            {/* Fuego de Racha */}
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 sm:px-2.5 py-1 rounded-xl">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span>{user.racha_actual}</span>
            </div>
            
            {/* XP Total */}
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 sm:px-2.5 py-1 rounded-xl">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span>{formatNumber(user.xp_total)}</span>
            </div>

            {/* Avatar interactivo en Navbar (Fotografía personalizada o ícono) */}
            <button
              onClick={handleEditProfile}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-xs sm:text-sm shadow-md shadow-rose-500/20 hover:scale-105 transition-transform overflow-hidden border border-slate-700"
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
      {/* VISTA ACTIVA CONDICIONAL (RESPONSIVE CON PADDING INFERIOR PARA MÓVIL)   */}
      {/* ====================================================================== */}
      <main className="flex-1 pb-24 sm:pb-8">
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
            onOpenExam={handleStartExam}
            onEditProfile={handleEditProfile}
            onResetProfile={handleResetProfile}
            onOpenAuth={(mode) => {
              setAuthModalMode(mode || 'sync');
              setShowAuthModal(true);
            }}
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
            onStartExam={handleStartExam}
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
            items={srsMetrics.dueCards}
            onFinishSession={handleFinishReview}
            onClose={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'exam' && (
          <JLPTExamSimulator
            initialLevel={examLevel}
            onFinishExam={handleFinishExam}
            onClose={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* ====================================================================== */}
      {/* BARRA INFERIOR FLOTANTE PARA MÓVILES (RESPONSIVE TOUCH NAVIGATION)     */}
      {/* ====================================================================== */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 transition-all ${
            currentView === 'dashboard' ? 'text-indigo-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Inicio</span>
        </button>

        <button
          onClick={() => setCurrentView('curriculum')}
          className={`flex flex-col items-center gap-1 py-1 transition-all ${
            currentView === 'curriculum' ? 'text-indigo-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px]">Currículo</span>
        </button>

        <button
          onClick={() => setCurrentView('review')}
          className={`relative flex flex-col items-center gap-1 py-1 transition-all ${
            currentView === 'review' ? 'text-indigo-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span className="text-[10px]">Repaso</span>
          {srsMetrics.summary.total > 0 && (
            <span className="absolute 0 -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[9px]">
              {srsMetrics.summary.total}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setExamLevel(user.nivel_actual_jlpt === 'INTRO' || user.nivel_actual_jlpt === 'N5' ? 'N4' : user.nivel_actual_jlpt);
            setCurrentView('exam');
          }}
          className={`flex flex-col items-center gap-1 py-1 transition-all ${
            currentView === 'exam' ? 'text-rose-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">Examen</span>
        </button>

        <button
          onClick={() => {
            setAuthModalMode('sync');
            setShowAuthModal(true);
          }}
          className="flex flex-col items-center gap-1 py-1 text-slate-400 hover:text-indigo-400 transition-all"
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px]">Móvil</span>
        </button>
      </nav>

      {/* ====================================================================== */}
      {/* MODAL DE PERFIL Y AVATAR                                              */}
      {/* ====================================================================== */}
      <ProfileSetupModal
        isOpen={showSetupModal}
        canCancel={canCancelModal}
        initialProfile={canCancelModal ? user : null}
        onSave={handleSaveProfile}
        onClose={() => setShowSetupModal(false)}
      />

      {/* ====================================================================== */}
      {/* MODAL DE AUTENTICACIÓN, REGISTRO Y TRANSFERENCIA MULTI-DISPOSITIVO     */}
      {/* ====================================================================== */}
      <AuthModal
        isOpen={showAuthModal}
        currentUser={user}
        initialMode={authModalMode}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        onLogout={handleLogout}
      />

    </div>
  );
};

export default App;
