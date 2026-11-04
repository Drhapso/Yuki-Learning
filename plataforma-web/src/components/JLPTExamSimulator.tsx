'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Brain,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  BookOpen,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';
import { JLPTLevel, ExamSectionType, ExamQuestion, JLPTExamData, ExamSessionResult } from '../types';
import { MASTER_EXAMS } from '../lib/examsData';
import { soundManager } from '../lib/audio';
import { saveStoredExamResult } from '../lib/storage';

interface JLPTExamSimulatorProps {
  initialLevel?: JLPTLevel;
  onFinishExam?: (result: ExamSessionResult) => void;
  onClose?: () => void;
}

export const JLPTExamSimulator: React.FC<JLPTExamSimulatorProps> = ({
  initialLevel = 'N2',
  onFinishExam,
  onClose,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(
    initialLevel === 'INTRO' || initialLevel === 'N5' ? 'N4' : initialLevel
  );

  const examKey = `exam_${selectedLevel.toLowerCase()}_official`;
  const currentExam: JLPTExamData = MASTER_EXAMS[examKey] || MASTER_EXAMS.exam_n2_official;

  // Estados del Examen
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [timedMode, setTimedMode] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(currentExam.tiempoTotalMinutos * 60);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  // Navegación de Preguntas
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showScript, setShowScript] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Resultado
  const [resultData, setResultData] = useState<ExamSessionResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reiniciar estado si cambia de nivel antes de empezar
  useEffect(() => {
    if (!examStarted && !examFinished) {
      setSecondsRemaining(currentExam.tiempoTotalMinutos * 60);
      setUserAnswers({});
      setCurrentQuestionIdx(0);
    }
  }, [selectedLevel, examStarted, examFinished, currentExam]);

  // Manejo del Cronómetro Oficial
  useEffect(() => {
    if (examStarted && !examFinished && timedMode && !isTimerPaused) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleCompleteExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, examFinished, timedMode, isTimerPaused]);

  // Formato MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setExamFinished(false);
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setSecondsRemaining(currentExam.tiempoTotalMinutos * 60);
    setIsTimerPaused(false);
  };

  const currentQuestion = currentExam.preguntas[currentQuestionIdx];

  const handleSelectOption = (opcionIdx: number) => {
    if (examFinished) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: opcionIdx,
    }));
  };

  // Reproductor de audio para Choukai
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      soundManager.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToSpeak = currentQuestion.dialogoScript || currentQuestion.caracterPrincipal || currentQuestion.instruccion;
      soundManager.playAudio({
        text: textToSpeak,
        audioUrl: currentQuestion.audioUrl,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    }
  };

  // Finalizar Examen y Calcular Baremo Oficial JLPT
  const handleCompleteExam = () => {
    soundManager.stop();
    setIsPlayingAudio(false);

    // Calcular puntos por sección
    const sectionScores: Record<ExamSectionType, { obtenido: number; maximo: number; porcentaje: number; aprobado: boolean }> = {
      gengo_chishiki: { obtenido: 0, maximo: 60, porcentaje: 0, aprobado: true },
      dokkai: { obtenido: 0, maximo: 60, porcentaje: 0, aprobado: true },
      choukai: { obtenido: 0, maximo: 60, porcentaje: 0, aprobado: true },
    };

    let totalPoints = 0;

    currentExam.preguntas.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected === q.indiceCorrecto) {
        sectionScores[q.seccion].obtenido += q.puntos;
        totalPoints += q.puntos;
      }
    });

    // Calcular porcentajes y verificar umbral de corte de 19 puntos por sección
    let seccionFailed = false;
    let motivoFallo = '';

    (['gengo_chishiki', 'dokkai', 'choukai'] as ExamSectionType[]).forEach((sec) => {
      const secData = sectionScores[sec];
      secData.porcentaje = Math.round((secData.obtenido / secData.maximo) * 100);
      if (secData.obtenido < currentExam.puntajeMinimoSeccion) {
        secData.aprobado = false;
        seccionFailed = true;
        motivoFallo = `Puntaje inferior al mínimo requerido en una sección (< ${currentExam.puntajeMinimoSeccion} pts)`;
      }
    });

    const meetsTotal = totalPoints >= currentExam.puntajeAprobatorio;
    const isPassed = meetsTotal && !seccionFailed;

    if (!meetsTotal && !motivoFallo) {
      motivoFallo = `Puntaje total (${totalPoints} pts) inferior al mínimo aprobatorio (${currentExam.puntajeAprobatorio} pts)`;
    }

    const xpGanada = isPassed ? totalPoints * 2 + 100 : Math.round(totalPoints * 0.8) + 30;

    const sessionResult: ExamSessionResult = {
      examId: currentExam.id,
      nivel: currentExam.nivel,
      puntajeTotal: totalPoints,
      aprobado: isPassed,
      motivoReprobacion: isPassed ? undefined : motivoFallo,
      puntajePorSeccion: sectionScores,
      respuestasUsuario: userAnswers,
      tiempoEmpleadoSegundos: currentExam.tiempoTotalMinutos * 60 - secondsRemaining,
      fecha: new Date().toISOString(),
      xpGanada,
    };

    setResultData(sessionResult);
    setExamFinished(true);
    saveStoredExamResult(sessionResult);

    if (isPassed) {
      soundManager.playLevelUpSound();
    } else {
      soundManager.playErrorSound();
    }

    if (onFinishExam) {
      onFinishExam(sessionResult);
    }
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = currentExam.preguntas.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ==================================================================== */}
        {/* CABECERA Y SELECCIÓN DE NIVEL                                         */}
        {/* ==================================================================== */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={() => {
                  soundManager.stop();
                  onClose();
                }}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Volver"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                  <Trophy className="w-5 h-5" />
                </span>
                <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
                  Simulador de Examen Oficial JLPT
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Prueba estandarizada oficial con cronómetro y baremo de corte real (N1 a N4).
              </p>
            </div>
          </div>

          {/* Selector de Nivel */}
          {!examStarted && (
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-2xl self-start sm:self-auto">
              {(['N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLevel === lvl
                      ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}

          {/* Temporizador y Controles si está activo */}
          {examStarted && !examFinished && (
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border text-sm font-black transition-colors ${
                  secondsRemaining < 300
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse'
                    : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={() => {
                  if (confirm('¿Deseas finalizar el simulacro y evaluar tus respuestas ahora?')) {
                    handleCompleteExam();
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Finalizar</span>
              </button>
            </div>
          )}
        </header>

        {/* ==================================================================== */}
        {/* PANTALLA INICIAL (ANTES DE COMENZAR EL EXAMEN)                        */}
        {/* ==================================================================== */}
        {!examStarted && !examFinished && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-xl shadow-rose-500/20">
                🇯🇵
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                {currentExam.titulo}
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                {currentExam.descripcion}
              </p>
            </div>

            {/* Ficha técnica del Examen */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tiempo Límite</span>
                <span className="text-lg font-black text-white">{currentExam.tiempoTotalMinutos} min</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Puntaje Máximo</span>
                <span className="text-lg font-black text-white">{currentExam.puntajeMaximoTotal} pts</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Puntaje Aprobatorio</span>
                <span className="text-lg font-black text-rose-400">≥ {currentExam.puntajeAprobatorio} pts</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Corte por Sección</span>
                <span className="text-lg font-black text-amber-400">≥ {currentExam.puntajeMinimoSeccion} pts</span>
              </div>
            </div>

            {/* Aviso sobre la Regla de Corte Oficial */}
            <div className="max-w-2xl mx-auto bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl text-xs text-amber-300/90 text-left flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Normativa Oficial JLPT:</strong> Para obtener la certificación no basta con alcanzar el puntaje total; es obligatorio obtener al menos <strong>19/60 puntos en cada una de las tres secciones</strong> (Comprensión Auditiva, Comprensión de Lectura y Conocimiento del Idioma).
              </span>
            </div>

            {/* Botón de inicio */}
            <div className="pt-4">
              <button
                onClick={handleStartExam}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-rose-500/25 hover:scale-105 transition-all inline-flex items-center gap-2.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Comenzar Simulacro Oficial</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* INTERFAZ ACTIVA DEL EXAMEN (PREGUNTAS EN CURSO)                      */}
        {/* ==================================================================== */}
        {examStarted && !examFinished && currentQuestion && (
          <div className="space-y-6">

            {/* Barra de Secciones y Navegador de Preguntas */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-black uppercase">
                  {currentQuestion.seccion === 'gengo_chishiki'
                    ? '言語知識 (Vocabulario / Gramática)'
                    : currentQuestion.seccion === 'dokkai'
                    ? '読解 (Comprensión de Lectura)'
                    : '聴解 (Comprensión Auditiva)'}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  Pregunta {currentQuestionIdx + 1} de {totalQuestions}
                </span>
              </div>

              {/* Barra de progreso de preguntas */}
              <div className="flex items-center gap-1.5">
                {currentExam.preguntas.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestionIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        soundManager.stop();
                        setIsPlayingAudio(false);
                        setCurrentQuestionIdx(idx);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? 'ring-2 ring-rose-400 bg-rose-500 text-white'
                          : isAnswered
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tarjeta de la Pregunta */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 md:p-8 space-y-6 shadow-xl">

              {/* Subtítulo de Mondai */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs sm:text-sm font-extrabold text-amber-400">
                  {currentQuestion.mondaiTitulo}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {currentQuestion.puntos} puntos
                </span>
              </div>

              {/* Instrucción oficial */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {currentQuestion.instruccion}
              </p>

              {/* Panel de Lectura (Dokkai) */}
              {currentQuestion.pasajeLectura && (
                <div className="bg-slate-950/80 border border-slate-800/90 p-5 sm:p-6 rounded-2xl text-slate-200 text-sm md:text-base leading-relaxed tracking-wide font-serif shadow-inner whitespace-pre-wrap">
                  {currentQuestion.pasajeLectura}
                </div>
              )}

              {/* Panel de Audio Nativo Oficial (Choukai) */}
              {currentQuestion.seccion === 'choukai' && (
                <div className="bg-indigo-950/20 border border-indigo-500/30 p-5 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleToggleAudio}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all shadow-lg ${
                          isPlayingAudio
                            ? 'bg-rose-600 animate-pulse shadow-rose-600/30'
                            : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                        }`}
                        title={isPlayingAudio ? 'Pausar audio' : 'Reproducir audio oficial'}
                      >
                        {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                      </button>

                      <div>
                        <span className="text-xs font-bold text-indigo-300 block">
                          Audio Oficial de Escucha
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {isPlayingAudio ? 'Reproduciendo a velocidad nativa...' : 'Haz clic para escuchar el diálogo'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowScript((prev) => !prev)}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 self-start sm:self-auto py-1"
                    >
                      {showScript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{showScript ? 'Ocultar Script' : 'Ver Transcripción'}</span>
                    </button>
                  </div>

                  {showScript && currentQuestion.dialogoScript && (
                    <div className="pt-3 border-t border-indigo-500/20 text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-950/50 p-3 rounded-xl">
                      {currentQuestion.dialogoScript}
                    </div>
                  )}
                </div>
              )}

              {/* Enunciado o Carácter Principal */}
              {currentQuestion.caracterPrincipal && (
                <div className="text-base sm:text-lg md:text-xl font-bold text-white tracking-wide py-2">
                  {currentQuestion.caracterPrincipal}
                </div>
              )}

              {/* Lista de Opciones */}
              <div className="space-y-3 pt-2">
                {currentQuestion.opciones.map((opcion, idx) => {
                  const isSelected = userAnswers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm md:text-base font-semibold transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                          : 'bg-slate-950/50 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                            isSelected ? 'bg-white text-indigo-600' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span>{opcion}</span>
                      </div>

                      {isSelected && <Check className="w-5 h-5 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Botones Anterior / Siguiente */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => {
                    soundManager.stop();
                    setIsPlayingAudio(false);
                    setCurrentQuestionIdx((prev) => Math.max(0, prev - 1));
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                {currentQuestionIdx < totalQuestions - 1 ? (
                  <button
                    onClick={() => {
                      soundManager.stop();
                      setIsPlayingAudio(false);
                      setCurrentQuestionIdx((prev) => Math.min(totalQuestions - 1, prev + 1));
                    }}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteExam}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <span>Entregar y Evaluar</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PANTALLA DE RESULTADOS Y DIAGNÓSTICO OFICIAL                          */}
        {/* ==================================================================== */}
        {examFinished && resultData && (
          <div className="space-y-6">

            {/* Tarjeta de Veredicto Oficial */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-2xl text-center space-y-4 ${
                resultData.aprobado
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100 shadow-emerald-900/20'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-100 shadow-rose-900/20'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto ${
                  resultData.aprobado ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                }`}
              >
                {resultData.aprobado ? '合格' : '不合'}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Dictamen Oficial JLPT {resultData.nivel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  {resultData.aprobado ? '¡APROBADO CON ÉXITO! (合格)' : 'NO APROBADO (不合格)'}
                </h2>
                {resultData.motivoReprobacion && (
                  <p className="text-xs text-rose-300 mt-1 max-w-md mx-auto">
                    {resultData.motivoReprobacion}
                  </p>
                )}
              </div>

              {/* Puntaje Total */}
              <div className="inline-flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-6 py-3 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Puntaje Obtenido</span>
                  <span className="text-2xl font-black text-white">
                    {resultData.puntajeTotal} <span className="text-xs text-slate-400 font-normal">/ 180</span>
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">XP Ganada</span>
                  <span className="text-2xl font-black text-amber-400">+{resultData.xpGanada} XP</span>
                </div>
              </div>
            </div>

            {/* Desglose por Sección */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['gengo_chishiki', 'dokkai', 'choukai'] as ExamSectionType[]).map((sec) => {
                const s = resultData.puntajePorSeccion[sec];
                const label =
                  sec === 'gengo_chishiki'
                    ? 'Conocimiento del Idioma'
                    : sec === 'dokkai'
                    ? 'Lectura (Dokkai)'
                    : 'Escucha (Choukai)';
                return (
                  <div key={sec} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{label}</span>
                      <span className={s.obtenido >= 19 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {s.obtenido} / 60
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          s.obtenido >= 19 ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${s.porcentaje}%` }}
                      />
                    </div>

                    <span className="text-[10px] text-slate-400 block">
                      {s.obtenido >= 19 ? '✓ Superó el corte mínimo (19 pts)' : '✗ Inferior al mínimo requerido'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Revisión Pregunta por Pregunta */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>Revisión Detallada de Preguntas y Explicaciones</span>
              </h3>

              <div className="space-y-4">
                {currentExam.preguntas.map((q, idx) => {
                  const studentAns = resultData.respuestasUsuario[q.id];
                  const isCorrect = studentAns === q.indiceCorrecto;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border text-left space-y-2.5 ${
                        isCorrect ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-rose-950/10 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">
                          {q.mondaiTitulo} · Pregunta {idx + 1}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {isCorrect ? 'Correcta' : 'Incorrecta'}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-white">
                        {q.caracterPrincipal || q.instruccion}
                      </div>

                      <div className="text-xs text-slate-300 space-y-1">
                        <div>
                          <strong>Tu respuesta:</strong>{' '}
                          {studentAns !== undefined ? q.opciones[studentAns] : 'No contestada'}
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-400">
                            <strong>Respuesta correcta:</strong> {q.opciones[q.indiceCorrecto]}
                          </div>
                        )}
                        <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                          💡 <strong>Explicación:</strong> {q.explicacion}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botones de Acción al terminar */}
            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={handleStartExam}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Examen</span>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all"
                >
                  Regresar al Dashboard
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default JLPTExamSimulator;

