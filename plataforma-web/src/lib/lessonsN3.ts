import { ActiveLessonContent } from '../types';

export const N3_LESSONS: Record<string, ActiveLessonContent> = {
  // ==========================================================================
  // N3 - LECCIÓN 01: VOZ PASIVA (受身 - UKEMI)
  // ==========================================================================
  n3_01: {
    id: 'n3_01',
    titulo: 'Voz Pasiva en Japonés (受身: 〜れる / 〜られる)',
    nivel_jlpt: 'N3',
    teoria: {
      titulo: 'El Sujeto Receptivo y la Pasiva de Molestia (迷惑の受身)',
      subtitulo: 'JLPT N3 · Marugoto B1 · Perspectiva y Afección',
      conceptoClave:
        'A diferencia del español donde la pasiva es meramente estilística ("la carta fue escrita por mí"), en japonés la voz pasiva (Ukemi) tiene una fuerte carga afectiva: se usa con frecuencia para expresar que el sujeto experimentó un disgusto, inconveniente o molestia debido a la acción de un tercero.',
      reglaOFormula:
        'Grupo 1 (Godan): Cambia vocal final "u" por fila "a" + れる (踏む → 踏まれる, 叱る → 叱られる)\nGrupo 2 (Ichidan): Quita る + られる (ほめる → ほめられる)\nGrupo 3: する → される (sareru), 来る → こられる (korareru)',
      puntosClave: [
        'Pasiva Directa: El objeto pasa a sujeto: 先生に褒められました ("Fui elogiado por el profesor").',
        'Pasiva de Afección o Molestia: 満員電車で足を踏まれました ("Me pisaron el pie en el tren lleno"). El sujeto sufre la molestia.',
        'La persona causante de la acción pasiva siempre se marca con に (ni).',
      ],
      ejemplos: [
        {
          japones: '雨に降られて、服がびしょ濡れになってしまった。',
          lectura: 'あめにふられて、ふくがびしょぬれになってしまった。',
          romaji: 'Ame ni furarete, fuku ga bishonure ni natte shimatta.',
          espanol: 'Fui sorprendido por la lluvia y mi ropa terminó totalmente empapada.',
        },
        {
          japones: 'テストで満点を取って、先生に褒められました。',
          lectura: 'てすとでまんてんをとって、せんせいにほめられました。',
          romaji: 'Tesuto de manten wo totte, sensei ni homeraremashita.',
          espanol: 'Saqué puntaje perfecto en el examen y fui elogiado por el profesor.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n3_1_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma pasiva del verbo 叱る (shikaru - regañar)?',
        caracterPrincipal: '叱る (shikaru) → [ ? ]',
        lecturaHiragana: 'しかる → [ ? ]',
        romaji: 'shikaru → [ ? ]',
        lecturaCompleta: '叱られる (shikarareru)',
        romajiCompleto: 'shikarareru',
        explicacionContexto: '叱る es Grupo 1 Godan: る cambia a ら + れる = 叱られる (ser regañado).',
        opciones: ['叱れる (shikareru)', '叱られる (shikarareru)', '叱させる (shikaraseru)', '叱される (shikasareru)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n3_1_q2',
        tipo: 'opcion_multiple',
        pregunta: 'Completa la queja por molestia: "Mi hermano menor se comió mi pastel"',
        caracterPrincipal: '弟に大事なケーキを [ ? ] しまいました。',
        lecturaHiragana: 'おとうとにだいじなけーきを [ ? ] しまいました。',
        romaji: 'Otouto ni daiji na keeki wo [ ? ] shimaimashita.',
        lecturaCompleta: '食べられて (taberarete)',
        romajiCompleto: 'taberarete',
        explicacionContexto: 'Pasiva de molestia: 食べる → 食べられる (pasiva) → en forma Te: 食べられてしまいました。',
        opciones: ['食べて', '食べられて', '食べさせて', '食べさせてくれて'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N3 - LECCIÓN 02: VOZ CAUSATIVA (使役 - SHIEKI)
  // ==========================================================================
  n3_02: {
    id: 'n3_02',
    titulo: 'Voz Causativa (使役: 〜せる / 〜させる)',
    nivel_jlpt: 'N3',
    teoria: {
      titulo: 'Hacer o Permitir Hacer: La Voz Causativa',
      subtitulo: 'JLPT N3 · Educación, Jerarquías y Permisos',
      conceptoClave:
        'La voz causativa (Shieki) se utiliza cuando un superior, padre o autoridad hace que otra persona realice una acción (obligar o inducir), o cuando le concede el permiso para realizarla. Combinada con 〜てください es la forma más elegante de pedir permiso personal: 〜させてください ("por favor, permítame hacer...").',
      reglaOFormula:
        'Grupo 1: Raíz vocal "a" + せる (書く → 書かせる, 飲む → 飲ませる)\nGrupo 2: Quitar る + させる (食べる → 食べさせる)\nGrupo 3: する → させる (saseru), 来る → こさせる (kosaseru)',
      puntosClave: [
        'Petición de permiso supremo: この仕事を私にやらせてください ("Por favor, permítame hacer este trabajo").',
        'Partículas con causativa: Si el verbo original es intransitivo, la persona inducida lleva を. Si el verbo original ya tiene objeto を, la persona inducida lleva に.',
      ],
      ejemplos: [
        {
          japones: '母は妹にピアノを習わせています。',
          lectura: 'はははいもうとにぴあのをならわせています。',
          romaji: 'Haha wa imouto ni piano wo narawasete imasu.',
          espanol: 'Mi madre hace que mi hermana tome clases de piano.',
        },
        {
          japones: '体調が悪いので、今日は早く帰らせてください。',
          lectura: 'たいちょうがわるいので、きょうははやくかえらせてください。',
          romaji: 'Taichou ga warui node, kyou wa hayaku kaerasete kudasai.',
          espanol: 'Como me siento mal de salud, por favor permítame marcharme temprano a casa hoy.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n3_2_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cómo pides educadamente a tu jefe que te permita explicar la situación?',
        caracterPrincipal: '私に理由を [ ? ] ください。',
        lecturaHiragana: 'わたしにりゆうを [ ? ] ください。',
        romaji: 'Watashi ni riyuu wo [ ? ] kudasai.',
        lecturaCompleta: '説明させて (setsumei sasete)',
        romajiCompleto: 'setsumei sasete',
        explicacionContexto: 'Explicar es 説明する (Grupo 3). Su forma causativa en -Te es 説明させて + ください = "Permítame explicar".',
        opciones: ['説明して', '説明されて', '説明させて', '説明させられて'],
        indiceCorrecto: 2,
      },
    ],
  },

  // ==========================================================================
  // N3 - LECCIÓN 03: VOZ CAUSATIVA-PASIVA (使役受身)
  // ==========================================================================
  n3_03: {
    id: 'n3_03',
    titulo: 'Voz Causativa-Pasiva (使役受身: 〜させられる)',
    nivel_jlpt: 'N3',
    teoria: {
      titulo: 'Obligado contra mi Voluntad: Causativa-Pasiva',
      subtitulo: 'JLPT N3 · Resignación y Presión Externa',
      conceptoClave:
        'La forma causativa-pasiva (Shieki-Ukemi) fusiona la causativa ("hacer que alguien haga") con la pasiva ("recibir la acción"). Expresa que el sujeto fue obligado a hacer algo en contra de su deseo inicial o por una fuerte presión de las circunstancias.',
      reglaOFormula:
        'Grupo 1: Contracción coloquial común 〜される (待つ → 待たされる, 飲む → 飲まされる)\nGrupo 2: Quitar る + させられる (食べる → 食べさせられる)\nGrupo 3: する → させられる (saserareru), 来る → こさせられる (kosaserareru)',
      puntosClave: [
        'Matiz de resignación: 病院で２時間も待たされました ("Me hicieron esperar nada menos que 2 horas en el hospital").',
      ],
      ejemplos: [
        {
          japones: '子供のころ、母に嫌いな野菜を食べさせられました。',
          lectura: 'こどものころ、ははにきらいなやさいをたべさせられました。',
          romaji: 'Kodomo no koro, haha ni kirai na yasai wo tabesaseraremashita.',
          espanol: 'De niño, mi madre me obligaba a comer verduras que no me gustaban.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n3_3_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma contraída causativa-pasiva habitual de 待つ (esperar)?',
        caracterPrincipal: '待つ (matsu) → [ ? ]',
        lecturaHiragana: 'まつ → [ ? ]',
        romaji: 'matsu → [ ? ]',
        lecturaCompleta: '待たされる (matasareru)',
        romajiCompleto: 'matasareru',
        explicacionContexto: 'En verbos Godan del Grupo 1, 〜せられる suele contraerse de forma natural en 〜される: 待つ → 待たされる (verse forzado a esperar).',
        opciones: ['待たれる', '待たせる', '待たされる', '待たせられる'],
        indiceCorrecto: 2,
      },
    ],
  },

  // ==========================================================================
  // N3 - LECCIÓN 04: CONJETURA, APARIENCIA Y RUMOR
  // ==========================================================================
  n3_04: {
    id: 'n3_04',
    titulo: 'Matices de Conjetura: 〜そうだ、〜らしい、〜みたいだ、〜ようだ',
    nivel_jlpt: 'N3',
    teoria: {
      titulo: 'Los 4 Filtros de la Percepción y la Hipótesis en Japonés',
      subtitulo: 'JLPT N3 · Rumores, Impresiones Sensoriales y Evidencias',
      conceptoClave:
        'El japonés exige especificar la fuente de lo que afirmas: ¿lo viste con tus propios ojos? ¿lo oíste como rumor? ¿lo deduces por el olor o el tacto? Estas 4 estructuras marcan la diferencia entre un principiante y un hablante natural.',
      reglaOFormula:
        '〜そうだ (Apariencia visual): Raíz Masu / Adjetivo sin "i" + そう (おいしそう = parece delicioso)\n〜そうだ (Rumor escuchado): Forma llana completa + そうだ (雨が降るそうだ = dicen que lloverá)\n〜らしい (Juicio circunstancial confiable): "Parece ser que...", o "típicamente representativo"\n〜みたいだ / 〜ようだ (Semejanza o deducción intuitiva): "Parece como si..."',
      puntosClave: [
        'Excepción crucial de そう: いい (bueno) → よさそう (parece bueno). ない (no hay) → なさそう.',
      ],
      ejemplos: [
        {
          japones: 'このケーキ、とても美味しそうですね。',
          lectura: 'このけーき、とてもおいしそうですね。',
          romaji: 'Kono keeki, totemo oishisou desu ne.',
          espanol: 'Este pastel parece delicioso (a juzgar por su aspecto exterior).',
        },
        {
          japones: '天気予報によると、明日は大雨になるそうです。',
          lectura: 'てんきよほうによると、あしたはおおあめになるそうです。',
          romaji: 'Tenki yohou ni yoru to, ashita wa ooame ni naru sou desu.',
          espanol: 'Según el pronóstico meteorológico, dicen que mañana habrá lluvias torrenciales (Rumor/informe).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n3_4_q1',
        tipo: 'opcion_multiple',
        pregunta: 'Ves nubes muy oscuras y el viento frío: "Parece que va a llover en cualquier momento"',
        caracterPrincipal: '今にも雨が [ ? ] です。',
        lecturaHiragana: 'いまにもあめが [ ? ] です。',
        romaji: 'Ima ni mo ame ga [ ? ] desu.',
        lecturaCompleta: '降りそう (furisou)',
        romajiCompleto: 'furisou',
        explicacionContexto: 'Inminencia o apariencia visual: Raíz Masu + そう: 降ります → 降りそう (parece que va a caer lluvia pronto).',
        opciones: ['降るそう', '降りそう', '降るらしい', '降ったみたい'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N3 - LECCIÓN 05: CAMBIO GRADUAL E INTENCIÓN
  // ==========================================================================
  n3_05: {
    id: 'n3_05',
    titulo: 'Esfuerzo y Transformación: 〜ようにする vs 〜ようになる',
    nivel_jlpt: 'N3',
    teoria: {
      titulo: 'Cultivar Nuevos Hábitos y Alcanzar Nuevas Capacidades',
      subtitulo: 'JLPT N3 · Cambio Continuo y Metas Personales',
      conceptoClave:
        '〜ようにする expresa el esfuerzo activo y deliberado del individuo ("procuro hacer...", "me esfuerzo en..."). En contraste, 〜ようになる expresa la transición gradual o el cambio natural de un estado previo a uno nuevo ("he llegado a ser capaz de...").',
      reglaOFormula:
        'Esfuerzo activo: Verbo en forma diccionario o Nai + ようにする\nCambio de estado o habilidad: Verbo en forma potencial + ようになる',
      puntosClave: [
        'Hábito preventivo: 油っこいものを食べないようにしています ("Procuro no comer cosas grasientas").',
      ],
      ejemplos: [
        {
          japones: '日本語の新聞が少しずつ読めるようになりました。',
          lectura: 'にほんごのしんぶんがすこしずつよめるようになりました。',
          romaji: 'Nihongo no shinbun ga sukoshizutsu yomeru you ni narimashita.',
          espanol: 'Poco a poco he llegado a ser capaz de leer el periódico en japonés.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n3_5_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma correcta para decir "Procuro hacer ejercicio todos los días por salud"?',
        caracterPrincipal: '健康のために、毎日運動 [ ? ]。',
        lecturaHiragana: 'けんこうのために、まいにちうんどう [ ? ]。',
        romaji: 'Kenkou no tame ni, mainichi undou [ ? ].',
        lecturaCompleta: 'するようにしています (suru you ni shite imasu)',
        romajiCompleto: 'suru you ni shite imasu',
        explicacionContexto: 'Esfuerzo voluntario para mantener un hábito: ようにしている。',
        opciones: ['するようになります', 'するようにしています', 'したらいいです', 'するはずです'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N3 - LECCIÓN 06: KEIGO BÁSICO (SONKEIGO Y KENJOUGO)
  // ==========================================================================
  n3_06: {
    id: 'n3_06',
    titulo: 'Keigo Práctico: Honorífico (尊敬語) y Humilde (謙譲語)',
    nivel_jlpt: 'N3',
    teoria: {
      titulo: 'El Lenguaje del Respeto y la Distancia Social',
      subtitulo: 'JLPT N3 · Mundo Laboral, Clientes y Trato con Superiores',
      conceptoClave:
        'El Keigo no es solo gramática: es la arquitectura social de Japón. Se divide en Sonkeigo (尊敬語: enaltece las acciones del cliente o superior) y Kenjougo (謙譲語: reduce las propias acciones del hablante para demostrar respeto y devoción).',
      reglaOFormula:
        'Ir / Venir / Estar: Sonkeigo: いらっしゃる (irassharu) | Kenjougo: 参る (mairu) / おる (oru)\nDecir: Sonkeigo: おっしゃる (ossharu) | Kenjougo: 申す (mousu)\nComer / Beber: Sonkeigo: 召し上がる (meshiaagaru) | Kenjougo: いただく (itadaku)\nVer: Sonkeigo: ご覧になる (goran ni naru) | Kenjougo: 拝見する (haiken suru)',
      puntosClave: [
        '¡NUNCA uses Sonkeigo sobre ti mismo! Si dices "watashi ga goran ni naru", estarás cometiendo una falta grave de humildad.',
      ],
      ejemplos: [
        {
          japones: '社長は何時頃にいらっしゃいますか。',
          lectura: 'しゃちょうはなんじごろにいらっしゃいますか。',
          romaji: 'Shachou wa nanji goro ni irasshaimasu ka.',
          espanol: '¿A qué hora llegará el presidente de la empresa? (Sonkeigo)',
        },
        {
          japones: '明日、そちらのオフィスへ伺います。',
          lectura: 'あした、そちらのおふぃすへうかがいます。',
          romaji: 'Ashita, sochira no ofisu e ukagaimasu.',
          espanol: 'Mañana visitaré su oficina (Kenjougo: Ukagaimasu).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n3_6_q1',
        tipo: 'opcion_multiple',
        pregunta: 'Estás en una entrevista de trabajo y te piden que leas un documento. Para decir respetuosamente "He leído el documento":',
        caracterPrincipal: '資料を [ ? ]。',
        lecturaHiragana: 'しりょうを [ ? ]。',
        romaji: 'Shiryou wo [ ? ].',
        lecturaCompleta: '拝見しました (Haiken shimashita)',
        romajiCompleto: 'Haiken shimashita',
        explicacionContexto: 'Para rebajar con humildad y respeto tu propia acción de mirar o leer documentos ante un superior o entrevistador se usa 拝見する (haiken suru).',
        opciones: ['ご覧になりました (Goran ni narimashita)', '拝見しました (Haiken shimashita)', 'お読みになりました (Oyomi ni narimashita)', '読ませました (Yomasemashita)'],
        indiceCorrecto: 1,
      },
    ],
  },
};

