import { ActiveLessonContent } from '../types';

export const MASTER_LESSONS: Record<string, ActiveLessonContent> = {
  // ==========================================================================
  // LECCIÓN INTRO 01: SILABARIO HIRAGANA
  // ==========================================================================
  intro_01: {
    id: 'intro_01',
    titulo: 'Silabario Hiragana: Las 5 Vocales y Filas K, S, T',
    nivel_jlpt: 'INTRO',
    teoria: {
      titulo: 'Fundamento 1: Las 5 Vocales Puras del Japonés',
      subtitulo: 'Módulo 0 · Escritura y Fonética Básica',
      conceptoClave:
        'El japonés es un idioma silábico. Cada caracter de Hiragana representa exactamente un sonido (mora). No existen diptongos variables como en español o inglés: cada vocal tiene un tono puro y constante.',
      reglaOFormula: 'Vocales base: あ (a), い (i), う (u), え (e), お (o)',
      puntosClave: [
        'う (u) se pronuncia sin redondear los labios hacia afuera (sonido relajado).',
        'La fila K agrega el sonido "k" a las vocales: か (ka), き (ki), く (ku), け (ke), こ (ko).',
        'La fila S contiene una excepción fonética vital: no se dice "si", sino し (shi).',
        'La fila T contiene dos excepciones: no se dice "ti" ni "tu", sino ち (chi) y つ (tsu).',
      ],
      ejemplos: [
        {
          japones: 'あさ',
          lectura: 'あさ',
          romaji: 'asa',
          espanol: 'Mañana (inicio del día)',
        },
        {
          japones: 'すし',
          lectura: 'すし',
          romaji: 'sushi',
          espanol: 'Sushi (platillo tradicional)',
        },
        {
          japones: 'つき',
          lectura: 'つき',
          romaji: 'tsuki',
          espanol: 'Luna',
        },
      ],
    },
    preguntas: [
      {
        id: 'intro_q1',
        tipo: 'kanji_lectura',
        pregunta: '¿Cuál es la pronunciación correcta del caracter あ?',
        caracterPrincipal: 'あ',
        lecturaHiragana: 'Caracter vocal básico',
        romaji: 'Vocal 1',
        lecturaCompleta: 'あ (a)',
        romajiCompleto: 'a',
        explicacionContexto: 'あ es el primer caracter del silabario Hiragana y representa el sonido vocal puro "a".',
        opciones: ['a', 'o', 'e', 'u'],
        indiceCorrecto: 0,
      },
      {
        id: 'intro_q2',
        tipo: 'opcion_multiple',
        pregunta: 'Identifica la excepción fonética de la fila S (さ, す, せ, そ):',
        caracterPrincipal: 'し',
        lecturaHiragana: 'Excepción de la fila S',
        romaji: 'Fila S',
        lecturaCompleta: 'し (shi)',
        romajiCompleto: 'shi (no "si")',
        explicacionContexto: 'En japonés no existe el sonido "si". El caracter し se pronuncia invariablemente como "shi" (similar a "she" en inglés).',
        opciones: ['si', 'shi', 'chi', 'su'],
        indiceCorrecto: 1,
      },
      {
        id: 'intro_q3',
        tipo: 'opcion_multiple',
        pregunta: '¿Cómo se lee la palabra つき (luna)?',
        caracterPrincipal: 'つき',
        lecturaHiragana: 'Lectura de 2 moras',
        romaji: 'Palabra de naturaleza',
        lecturaCompleta: 'つき (tsuki)',
        romajiCompleto: 'tsuki',
        explicacionContexto: 'つ es "tsu" (excepción de la fila T) y き es "ki". Juntos forman "tsuki" (luna).',
        opciones: ['tuki', 'suki', 'tsuki', 'chiki'],
        indiceCorrecto: 2,
      },
      {
        id: 'intro_q4',
        tipo: 'kanji_lectura',
        pregunta: 'Selecciona el caracter que corresponde al sonido "ka":',
        caracterPrincipal: '[ ? ] = "ka"',
        lecturaHiragana: 'Sonido "ka"',
        romaji: 'ka',
        lecturaCompleta: 'か (ka)',
        romajiCompleto: 'ka',
        explicacionContexto: 'か es el primer caracter de la fila K y se escribe con tres trazos característicos.',
        opciones: ['き', 'か', 'く', 'け'],
        indiceCorrecto: 1,
      },
      {
        id: 'intro_q5',
        tipo: 'opcion_multiple',
        pregunta: '¿Qué palabra se forma combinando: い (i) + え (e)?',
        caracterPrincipal: 'いえ',
        lecturaHiragana: 'Palabra cotidiana',
        romaji: 'i + e',
        lecturaCompleta: 'いえ (ie) = Casa',
        romajiCompleto: 'ie (Casa / Hogar)',
        explicacionContexto: 'いえ (ie) significa "casa" u "hogar" en japonés.',
        opciones: ['No (negación)', 'Casa / Hogar', 'Buenos días', 'Agua'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // LECCIÓN N5 01: DEMOSTRATIVOS (KORE, SORE, ARE) Y DESU
  // ==========================================================================
  n5_01: {
    id: 'n5_01',
    titulo: 'Demostrativos: Kore (これ), Sore (それ), Are (あれ) y Desu (です)',
    nivel_jlpt: 'N5',
    teoria: {
      titulo: 'El Sistema Espacial Ko-So-A-Do',
      subtitulo: 'Módulo 1 · Lección 1 (JLPT N5)',
      conceptoClave:
        'En japonés, la distancia física entre los objetos y los interlocutores determina qué palabra demostrativa utilizar. Se divide en tres zonas estrictas.',
      reglaOFormula: 'Objeto + は + Sustantivo + です (desu)',
      puntosClave: [
        'これ (Kore): "Esto" — El objeto está cerca del hablante.',
        'それ (Sore): "Eso" — El objeto está cerca de la persona que escucha.',
        'あれ (Are): "Aquello" — El objeto está lejos de ambos hablantes.',
        'です (Desu): Cópula formal de cortesía afirmativa ("Es" / "Son").',
      ],
      ejemplos: [
        {
          japones: 'これは本です。',
          lectura: 'これはほんです。',
          romaji: 'Kore wa hon desu.',
          espanol: 'Esto es un libro (cerca de mí).',
          audioUrl: '/api/audio/GRAMATICA/NHKWORLD/audio%20lesson/audio_lesson_01.mp3',
        },
        {
          japones: 'それはペンです。',
          lectura: 'それはぺんです。',
          romaji: 'Sore wa pen desu.',
          espanol: 'Eso es un bolígrafo (cerca de ti).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n5_1_q1',
        tipo: 'opcion_multiple',
        pregunta: 'Deseas señalar un objeto que tú mismo tienes en tus manos. ¿Qué palabra usas?',
        caracterPrincipal: '[ ? ] はペンです。',
        lecturaHiragana: '[ ? ] は ぺん です。',
        romaji: '[ ? ] wa pen desu.',
        lecturaCompleta: 'これはペンです。(Kore wa pen desu)',
        romajiCompleto: 'Kore wa pen desu.',
        explicacionContexto: 'これ (kore) se utiliza exclusivamente cuando el objeto está en posesión o cercanía inmediata de quien está hablando.',
        opciones: ['これ (Kore)', 'それ (Sore)', 'あれ (Are)', 'どれ (Dore)'],
        indiceCorrecto: 0,
      },
      {
        id: 'n5_1_q2',
        tipo: 'opcion_multiple',
        pregunta: 'El objeto que quieres mencionar está sobre la mesa de la persona con quien hablas:',
        caracterPrincipal: '[ ? ] は本です。',
        lecturaHiragana: '[ ? ] は ほん です。',
        romaji: '[ ? ] wa hon desu.',
        lecturaCompleta: 'それは本です。(Sore wa hon desu)',
        romajiCompleto: 'Sore wa hon desu.',
        explicacionContexto: 'それ (sore) indica que el objeto está en la esfera o proximidad del oyente.',
        opciones: ['これ (Kore)', 'それ (Sore)', 'あれ (Are)', 'ここ (Koko)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n5_1_q3',
        tipo: 'opcion_multiple',
        pregunta: 'Un edificio que ves a lo lejos en el horizonte (lejos de ti y de tu acompañante):',
        caracterPrincipal: '[ ? ] は病院です。',
        lecturaHiragana: '[ ? ] は びょういん です。',
        romaji: '[ ? ] wa byouin desu.',
        lecturaCompleta: 'あれは病院です。(Are wa byouin desu)',
        romajiCompleto: 'Are wa byouin desu.',
        explicacionContexto: 'あれ (are) expresa lejanía mutua: el objeto está lejos tanto del hablante como del oyente.',
        opciones: ['これ (Kore)', 'それ (Sore)', 'あれ (Are)', 'だれ (Dare)'],
        indiceCorrecto: 2,
      },
    ],
  },

  // ==========================================================================
  // LECCIÓN N5 02: PARTÍCULAS は (WA) Y が (GA)
  // ==========================================================================
  n5_02: {
    id: 'n5_02',
    titulo: 'Partículas Clave: は (wa) Tópico vs が (ga) Sujeto',
    nivel_jlpt: 'N5',
    teoria: {
      titulo: 'El Pilar Gramatical del Japonés: Tópico vs Sujeto',
      subtitulo: 'Módulo 1 · Lección 2 (JLPT N5)',
      conceptoClave:
        'En japonés, las palabras no tienen sentido completo sin sus "partículas" posposicionales. La partícula は (se escribe con el kana "ha" pero se lee siempre "wa") marca el TÓPICO general de conversación ("Hablando de..."). La partícula が (ga) marca al SUJETO gramatical específico de la acción.',
      reglaOFormula: 'Estructura: [Tópico] + は (wa) + [Información que se afirma o describe]',
      puntosClave: [
        'は (wa) pone el énfasis en la información que viene DESPUÉS (lo nuevo que decimos del sujeto).',
        'が (ga) pone el énfasis en la palabra que está ANTES (identifica con precisión "quién" realiza la acción).',
        'Para presentarse o hablar de uno mismo se utiliza siempre 私は〜です (Watashi wa... desu).',
      ],
      ejemplos: [
        {
          japones: '私は学生です。',
          lectura: 'わたしはがくせいです。',
          romaji: 'Watashi wa gakusei desu.',
          espanol: 'En cuanto a mí, soy estudiante.',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-06]_hanasu1-1.mp3',
        },
        {
          japones: '猫がいます。',
          lectura: 'ねこがいます。',
          romaji: 'Neko ga imasu.',
          espanol: 'Hay un gato (específicamente un gato presente).',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-01]_kiku.mp3',
        },
      ],
    },
    preguntas: [
      {
        id: 'n5_2_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la partícula correcta para marcar el tópico de presentación personal?',
        caracterPrincipal: '私 [ ? ] カルロスです。',
        lecturaHiragana: 'わたし [ ? ] かるろす です。',
        romaji: 'Watashi [ ? ] Karurosu desu.',
        lecturaCompleta: '私はカルロスです。(Watashi wa Karurosu desu)',
        romajiCompleto: 'Watashi wa Karurosu desu.',
        audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-06]_hanasu1-1.mp3',
        explicacionContexto: 'La partícula は (pronunciada "wa") introduce el tema general sobre el que se hablará ("En cuanto a mí, soy Carlos").',
        opciones: ['は (wa)', 'が (ga)', 'を (wo)', 'に (ni)'],
        indiceCorrecto: 0,
      },
      {
        id: 'n5_2_q2',
        tipo: 'kanji_lectura',
        pregunta: 'Identifica el significado y lectura del kanji:',
        caracterPrincipal: '水',
        lecturaHiragana: 'Lectura Kunyomi elemental',
        romaji: 'Sustantivo líquido',
        lecturaCompleta: '水 = みず (mizu) - Agua',
        romajiCompleto: 'mizu (Agua)',
        explicacionContexto: 'El kanji 水 representa el agua en su lectura Kunyomi (mizu). En Onyomi se pronuncia SUI (como en suiyoubi, miércoles).',
        opciones: ['Fuego (hi)', 'Agua (mizu)', 'Árbol (ki)', 'Oro / Dinero (kane)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n5_2_q3',
        tipo: 'opcion_multiple',
        pregunta: 'Completa la oración con la partícula de objeto directo: "Bebo agua"',
        caracterPrincipal: '毎日、水 [ ? ] 飲みます。',
        lecturaHiragana: 'まいにち、みず [ ? ] のみます。',
        romaji: 'Mainichi, mizu [ ? ] nomimasu.',
        lecturaCompleta: '毎日、水を飲みます。(Mainichi, mizu wo nomimasu)',
        romajiCompleto: 'Mainichi, mizu wo nomimasu.',
        audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-02]_kiku1.mp3',
        explicacionContexto: 'La partícula を (wo/o) marca el objeto directo que recibe la acción del verbo transitivo 飲む (beber).',
        opciones: ['で (de)', 'へ (e)', 'を (wo)', 'と (to)'],
        indiceCorrecto: 2,
      },
      {
        id: 'n5_2_q4',
        tipo: 'kanji_lectura',
        pregunta: '¿Cuál es la conjugación formal en presente afirmativo del verbo 食べる (comer)?',
        caracterPrincipal: '食べる (Grupo 2 - Ichidan)',
        lecturaHiragana: 'Forma -Masu de cortesía',
        romaji: 'Conjugación verbal formal',
        lecturaCompleta: '食べます (tabemasu) = Como / Come',
        romajiCompleto: 'tabemasu',
        explicacionContexto: '食べる es un verbo Ichidan (Grupo 2). Para formar el presente cortés se remueve "ru" y se añade "masu": 食べます (tabemasu).',
        opciones: ['食べません (tabemasen)', '食べました (tabemashita)', '食べます (tabemasu)', '食べて (tabete)'],
        indiceCorrecto: 2,
      },
      {
        id: 'n5_2_q5',
        tipo: 'opcion_multiple',
        pregunta: 'Selecciona la traducción exacta de: "Esto es un libro"',
        caracterPrincipal: 'これは本です。',
        lecturaHiragana: 'Demostrativo + Objeto + Desu',
        romaji: 'Kore wa hon desu.',
        lecturaCompleta: 'これは本です。(Esto es un libro)',
        romajiCompleto: 'Esto es un libro.',
        audioUrl: '/api/audio/GRAMATICA/NHKWORLD/audio%20lesson/audio_lesson_01.mp3',
        explicacionContexto: 'これ (kore) indica cercanía al hablante ("esto"), 本 (hon) es libro y です (desu) es la afirmación cortés.',
        opciones: ['Aquello es un lápiz', 'Eso es una revista', 'Esto es un libro', '¿Es esto un libro?'],
        indiceCorrecto: 2,
      },
    ],
  },
};

/**
 * Obtiene el contenido pedagógico completo de una lección por su ID
 */
export function getLessonContentById(lessonId: string): ActiveLessonContent {
  if (MASTER_LESSONS[lessonId]) {
    return MASTER_LESSONS[lessonId];
  }

  // Fallback seguro a la lección inicial si no se encuentra
  return MASTER_LESSONS.n5_02;
}
