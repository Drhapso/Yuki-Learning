export type JLPTLevel = 'INTRO' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type SRSRating = 'dificil' | 'bien' | 'facil';

export type StudyItemType = 'kanji' | 'vocabulario' | 'gramatica' | 'escritura' | 'expresion';

export type LessonStatus = 'bloqueado' | 'disponible' | 'en_progreso' | 'completado';

export interface UserProfile {
  id: string;
  nombre: string;
  email: string;
  avatar_url?: string;
  avatar_icon?: string;
  xp_total: number;
  racha_actual: number;
  racha_maxima: number;
  meta_diaria: number;
  nivel_actual_jlpt: JLPTLevel;
  nivel_usuario: number;
  xp_nivel_actual: number;
  xp_proximo_nivel: number;
}

export interface SRSDueSummary {
  total: number;
  kanji: number;
  vocabulario: number;
  gramatica: number;
}

export interface SRSStageBreakdown {
  aprendiz: number;    // Niveles 1-3
  guru: number;        // Niveles 4-6
  maestro: number;     // Niveles 7-8
  iluminado: number;   // Nivel 9 (Dominado)
}

export interface NextReviewCalculation {
  nuevoNivel: number;
  horasHastaRevision: number;
  fechaProximaRevision: Date;
  etiquetaIntervalo: string;
  etapaSRS: 'Aprendiz' | 'Gurú' | 'Maestro' | 'Iluminado';
}

// ==========================================
// TIPOS PARA EL MAPA DE ESTUDIOS (CURRICULUM)
// ==========================================
export interface LessonNode {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: StudyItemType;
  orden: number;
  estado: LessonStatus;
  xp_recompensa: number;
  total_preguntas: number;
  icono?: string;
}

export interface CurriculumLevel {
  id: JLPTLevel;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  bloqueado: boolean;
  requisitoPrevio?: string;
  lecciones: LessonNode[];
  progresoPorcentaje: number;
}

// ==========================================
// TIPOS PARA LA LECCIÓN ACTIVA
// ==========================================
export interface LessonTheoryExample {
  japones: string;
  lectura: string;
  romaji: string;
  espanol: string;
  audioUrl?: string;
}

export interface LessonTheory {
  titulo: string;
  subtitulo: string;
  conceptoClave: string;
  reglaOFormula?: string;
  puntosClave: string[];
  ejemplos: LessonTheoryExample[];
}

export interface LessonQuestion {
  id: string;
  tipo: 'opcion_multiple' | 'audio_identificacion' | 'kanji_lectura';
  pregunta: string;
  caracterPrincipal: string; // Ej: 食べる, 水, 私
  lecturaHiragana?: string;   // Ej: わたし [ ? ] かるろす です。(Máscara)
  lecturaCompleta?: string;   // Revelación completa tras responder: わたしはカルロスです。
  romaji?: string;            // Ej: Watashi [ ? ] Karurosu desu.
  romajiCompleto?: string;    // Revelación: Watashi wa Karurosu desu.
  audioUrl?: string;
  explicacionContexto?: string;
  opciones: string[];
  indiceCorrecto: number;
}

export interface ActiveLessonContent {
  id: string;
  titulo: string;
  nivel_jlpt: JLPTLevel;
  teoria?: LessonTheory;
  preguntas: LessonQuestion[];
}

// ==========================================
// TIPOS PARA REPASO SRS (FLASHCARDS)
// ==========================================
export interface SRSFlashcardItem {
  id: string;
  tipo: StudyItemType;
  caracter: string;         // Anverso: 日本語 (Kanji / Término)
  lectura: string;          // たべる / にほんご
  romaji: string;           // taberu / nihongo
  significado: string;      // Reverso: Español
  significadosAlternativos?: string[];
  ejemploJapones?: string;
  ejemploEspanol?: string;
  nemotecnica?: string;
  nivel: JLPTLevel;
  nivelMemoriaActual: number; // 1-9
  fechaProximaRevision?: string; // ISO timestamp para persistencia
  totalAciertos?: number;
  totalFallos?: number;
  ultimaRevision?: string;
  audioUrl?: string;
}

// ==========================================
// TIPOS PARA AUTENTICACIÓN Y MULTI-DISPOSITIVO
// ==========================================
export interface UserAccount {
  id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  avatar_url?: string;
  avatar_icon?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface DeviceSyncPayload {
  version: number;
  timestamp: string;
  user: UserProfile;
  curriculum: CurriculumLevel[];
  srsDeck: SRSFlashcardItem[];
  checksum: string;
}
