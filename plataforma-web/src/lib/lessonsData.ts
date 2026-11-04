import { ActiveLessonContent } from '../types';
import { N4_LESSONS } from './lessonsN4';
import { N3_LESSONS } from './lessonsN3';
import { N2_N1_LESSONS } from './lessonsN2N1';

export const MASTER_LESSONS: Record<string, ActiveLessonContent> = {
  ...N4_LESSONS,
  ...N3_LESSONS,
  ...N2_N1_LESSONS,
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

  // ==========================================================================
  // LECCIÓN INTRO 02: HIRAGANA DAKUTEN Y HANDAKUTEN
  // ==========================================================================
  intro_02: {
    id: 'intro_02',
    titulo: 'Silabario Hiragana: Diacríticos Dakuten (゛) y Handakuten (゜)',
    nivel_jlpt: 'INTRO',
    teoria: {
      titulo: 'Fundamento 2: Modificadores Fonéticos Dakuten y Handakuten',
      subtitulo: 'Módulo 0 · Fonética Avanzada y Diacríticos',
      conceptoClave:
        'Al agregar dos comillas pequeñas (゛ dakuten) o un círculo pequeño (゜ handakuten) en la esquina superior derecha de ciertos caracteres de Hiragana, se transforma la consonante sorda en una consonante sonora.',
      reglaOFormula: 'K → G  |  S → Z  |  T → D  |  H → B (con ゛)  |  H → P (con ゜)',
      puntosClave: [
        'Fila K con Dakuten: が (ga), ぎ (gi), ぐ (gu), げ (ge), ご (go).',
        'Fila S con Dakuten: ざ (za), じ (ji - excepción sonora), ず (zu), ぜ (ze), ぞ (zo).',
        'Fila T con Dakuten: だ (da), ぢ (ji), づ (zu), で (de), ど (do). Nota: ぢ y づ suenan prácticamente igual a じ y ず.',
        'Fila H con Dakuten: ば (ba), び (bi), ぶ (bu), べ (be), ぼ (bo).',
        'Fila H con Handakuten (゜): ぱ (pa), ぴ (pi), ぷ (pu), ぺ (pe), ぽ (po).',
      ],
      ejemplos: [
        {
          japones: 'ごはん',
          lectura: 'ごはん',
          romaji: 'gohan',
          espanol: 'Arroz cocido / Comida diaria',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-02]_kiku1.mp3',
        },
        {
          japones: 'みず',
          lectura: 'みず',
          romaji: 'mizu',
          espanol: 'Agua pura',
        },
        {
          japones: 'てんぷら',
          lectura: 'てんぷら',
          romaji: 'tenpura',
          espanol: 'Tempura (fritura crujiente japonesa)',
        },
      ],
    },
    preguntas: [
      {
        id: 'in2_q1',
        tipo: 'kanji_lectura',
        pregunta: '¿Cuál es la lectura correcta del caracter が?',
        caracterPrincipal: 'が',
        lecturaHiragana: 'Caracter con Dakuten (fila K modificada)',
        romaji: 'K + dakuten',
        lecturaCompleta: 'が (ga)',
        romajiCompleto: 'ga',
        explicacionContexto: 'か (ka) con dakuten se convierte en la sílaba sonora が (ga).',
        opciones: ['ka', 'ga', 'ba', 'za'],
        indiceCorrecto: 1,
      },
      {
        id: 'in2_q2',
        tipo: 'opcion_multiple',
        pregunta: '¿Qué caracter representa la sílaba "pa" con Handakuten?',
        caracterPrincipal: '[ ? ]',
        lecturaHiragana: 'Fila H modificada con círculo (゜)',
        romaji: 'Fila P',
        lecturaCompleta: 'ぱ = pa',
        romajiCompleto: 'pa',
        explicacionContexto: 'は (ha) con el círculo handakuten (゜) pasa a pronunciarse "pa" (ぱ). Con dos comillas sería "ba" (ば).',
        opciones: ['ば (ba)', 'ぱ (pa)', 'だ (da)', 'が (ga)'],
        indiceCorrecto: 1,
      },
      {
        id: 'in2_q3',
        tipo: 'opcion_multiple',
        pregunta: '¿Cómo se escribe la palabra "Agua" (mizu) en Hiragana?',
        caracterPrincipal: '[ ? ]',
        lecturaHiragana: 'Mi + Zu',
        romaji: 'mizu',
        lecturaCompleta: 'みず (mizu)',
        romajiCompleto: 'mizu',
        audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-02]_kiku1.mp3',
        explicacionContexto: 'み (mi) seguido de す con dakuten que forma ず (zu) = みず (mizu).',
        opciones: ['みす (misu)', 'みつ (mitsu)', 'みず (mizu)', 'にず (nizu)'],
        indiceCorrecto: 2,
      },
      {
        id: 'in2_q4',
        tipo: 'kanji_lectura',
        pregunta: '¿Qué sonido resulta de aplicar dakuten al caracter し (shi)?',
        caracterPrincipal: 'じ',
        lecturaHiragana: 'Sonido sonoro de la fila S',
        romaji: 'Shi + dakuten',
        lecturaCompleta: 'じ (ji)',
        romajiCompleto: 'ji',
        explicacionContexto: 'し (shi) modificado por dakuten produce la consonante suave じ (ji).',
        opciones: ['zi', 'di', 'ji', 'gi'],
        indiceCorrecto: 2,
      },
    ],
  },

  // ==========================================================================
  // LECCIÓN INTRO 03: KATAKANA ESENCIAL
  // ==========================================================================
  intro_03: {
    id: 'intro_03',
    titulo: 'Katakana Esencial: Palabras Extranjeras y Préstamos Lingüísticos',
    nivel_jlpt: 'INTRO',
    teoria: {
      titulo: 'Fundamento 3: El Silabario de los Extranjerismos (Gairaigo)',
      subtitulo: 'Módulo 0 · Dominio del Silabario Angular Katakana',
      conceptoClave:
        'El Katakana (カタカナ) comparte exactamente la misma fonética que el Hiragana, pero sus trazos son rectos, angulares y cortantes. Se utiliza para escribir palabras prestadas de otros idiomas (principalmente inglés, portugués y alemán), nombres extranjeros, nombres científicos y onomatopeyas.',
      reglaOFormula: 'Hiragana = Palabras nativas/gramática  |  Katakana = Préstamos extranjeros (Gairaigo)',
      puntosClave: [
        'El guión horizontal (ー) se llama Chōonpu y alarga la vocal precedente un tiempo entero (ej. コーヒー kōhī = café).',
        'Palabras muy comunes provienen del inglés: テレビ (terebi - televisión), カメラ (kamera - cámara), ホテル (hoteru - hotel).',
        'Palabras históricas de Portugal y Alemania: パン (pan - pan, del portugués "pão"), アルバイト (arubaito - trabajo a tiempo parcial, del alemán "Arbeit").',
        'Existen combinaciones con caracteres pequeños para aproximar sonidos extranjeros: ティ (ti), ファ (fa), ウィ (wi).',
      ],
      ejemplos: [
        {
          japones: 'コーヒー',
          lectura: 'コーヒー',
          romaji: 'kōhī',
          espanol: 'Café (bebida caliente o fría)',
        },
        {
          japones: 'パン',
          lectura: 'パン',
          romaji: 'pan',
          espanol: 'Pan (alimento básico)',
        },
        {
          japones: 'ホテル',
          lectura: 'ホテル',
          romaji: 'hoteru',
          espanol: 'Hotel (alojamiento turístico)',
        },
      ],
    },
    preguntas: [
      {
        id: 'in3_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Para cuál de estos propósitos se utiliza PRINCIPALMENTE el Katakana?',
        caracterPrincipal: 'カタカナの役割',
        lecturaHiragana: 'Función en el sistema de escritura',
        romaji: 'Katakana no yakuwari',
        lecturaCompleta: '外来語 (Palabras y préstamos de origen extranjero)',
        romajiCompleto: 'Gairaigo',
        explicacionContexto: 'El Katakana se reserva para términos prestados de otros idiomas (Gairaigo), nombres extranjeros, marcas comerciales y onomatopeyas.',
        opciones: ['Terminaciones de verbos japoneses', 'Palabras de origen extranjero y nombres propios', 'Partículas gramaticales como は y を', 'Poesía clásica japonesa'],
        indiceCorrecto: 1,
      },
      {
        id: 'in3_q2',
        tipo: 'kanji_lectura',
        pregunta: '¿Qué indica el guión horizontal (ー) en una palabra en Katakana como コーヒー?',
        caracterPrincipal: 'ー',
        lecturaHiragana: 'Símbolo Chōonpu (長音符)',
        romaji: 'Chōonpu',
        lecturaCompleta: 'Alargamiento de la vocal previa (2 tiempos)',
        romajiCompleto: 'Vocal larga',
        explicacionContexto: 'El símbolo ー indica que la vocal inmediatamente anterior debe sostenerse durante el doble de duración.',
        opciones: ['Una pausa silenciosa breve', 'Un alargamiento de la vocal', 'Una consonante doble', 'Un acento tonal descendente'],
        indiceCorrecto: 1,
      },
      {
        id: 'in3_q3',
        tipo: 'opcion_multiple',
        pregunta: '¿Qué palabra en Katakana significa "Café"?',
        caracterPrincipal: '[ ? ]',
        lecturaHiragana: 'Bebida con vocal larga',
        romaji: 'kōhī',
        lecturaCompleta: 'コーヒー (kōhī)',
        romajiCompleto: 'kōhī',
        explicacionContexto: 'コーヒー (ko-o-hi-i) es la palabra estándar adoptada del inglés "coffee".',
        opciones: ['コーラ (kōra)', 'コーヒー (kōhī)', 'ココア (kokoa)', 'ジュース (jūsu)'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // LECCIÓN N5 03: VERBOS EN FORMA -MASU (ます)
  // ==========================================================================
  n5_03: {
    id: 'n5_03',
    titulo: 'Verbos en Forma -Masu (ます): Presente y Pasado Cortés',
    nivel_jlpt: 'N5',
    teoria: {
      titulo: 'Gramática N5: Conjugación de Cortesía Estándar (丁寧語 - Teineigo)',
      subtitulo: 'Módulo 1 · La Forma -Masu para Acciones Cotidianas',
      conceptoClave:
        'La forma 〜ます (masu) es el estándar formal y respetuoso en japonés para entablar conversaciones en la vida diaria, el trabajo y las tiendas. Se conjuga en 4 tiempos fundamentales según sea afirmativo o negativo, presente o pasado.',
      reglaOFormula:
        'Presente Afirmativo: 〜ます  |  Presente Negativo: 〜ません\nPasado Afirmativo: 〜ました  |  Pasado Negativo: 〜ませんでした',
      puntosClave: [
        'Verbos Grupo 2 (Ichidan): Terminan en -iru o -eru (ej. 食べる taberu, 見る miru). Solo retira "ru" y pon "masu": 食べます, 見ます.',
        'Verbos Grupo 1 (Godan): Terminan en vocal "u" (ej. 行く iku, 飲む nomu). Cambia la última sílaba a la fila "i": 行きます (ikimasu), 飲みます (nomimasu).',
        'Verbos Irregulares (Grupo 3): Solo son dos: する (hacer) → します (shimasu) y くる (venir) → きます (kimasu).',
        'En japonés no existe tiempo futuro morfológico; el presente afirmativo (〜ます) se usa tanto para hábitos presentes como para acciones futuras con intención.',
      ],
      ejemplos: [
        {
          japones: '明日、東京へ行きます。',
          lectura: 'あした、とうきょうへいきます。',
          romaji: 'Ashita, Toukyou e ikimasu.',
          espanol: 'Mañana iré a Tokio (Futuro/Intención).',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-02]_kiku1.mp3',
        },
        {
          japones: '朝ごはんを食べませんでした。',
          lectura: 'あさごはんをたべませんでした。',
          romaji: 'Asagohan wo tabemasen deshita.',
          espanol: 'No desayuné (Pasado negativo).',
        },
        {
          japones: '毎日、日本語を勉強します。',
          lectura: 'まいにち、にほんごをべんきょうします。',
          romaji: 'Mainichi, nihongo wo benkyou shimasu.',
          espanol: 'Estudio japonés todos los días (Hábito presente).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n5_3_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma correcta en PASADO AFIRMATIVO del verbo 行く (ir) en registro cortés?',
        caracterPrincipal: '昨日、京都へ [ ? ]。',
        lecturaHiragana: 'きのう、きょうとへ [ ? ]。',
        romaji: 'Kinou, Kyouto e [ ? ].',
        lecturaCompleta: '昨日、京都へ行きました。(Kinou, Kyouto e ikimashita)',
        romajiCompleto: 'Kinou, Kyouto e ikimashita.',
        explicacionContexto: '行きます (presente) cambia a 行きました (ikimashita) para expresar pasado formal ("fui").',
        opciones: ['行きます (ikimasu)', '行きました (ikimashita)', '行きません (ikimasen)', '行かない (ikanai)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n5_3_q2',
        tipo: 'opcion_multiple',
        pregunta: '¿Cómo se dice en japonés formal: "No como carne"? (Presente negativo)',
        caracterPrincipal: '肉を [ ? ]。',
        lecturaHiragana: 'にくを [ ? ]。',
        romaji: 'Niku wo [ ? ].',
        lecturaCompleta: '肉を食べません。(Niku wo tabemasen)',
        romajiCompleto: 'Niku wo tabemasen.',
        explicacionContexto: '食べる en negativo cortés es 食べません (tabemasen).',
        opciones: ['食べます (tabemasu)', '食べました (tabemashita)', '食べません (tabemasen)', '食べませんでした (tabemasendeshita)'],
        indiceCorrecto: 2,
      },
      {
        id: 'n5_3_q3',
        tipo: 'kanji_lectura',
        pregunta: '¿Cuál es la conjugación formal del verbo irregular する (hacer)?',
        caracterPrincipal: 'する',
        lecturaHiragana: 'Verbo irregular Grupo 3',
        romaji: 'suru',
        lecturaCompleta: 'します (shimasu)',
        romajiCompleto: 'shimasu',
        explicacionContexto: 'する es uno de los dos verbos irregulares y su forma -masu es します (shimasu).',
        opciones: ['すります (surimasu)', 'します (shimasu)', 'さします (sashimasu)', 'せます (semasu)'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // LECCIÓN N5 04: PRIMEROS KANJIS ELEMENTALES
  // ==========================================================================
  n5_04: {
    id: 'n5_04',
    titulo: 'Primeros Kanjis Elementales: Números y Naturaleza',
    nivel_jlpt: 'N5',
    teoria: {
      titulo: 'Kanji N5: Lectura China (Onyomi) vs Lectura Japonesa (Kunyomi)',
      subtitulo: 'Módulo 1 · La Base Pictográfica de los Ideogramas',
      conceptoClave:
        'Los ideogramas kanji llegaron a Japón desde China. La lectura Onyomi (音読み) es la pronunciación aproximada al chino clásico y se usa casi siempre cuando dos o más kanjis se juntan para formar una palabra compuesta (Jukugo). La lectura Kunyomi (訓読み) es el significado nativo original japonés y se usa cuando el kanji está solo o acompañado de sufijos hiragana (Okurigana).',
      reglaOFormula: 'Kanji Solo (+ Hiragana) → Kunyomi  |  Kanji Compuesto (Kanji + Kanji) → Onyomi',
      puntosClave: [
        'Números: 一 (ichi, 1), 二 (ni, 2), 三 (san, 3), 四 (yon/shi, 4), 五 (go, 5), 六 (roku, 6), 七 (nana/shichi, 7), 八 (hachi, 8), 九 (kyuu, 9), 十 (juu, 10).',
        'Naturaleza: 日 (hi / nichi = sol/día), 月 (tsuki / getsu = luna/mes), 木 (ki / moku = árbol), 山 (yama / san = montaña), 川 (kawa = río).',
        'El país de Japón: 日本 combina 日 (sol) y 本 (origen) = Nihon / Nippon ("El origen del sol" o País del Sol Naciente).',
        'Fuji-san: 富士山 (Montaña Fuji) usa la lectura Onyomi "san" para 山.',
      ],
      ejemplos: [
        {
          japones: '日本',
          lectura: 'にほん',
          romaji: 'Nihon',
          espanol: 'Japón (literalmente "Origen del Sol")',
        },
        {
          japones: '山と川',
          lectura: 'やま と かわ',
          romaji: 'yama to kawa',
          espanol: 'Montaña y río (lectura Kunyomi pura)',
        },
        {
          japones: '三月',
          lectura: 'さんがつ',
          romaji: 'sangatsu',
          espanol: 'Marzo (literalmente "Tercer Mes")',
        },
      ],
    },
    preguntas: [
      {
        id: 'n5_4_q1',
        tipo: 'kanji_lectura',
        pregunta: '¿Cuál es el significado del kanji 山 cuando aparece solo?',
        caracterPrincipal: '山',
        lecturaHiragana: 'Lectura Kunyomi: やま (yama)',
        romaji: 'yama',
        lecturaCompleta: '山 (yama) = Montaña',
        romajiCompleto: 'Montaña',
        explicacionContexto: 'El kanji 山 representa pictográficamente los tres picos de una montaña.',
        opciones: ['Río', 'Montaña', 'Árbol', 'Sol'],
        indiceCorrecto: 1,
      },
      {
        id: 'n5_4_q2',
        tipo: 'kanji_lectura',
        pregunta: '¿Cómo se lee y qué significa la combinación 日本?',
        caracterPrincipal: '日本',
        lecturaHiragana: 'Compuesto Jukugo: にほん',
        romaji: 'Nihon',
        lecturaCompleta: '日本 (Nihon) = Japón',
        romajiCompleto: 'Nihon (Japón)',
        explicacionContexto: 'Combina 日 (sol) y 本 (base / origen), significando la tierra del sol naciente: Japón.',
        opciones: ['Tokyo (capital)', 'Nihon (Japón)', 'Nikko (luz solar)', 'Honya (librería)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n5_4_q3',
        tipo: 'opcion_multiple',
        pregunta: '¿Qué kanji representa el elemento "Árbol" o "Madera"?',
        caracterPrincipal: '[ ? ]',
        lecturaHiragana: 'Pictograma con ramas y tronco (ki)',
        romaji: 'ki / moku',
        lecturaCompleta: '木 = Árbol / Madera',
        romajiCompleto: 'ki',
        explicacionContexto: '木 simboliza un árbol con tronco, ramas y raíces. En Kunyomi es "ki" y en Onyomi es "MOKU" (como en Mokuyoubi, jueves).',
        opciones: ['本', '木', '休', '林'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // LECCIÓN N5 05: LA FORMA -TE (て)
  // ==========================================================================
  n5_05: {
    id: 'n5_05',
    titulo: 'La Forma -Te (て): Peticiones y Conexión de Acciones',
    nivel_jlpt: 'N5',
    teoria: {
      titulo: 'La Piedra Angular de N5: La Forma -Te (て形)',
      subtitulo: 'Módulo 1 · Conexiones, Peticiones y Tiempos Continuos',
      conceptoClave:
        'La forma 〜て es la estructura más versátil y crucial del japonés N5. No expresa tiempo por sí misma, sino que actúa como enlace conjuntivo: permite solicitar favores cordiales (~てください), expresar acciones en progreso (~ています) y encadenar múltiples acciones secuenciales ("hago esto y luego hago aquello").',
      reglaOFormula:
        'Petición cortés: Verbo en forma -Te + ください (kudasai)\nAcción continua: Verbo en forma -Te + います (imasu)',
      puntosClave: [
        'Grupo 2 (Ichidan): Regla simple: cambia る por て. 食べる → 食べて (tabete), 見る → 見て (mite).',
        'Grupo 1 (Godan - Terminaciones en う, つ, る): Cambian a って (tsu pequeño + te). 待つ → 待って (matte - esperar), 買う → 買って (katte - comprar).',
        'Grupo 1 (Terminaciones en む, ぶ, ぬ): Cambian a んで. 飲む → 飲んで (nonde - beber), 読む → 読んで (yonde - leer).',
        'Grupo 1 (Terminaciones en く): Cambia a いて. 書く → 書いて (kaite - escribir). Excepción crucial: 行く → 行って (itte).',
        'Grupo 3 (Irregulares): する → して (shite), くる → きて (kite).',
      ],
      ejemplos: [
        {
          japones: 'ちょっと待ってください。',
          lectura: 'ちょっとまってください。',
          romaji: 'Chotto matte kudasai.',
          espanol: 'Espere un momento, por favor (Petición habitual).',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A1/Tema%201/Audio/X_[01-02]_kiku1.mp3',
        },
        {
          japones: '今、日本語を勉強しています。',
          lectura: 'いま、にほんごをべんきょうしています。',
          romaji: 'Ima, nihongo wo benkyou shite imasu.',
          espanol: 'Ahora estoy estudiando japonés (Acción en progreso).',
        },
        {
          japones: '朝起きて、シャワーを浴びました。',
          lectura: 'あさおきて、しゃわーをあびました。',
          romaji: 'Asa okite, shawaa wo abimashita.',
          espanol: 'Me levanté por la mañana y me di una ducha (Secuencia temporal).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n5_5_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma -Te del verbo 待つ (esperar)?',
        caracterPrincipal: '待つ (Grupo 1 - Godan)',
        lecturaHiragana: 'Verbo terminado en つ',
        romaji: 'matsu',
        lecturaCompleta: '待って (matte)',
        romajiCompleto: 'matte',
        explicacionContexto: 'Los verbos Godan que terminan en う, つ, る sustituyen su final por って: 待つ → 待って (matte). Por eso se dice "Chotto matte kudasai".',
        opciones: ['まちて (machite)', '待って (matte)', '待て (mate)', '待んで (mande)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n5_5_q2',
        tipo: 'opcion_multiple',
        pregunta: 'Completa la petición cortés: "Por favor, coma"',
        caracterPrincipal: 'どうぞ、[ ? ] ください。',
        lecturaHiragana: 'どうぞ、[ ? ] ください。',
        romaji: 'Douzo, [ ? ] kudasai.',
        lecturaCompleta: 'どうぞ、食べてください。(Douzo, tabete kudasai)',
        romajiCompleto: 'Douzo, tabete kudasai.',
        explicacionContexto: '食べる es Grupo 2 (Ichidan), cambia る por て: 食べて + ください = "Por favor, coma".',
        opciones: ['食べます (tabemasu)', '食べて (tabete)', '食べた (tabeta)', '食べない (tabenai)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n5_5_q3',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma -Te correcta del verbo irregular する (hacer)?',
        caracterPrincipal: 'する (Grupo 3)',
        lecturaHiragana: 'Verbo irregular fundamental',
        romaji: 'suru',
        lecturaCompleta: 'して (shite)',
        romajiCompleto: 'shite',
        explicacionContexto: 'El verbo irregular する tiene como forma conjuntiva して (shite).',
        opciones: ['すって (sutte)', 'して (shite)', 'せんで (sende)', 'した (shita)'],
        indiceCorrecto: 1,
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
