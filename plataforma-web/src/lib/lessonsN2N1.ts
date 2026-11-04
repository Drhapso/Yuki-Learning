import { ActiveLessonContent } from '../types';

export const N2_N1_LESSONS: Record<string, ActiveLessonContent> = {
  // ==========================================================================
  // N2 - LECCIÓN 01: INMEDIATEZ Y REACCIÓN
  // ==========================================================================
  n2_01: {
    id: 'n2_01',
    titulo: 'Inmediatez y Reacción Inesperada: 〜とたんに、〜やいなや',
    nivel_jlpt: 'N2',
    teoria: {
      titulo: 'Acciones Instantáneas y Sucesos Repentinos',
      subtitulo: 'JLPT N2 · Gramática Avanzada de Tiempo e Inmediatez',
      conceptoClave:
        'En N2 se analizan estructuras que expresan que tan pronto como ocurrió la primera acción, surgió de inmediato una segunda situación no planificada.',
      reglaOFormula:
        '〜とたんに: Verbo en pasado Ta + とたんに ("En el preciso instante en que...")\n〜やいなや: Verbo en forma diccionario + やいなや ("Apenas terminó de...")',
      puntosClave: [
        'Con とたんに la segunda cláusula suele ser algo sorpresivo fuera del control del sujeto: 立ち上がったとたんに、めまいがした ("En cuanto me puse de pie, me mareé").',
      ],
      ejemplos: [
        {
          japones: '窓を開けたとたんに、強い風が吹き込んできた。',
          lectura: 'まどをあけたとたんに、つよいかぜがふきこんできた。',
          romaji: 'Mado wo aketa totan ni, tsuyoi kaze ga fukikonde kita.',
          espanol: 'En el instante mismo de abrir la ventana, una fuerte ráfaga de viento entró de golpe.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n2_1_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma correcta para decir "En el instante en que me acosté en la cama, me quedé dormido"?:',
        caracterPrincipal: 'ベッドに入っ [ ? ]、すぐ眠ってしまった。',
        lecturaHiragana: 'べっどにはいっ [ ? ]、すぐねむってしまった。',
        romaji: 'Beddo ni hai [ ? ], sugu nemutte shimatta.',
        lecturaCompleta: 'たとたんに (ta totan ni)',
        romajiCompleto: 'ta totan ni',
        explicacionContexto: 'ベッドに入る en pasado Ta es 入った + とたんに = 入ったとたんに。',
        opciones: ['たとたんに', 'るにつれて', 'たばかりに', 'てからでないと'],
        indiceCorrecto: 0,
      },
    ],
  },

  // ==========================================================================
  // N2 - LECCIÓN 02: CAUSA Y OCASIÓN
  // ==========================================================================
  n2_02: {
    id: 'n2_02',
    titulo: 'Puntos de Inflexión: 〜を契機に、〜をきっかけに',
    nivel_jlpt: 'N2',
    teoria: {
      titulo: 'El Detonante de Grandes Cambios Personales y Sociales',
      subtitulo: 'JLPT N2 · Causalidad y Motivación Histórica',
      conceptoClave:
        'Expresan el suceso o momento clave que sirvió de catalizador para iniciar una nueva etapa o transformar el rumbo de una vida o institución.',
      reglaOFormula: 'Sustantivo + を契機に (formal/histórico) / をきっかけに (personal/cotidiano)',
      puntosClave: [
        '病気をきっかけに、タバコをやめることにした ("A raíz de mi enfermedad, decidí dejar el tabaco").',
      ],
      ejemplos: [
        {
          japones: 'オリンピック開催を契機に、街の再開発が急速に進んだ。',
          lectura: 'おりんぴっくかいさいをけいきに、まちのさいかいはつがきゅうそくにすすんだ。',
          romaji: 'Orinpikku kaisai wo keiki ni, machi no saikaihatsu ga kyuusoku ni susunda.',
          espanol: 'Teniendo como catalizador los Juegos Olímpicos, la remodelación urbana avanzó con rapidez.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n2_2_q1',
        tipo: 'opcion_multiple',
        pregunta: 'Completa: "Con motivo de su matrimonio, decidieron mudarse a las afueras":',
        caracterPrincipal: '結婚 [ ? ]、郊外へ引っ越すことにしました。',
        lecturaHiragana: 'けっこん [ ? ]、こうがいへひっこすことにしました。',
        romaji: 'Kekkon [ ? ], kougai e hikkosu koto ni shimashita.',
        lecturaCompleta: 'をきっかけに (wo kikkake ni)',
        romajiCompleto: 'wo kikkake ni',
        explicacionContexto: '結婚 (matrimonio) actúa como el detonante o motivo del cambio de vivienda.',
        opciones: ['を契機に / をきっかけに', 'をはじめとして', 'にわたって', 'のもとで'],
        indiceCorrecto: 0,
      },
    ],
  },

  // ==========================================================================
  // N1 - LECCIÓN 01: MODISMOS CLÁSICOS Y LITERARIOS
  // ==========================================================================
  n1_01: {
    id: 'n1_01',
    titulo: 'Gramática Literaria y Estilo Formal: 〜が早いか、〜なり',
    nivel_jlpt: 'N1',
    teoria: {
      titulo: 'Estructuras de Alto Nivel de la Prosa Japonesa',
      subtitulo: 'JLPT N1 · Expresiones Escritas y Prensa de Calidad',
      conceptoClave:
        'En N1, las estructuras gramaticales proceden frecuentemente del japonés clásico y la narrativa formal.',
      reglaOFormula:
        '〜が早いか: Verbo en forma diccionario + が早いか ("Casi al unísono con...")\n〜なり: Verbo en forma diccionario + なり ("Nada más hacer eso, inmediatamente...")',
      puntosClave: [
        'チャイムが鳴るが早いか、生徒たちは教室を飛び出した ("Apenas sonó el timbre, los alumnos salieron disparados del aula").',
      ],
      ejemplos: [
        {
          japones: '彼は私を見るなり、何か言いたげな顔をした。',
          lectura: 'かれはわたしをみるなり、なにかいいたげなかおをした。',
          romaji: 'Kare wa watashi wo miru nari, nanika iitage na kao wo shita.',
          espanol: 'Nada más verme, puso una cara como si quisiera decirme algo.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n1_1_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la construcción formal para indicar que alguien tomó una acción casi al unísono?',
        caracterPrincipal: 'ベルが鳴る [ ? ]、受話器を取り上げた。',
        lecturaHiragana: 'べるがなる [ ? ]、じゅわきをとりあげた。',
        romaji: 'Beru ga naru [ ? ], juwaki wo toriageta.',
        lecturaCompleta: 'が早いか (ga hayai ka)',
        romajiCompleto: 'ga hayai ka',
        explicacionContexto: 'Forma diccionario + が早いか expresa inmediatez casi instantánea entre dos eventos.',
        opciones: ['が早いか', 'にほかならない', 'を皮切りに', 'に忍びない'],
        indiceCorrecto: 0,
      },
    ],
  },

  // ==========================================================================
  // N1 - LECCIÓN 02: YOJIJUKUGO (MODISMOS DE 4 CARACTERES)
  // ==========================================================================
  n1_02: {
    id: 'n1_02',
    titulo: 'Compendio de Yojijukugo (四字熟語: Sabiduría de 4 Caracteres)',
    nivel_jlpt: 'N1',
    teoria: {
      titulo: 'La Máxima Síntesis del Pensamiento y Filosofía Nipona',
      subtitulo: 'JLPT N1 · Expresiones Idiomáticas y Cultura Profunda',
      conceptoClave:
        'Los Yojijukugo son locuciones idiomáticas de cuatro kanjis de origen chino o tradicional japonés. Sintetizan proverbios, reflexiones éticas y visiones del mundo.',
      reglaOFormula:
        '一期一会 (いちごいちえ): Un encuentro único en la vida\n以心伝心 (いしんでんしん): Comunicación tácita de corazón a corazón\n十人十色 (じゅうにんといろ): Diez personas, diez colores (Para gustos hay colores)',
      puntosClave: [
        'Aparecen con frecuencia en los textos de opinión y lectura de ensayos del examen oficial N1.',
      ],
      ejemplos: [
        {
          japones: 'お客様との一期一会を大切にする心構えが必要です。',
          lectura: 'おきゃくさまとのいちごいちえをたいせつにするこころがまえがひつようです。',
          romaji: 'Okyakusama to no ichigo ichie wo taisetsu ni suru kokorogamae ga hitsuyou desu.',
          espanol: 'Es imprescindible tener la actitud de valorar cada encuentro con el cliente como algo único e irrepetible.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n1_2_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es el Yojijukugo que expresa entenderse mutuamente sin necesidad de palabras habladas?',
        caracterPrincipal: '言葉がなくても心を通わせる： [ ? ]',
        lecturaHiragana: 'ことばがなくてもこころをかよわせる',
        romaji: 'Kotoba ga nakute mo kokoro wo kayowaseru',
        lecturaCompleta: '以心伝心 (いしんでんしん - Ishin denshin)',
        romajiCompleto: 'Ishin denshin',
        explicacionContexto: '以心伝心 (Ishin denshin) significa transmitir de corazón a corazón, entendimiento tácito mutuo.',
        opciones: ['一期一会', '以心伝心', '十人十色', '起死回生'],
        indiceCorrecto: 1,
      },
    ],
  },
};

