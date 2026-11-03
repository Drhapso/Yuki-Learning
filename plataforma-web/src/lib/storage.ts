import {
  UserProfile,
  CurriculumLevel,
  LessonNode,
  SRSFlashcardItem,
  SRSRating,
  SRSDueSummary,
  SRSStageBreakdown,
  JLPTLevel,
} from '../types';
import { calculateNextReview, getEtapaSRS } from './srs';
import { MOCK_CURRICULUM, MOCK_FLASHCARDS } from './mockData';

const KEYS = {
  PROFILE: 'yuki_user_profile_v1',
  CURRICULUM: 'yuki_curriculum_v1',
  SRS_DECK: 'yuki_srs_deck_v1',
  LEGACY_PROFILE: 'nihongo_user_profile_v1',
  LEGACY_CURRICULUM: 'nihongo_curriculum_v1',
  LEGACY_SRS_DECK: 'nihongo_srs_deck_v1',
};

// ============================================================================
// 1. GESTIÓN DE PERFIL DE USUARIO
// ============================================================================

export function loadStoredProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEYS.PROFILE) || localStorage.getItem(KEYS.LEGACY_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error al cargar perfil:', e);
    return null;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error al guardar perfil:', e);
  }
}

// ============================================================================
// 2. GESTIÓN DEL CURRÍCULO Y DESBLOQUEO REAL
// ============================================================================

/**
 * Genera la estructura inicial del currículo según el nivel elegido por el usuario:
 * - Si elige 'INTRO': Comienza estrictamente en Lección 1 de INTRO. Todo lo demás bloqueado.
 * - Si elige 'N5': INTRO queda marcado completado (100%) y N5 comienza en Lección 1.
 */
export function getInitialCurriculum(startingLevel: JLPTLevel = 'INTRO'): CurriculumLevel[] {
  return MOCK_CURRICULUM.map((level) => {
    if (startingLevel === 'INTRO') {
      if (level.id === 'INTRO') {
        return {
          ...level,
          bloqueado: false,
          progresoPorcentaje: 0,
          lecciones: level.lecciones.map((l, idx) => ({
            ...l,
            estado: idx === 0 ? 'disponible' : 'bloqueado',
          })),
        };
      }
      return {
        ...level,
        bloqueado: true,
        progresoPorcentaje: 0,
        lecciones: level.lecciones.map((l) => ({ ...l, estado: 'bloqueado' })),
      };
    }

    if (startingLevel === 'N5') {
      if (level.id === 'INTRO') {
        return {
          ...level,
          bloqueado: false,
          progresoPorcentaje: 100,
          lecciones: level.lecciones.map((l) => ({ ...l, estado: 'completado' })),
        };
      }
      if (level.id === 'N5') {
        return {
          ...level,
          bloqueado: false,
          progresoPorcentaje: 0,
          lecciones: level.lecciones.map((l, idx) => ({
            ...l,
            estado: idx === 0 ? 'disponible' : 'bloqueado',
          })),
        };
      }
      return {
        ...level,
        bloqueado: true,
        progresoPorcentaje: 0,
        lecciones: level.lecciones.map((l) => ({ ...l, estado: 'bloqueado' })),
      };
    }

    return level;
  });
}

export function loadStoredCurriculum(startingLevel?: JLPTLevel): CurriculumLevel[] {
  if (typeof window === 'undefined') return MOCK_CURRICULUM;
  try {
    const raw = localStorage.getItem(KEYS.CURRICULUM) || localStorage.getItem(KEYS.LEGACY_CURRICULUM);
    if (raw) return JSON.parse(raw);
    const initial = getInitialCurriculum(startingLevel || 'INTRO');
    saveStoredCurriculum(initial);
    return initial;
  } catch (e) {
    console.error('Error al cargar currículo:', e);
    return MOCK_CURRICULUM;
  }
}

export function saveStoredCurriculum(curriculum: CurriculumLevel[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.CURRICULUM, JSON.stringify(curriculum));
  } catch (e) {
    console.error('Error al guardar currículo:', e);
  }
}

/**
 * Marca una lección completada, recalcula porcentajes y desbloquea la siguiente unidad
 */
export function completeLessonAndUnlockNext(
  curriculum: CurriculumLevel[],
  lessonId: string
): { updatedCurriculum: CurriculumLevel[]; unlockedLevelId?: JLPTLevel } {
  let unlockedLevelId: JLPTLevel | undefined;

  const updatedCurriculum = curriculum.map((level, levelIdx) => {
    const lessonIndex = level.lecciones.findIndex((l) => l.id === lessonId);
    if (lessonIndex === -1) return level;

    // Actualizar lecciones del nivel
    const updatedLessons = level.lecciones.map((lesson, idx) => {
      if (lesson.id === lessonId) {
        return { ...lesson, estado: 'completado' as const };
      }
      // Si la anterior se completó y esta estaba bloqueada, desbloquearla
      if (idx === lessonIndex + 1 && lesson.estado === 'bloqueado') {
        return { ...lesson, estado: 'disponible' as const };
      }
      return lesson;
    });

    const completedCount = updatedLessons.filter((l) => l.estado === 'completado').length;
    const progresoPorcentaje = updatedLessons.length > 0
      ? Math.round((completedCount / updatedLessons.length) * 100)
      : 0;

    return {
      ...level,
      lecciones: updatedLessons,
      progresoPorcentaje,
    };
  });

  // Si un nivel se completó al 100%, desbloquear el siguiente nivel del JLPT
  for (let i = 0; i < updatedCurriculum.length - 1; i++) {
    if (updatedCurriculum[i].progresoPorcentaje === 100 && updatedCurriculum[i + 1].bloqueado) {
      updatedCurriculum[i + 1] = {
        ...updatedCurriculum[i + 1],
        bloqueado: false,
        lecciones: updatedCurriculum[i + 1].lecciones.map((l, idx) => ({
          ...l,
          estado: idx === 0 ? 'disponible' : 'bloqueado',
        })),
      };
      unlockedLevelId = updatedCurriculum[i + 1].id;
      break;
    }
  }

  saveStoredCurriculum(updatedCurriculum);
  return { updatedCurriculum, unlockedLevelId };
}

/**
 * Encuentra de forma dinámica y precisa la lección recomendada que el usuario debe hacer ahora
 */
export function getRecommendedLesson(
  curriculum: CurriculumLevel[]
): { lesson: LessonNode; nivel_jlpt: JLPTLevel; nivelTitulo: string } | null {
  for (const level of curriculum) {
    if (level.bloqueado) continue;

    // Buscar la primera en progreso o disponible
    const active = level.lecciones.find((l) => l.estado === 'en_progreso' || l.estado === 'disponible');
    if (active) {
      return { lesson: active, nivel_jlpt: level.id, nivelTitulo: level.titulo };
    }
  }

  // Si todas están completadas, retornar la última
  for (const level of [...curriculum].reverse()) {
    if (!level.bloqueado && level.lecciones.length > 0) {
      const last = level.lecciones[level.lecciones.length - 1];
      return { lesson: last, nivel_jlpt: level.id, nivelTitulo: level.titulo };
    }
  }

  return null;
}

// ============================================================================
// 3. GESTIÓN DEL MAZO SRS CON PERSISTENCIA
// ============================================================================

export function loadStoredSRSDeck(): SRSFlashcardItem[] {
  if (typeof window === 'undefined') return MOCK_FLASHCARDS;
  try {
    const raw = localStorage.getItem(KEYS.SRS_DECK) || localStorage.getItem(KEYS.LEGACY_SRS_DECK);
    if (raw) return JSON.parse(raw);

    // Inicializar mazo con fecha de revisión para hoy
    const nowIso = new Date().toISOString();
    const initialDeck = MOCK_FLASHCARDS.map((card, idx) => ({
      ...card,
      fechaProximaRevision: nowIso,
      totalAciertos: 0,
      totalFallos: 0,
    }));
    saveStoredSRSDeck(initialDeck);
    return initialDeck;
  } catch (e) {
    console.error('Error al cargar mazo SRS:', e);
    return MOCK_FLASHCARDS;
  }
}

export function saveStoredSRSDeck(deck: SRSFlashcardItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.SRS_DECK, JSON.stringify(deck));
  } catch (e) {
    console.error('Error al guardar mazo SRS:', e);
  }
}

/**
 * Actualiza una tarjeta SRS tras responder (Fácil, Bien, Difícil) y reprograma su fecha en el futuro
 */
export function updateCardInSRSDeck(
  deck: SRSFlashcardItem[],
  cardId: string,
  rating: SRSRating
): { updatedDeck: SRSFlashcardItem[]; updatedCard: SRSFlashcardItem } {
  let updatedCard: SRSFlashcardItem = deck[0];

  const updatedDeck = deck.map((card) => {
    if (card.id !== cardId) return card;

    const calc = calculateNextReview(card.nivelMemoriaActual, rating);
    const isSuccess = rating === 'facil' || rating === 'bien';

    const cardUpdated: SRSFlashcardItem = {
      ...card,
      nivelMemoriaActual: calc.nuevoNivel,
      fechaProximaRevision: calc.fechaProximaRevision.toISOString(),
      ultimaRevision: new Date().toISOString(),
      totalAciertos: (card.totalAciertos || 0) + (isSuccess ? 1 : 0),
      totalFallos: (card.totalFallos || 0) + (isSuccess ? 0 : 1),
    };

    updatedCard = cardUpdated;
    return cardUpdated;
  });

  saveStoredSRSDeck(updatedDeck);
  return { updatedDeck, updatedCard };
}

/**
 * Calcula métricas dinámicas reales basadas en las fechas de vencimiento de las tarjetas
 */
export function calculateSRSMetrics(deck: SRSFlashcardItem[]): {
  summary: SRSDueSummary;
  stages: SRSStageBreakdown;
  dueCards: SRSFlashcardItem[];
} {
  const now = new Date();

  // Tarjetas pendientes cuyo intervalo de memoria ya venció
  const dueCards = deck.filter((c) => {
    if (!c.fechaProximaRevision) return true;
    return new Date(c.fechaProximaRevision) <= now;
  });

  const summary: SRSDueSummary = {
    total: dueCards.length,
    kanji: dueCards.filter((c) => c.tipo === 'kanji').length,
    vocabulario: dueCards.filter((c) => c.tipo === 'vocabulario').length,
    gramatica: dueCards.filter((c) => c.tipo === 'gramatica' || c.tipo === 'expresion').length,
  };

  const stages: SRSStageBreakdown = {
    aprendiz: deck.filter((c) => c.nivelMemoriaActual <= 3).length,
    guru: deck.filter((c) => c.nivelMemoriaActual >= 4 && c.nivelMemoriaActual <= 6).length,
    maestro: deck.filter((c) => c.nivelMemoriaActual === 7 || c.nivelMemoriaActual === 8).length,
    iluminado: deck.filter((c) => c.nivelMemoriaActual === 9).length,
  };

  return { summary, stages, dueCards };
}

// ============================================================================
// 4. REINICIO COMPLETO DE CONFIGURACIÓN POR DISPOSITIVO
// ============================================================================

export function resetDeviceData(newStartingLevel: JLPTLevel = 'INTRO'): {
  freshProfile: UserProfile;
  freshCurriculum: CurriculumLevel[];
  freshDeck: SRSFlashcardItem[];
} {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.CURRICULUM);
    localStorage.removeItem(KEYS.SRS_DECK);
    localStorage.removeItem(KEYS.LEGACY_PROFILE);
    localStorage.removeItem(KEYS.LEGACY_CURRICULUM);
    localStorage.removeItem(KEYS.LEGACY_SRS_DECK);
  }

  const freshProfile: UserProfile = {
    id: `usr_${Date.now()}`,
    nombre: 'Estudiante',
    email: 'estudiante@yukilearning.local',
    avatar_icon: '🦊',
    xp_total: 0,
    racha_actual: 1,
    racha_maxima: 1,
    meta_diaria: 20,
    nivel_actual_jlpt: newStartingLevel,
    nivel_usuario: 1,
    xp_nivel_actual: 0,
    xp_proximo_nivel: 100,
  };

  const freshCurriculum = getInitialCurriculum(newStartingLevel);
  const nowIso = new Date().toISOString();
  const freshDeck = MOCK_FLASHCARDS.map((c) => ({
    ...c,
    fechaProximaRevision: nowIso,
    totalAciertos: 0,
    totalFallos: 0,
  }));

  saveStoredProfile(freshProfile);
  saveStoredCurriculum(freshCurriculum);
  saveStoredSRSDeck(freshDeck);

  return { freshProfile, freshCurriculum, freshDeck };
}

