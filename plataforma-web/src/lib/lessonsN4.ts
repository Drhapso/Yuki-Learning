import { ActiveLessonContent } from '../types';

export const N4_LESSONS: Record<string, ActiveLessonContent> = {
  // ==========================================================================
  // N4 - LECCIÓN 01: ESTILO INFORMAL Y FORMA DE DICCIONARIO (JISHO-KEI)
  // ==========================================================================
  n4_01: {
    id: 'n4_01',
    titulo: 'Estilo Informal / Diccionario de Verbos (辞書形)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Transición al Japonés Natural: La Forma de Diccionario',
      subtitulo: 'JLPT N4 · Conversación Llana con Amigos y Familia (Irodori A2-1)',
      conceptoClave:
        'Hasta N5 utilizabas principalmente el estilo formal con 〜ます (masu) y です (desu). Para N4 y la vida real en Japón, la forma de diccionario (Jisho-kei) es la base informal indispensable: es como aparecen los verbos en el diccionario y el bloque con el que se construyen estructuras gramaticales avanzadas.',
      reglaOFormula:
        'Grupo 1 (Godan): Terminan en vocal "u" (う, く, す, つ, ぬ, む, る, ぐ, ぶ)\nGrupo 2 (Ichidan): Terminan en "iru" o "eru" (quitar る)\nGrupo 3 (Irregulares): する (suru - hacer), 来る (kuru - venir)',
      puntosClave: [
        'En estilo casual entre iguales o amigos cercanos, se elimina です y se usan verbos en forma diccionario directa: 食べる？ (¿comes?), うん、食べる (sí, como).',
        'Grupo 1 cambia la vocal "i" de la raíz masu por la vocal "u": いきます (ikimasu) → いく (iku).',
        'Grupo 2 simplemente reemplaza 〜ます por 〜る: たべます (tabemasu) → たべる (taberu).',
        'Cópula informal: です se reemplaza por だ (da) en afirmación, o se omite en preguntas agregando entonación ascendente.',
      ],
      ejemplos: [
        {
          japones: '明日、友達と映画を見に行く。',
          lectura: 'あした、ともだちとえいがをみにいく。',
          romaji: 'Ashita, tomodachi to eiga wo mi ni iku.',
          espanol: 'Mañana voy a ver una película con un amigo (Estilo casual).',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-1/Tema%201/Audio/Y_[01-01]_kaiwa1.mp3',
        },
        {
          japones: '今夜は何を食べる？',
          lectura: 'こんやはなにをたべる？',
          romaji: 'Konya wa nani wo taberu?',
          espanol: '¿Qué vas a comer esta noche? (Pregunta informal sin か ni です).',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-1/Tema%201/Audio/Y_[01-02]_kaiwa2.mp3',
        },
        {
          japones: '週末はいつも家で本を読む。',
          lectura: 'しゅうまつはいつもいえでほんをよむ。',
          romaji: 'Shuumatsu wa itsumo ie de hon wo yomu.',
          espanol: 'Los fines de semana siempre leo libros en casa.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_1_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma de diccionario (informal presente) de 飲みます (beber)?',
        caracterPrincipal: '飲みます (nomimasu) → [ ? ]',
        lecturaHiragana: 'のみます → [ ? ]',
        romaji: 'nomimasu → [ ? ]',
        lecturaCompleta: '飲む (nomu)',
        romajiCompleto: 'nomu',
        explicacionContexto: '飲む es un verbo Godan (Grupo 1). La vocal "i" de "nomi-masu" cambia a la vocal "u": のむ (nomu).',
        opciones: ['飲める (nomeru)', '飲む (nomu)', '飲ま (noma)', '飲んだ (nonda)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n4_1_q2',
        tipo: 'opcion_multiple',
        pregunta: '¿Cómo responderías de forma casual afirmativa a "¿Vienes mañana?" (明日、来る？)?',
        caracterPrincipal: '明日、来る？ (Ashita, kuru?)',
        lecturaHiragana: 'あした、くる？',
        romaji: 'Ashita, kuru?',
        lecturaCompleta: 'うん、行く。(Un, iku)',
        romajiCompleto: 'Un, iku.',
        explicacionContexto: 'En registro informal, "sí" es うん (un) y el verbo ir en presente informal es 行く (iku).',
        opciones: ['はい、行きます。', 'うん、行く。', 'いいえ、来ます。', 'ううん、行った。'],
        indiceCorrecto: 1,
      },
      {
        id: 'n4_1_q3',
        tipo: 'kanji_lectura',
        pregunta: 'Convierte el verbo 話します (hablar) a su forma informal de diccionario:',
        caracterPrincipal: '話します (hanashimasu)',
        lecturaHiragana: 'はなします',
        romaji: 'hanashimasu',
        lecturaCompleta: '話す (hanasu)',
        romajiCompleto: 'hanasu',
        explicacionContexto: 'Grupo 1 Godan con terminación し: し cambia a す (su) en forma diccionario: はなす (hanasu).',
        opciones: ['話す (hanasu)', '話る (hanaru)', '話せる (hanaseru)', '話した (hanashita)'],
        indiceCorrecto: 0,
      },
      {
        id: 'n4_1_q4',
        tipo: 'opcion_multiple',
        pregunta: 'En una conversación informal entre amigos, ¿cómo sustituyes la cópula です en "Esto es delicioso"?',
        caracterPrincipal: 'これ、美味しい [ ? ]',
        lecturaHiragana: 'これ、おいしい [ ? ]',
        romaji: 'Kore, oishii [ ? ]',
        lecturaCompleta: 'これ、美味しいよ。(O bien se deja el adjetivo-i directo)',
        romajiCompleto: 'Kore, oishii yo.',
        explicacionContexto: 'Con adjetivos-i en estilo informal no se usa だ (da ni desu); simplemente se dice el adjetivo o se añade la partícula enfática よ (yo).',
        opciones: ['だ (da)', 'です (desu)', 'よ (yo - sin desu)', 'でした (deshita)'],
        indiceCorrecto: 2,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 02: FORMA NEGATIVA INFORMAL (-NAI) Y OBLIGACIÓN
  // ==========================================================================
  n4_02: {
    id: 'n4_02',
    titulo: 'Forma Negativa Informal (-nai) y Obligación (〜なければならない)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Negación Informal y la Expresión de Deber u Obligación',
      subtitulo: 'JLPT N4 · Rutinas, Normas y Compromisos (Irodori A2-1 Tema 2)',
      conceptoClave:
        'La forma 〜ない (forma Nai) es la contraparte informal de 〜ません (masen). Además de servir para negar en estilo casual, es la base para expresar reglas y obligaciones indispensables: 〜なければなりません ("tener que hacer algo / deber hacer").',
      reglaOFormula:
        'Grupo 1: Vocal "u" cambia a columna "a" + ない (飲む → 飲まない). ¡Regla especial para verbos en "u" sola: う cambia a わ (買う → 買わない)!\nGrupo 2: Quitar る + ない (食べる → 食べない)\nGrupo 3: する → しない (shinai), 来る → こない (konai)',
      puntosClave: [
        'Fórmula de Obligación: Verbo en forma Nai (quitar い) + ければならない / ければなりません: 勉強しなければなりません ("Tengo que estudiar").',
        'Forma coloquial rápida de obligación entre amigos: 〜なきゃ (nakya) o 〜なくちゃ (nakucha): もう行かなきゃ ("Ya me tengo que ir").',
        'Permiso para no hacer algo: 〜なくてもいいです ("No es necesario que hagas...", "puedes no hacer...").',
      ],
      ejemplos: [
        {
          japones: '明日は試験があるから、早く寝なければなりません。',
          lectura: 'あしたはしけんがあるから、はやくねなければなりません。',
          romaji: 'Ashita wa shiken ga aru kara, hayaku nenakereba narimasen.',
          espanol: 'Como mañana hay examen, debo acostarme temprano.',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-1/Tema%202/Audio/Y_[02-01]_kaiwa1.mp3',
        },
        {
          japones: '日曜日は仕事に行かなくてもいいです。',
          lectura: 'にちようびはしごとにいかなくてもいいです。',
          romaji: 'Nichiyoubi wa shigoto ni ikanakute mo ii desu.',
          espanol: 'Los domingos no es necesario que vaya a trabajar.',
        },
        {
          japones: '今日は朝ごはんを食べなかった。',
          lectura: 'きょうはあさごはんをたべなかった。',
          romaji: 'Kyou wa asagohan wo tabenakatta.',
          espanol: 'Hoy no desayuné (Pasado negativo informal: -nakatta).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_2_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma negativa informal (Nai) del verbo 買う (comprar)?',
        caracterPrincipal: '買う (kau) → [ ? ]',
        lecturaHiragana: 'かう → [ ? ]',
        romaji: 'kau → [ ? ]',
        lecturaCompleta: '買わない (kawanai)',
        romajiCompleto: 'kawanai',
        explicacionContexto: '¡Excepción fonética vital! Los verbos Godan que terminan en う cambian a わ (wa), no a あ: 買う → 買わない (kawanai).',
        opciones: ['買あない (kaanai)', '買わない (kawanai)', '買えない (kaenai)', '買しない (kashinai)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n4_2_q2',
        tipo: 'opcion_multiple',
        pregunta: 'Completa la oración: "Tengo que tomar medicina porque tengo fiebre"',
        caracterPrincipal: '熱があるから、薬を [ ? ] ならない。',
        lecturaHiragana: 'ねつがあるから、くすりを [ ? ] ならない。',
        romaji: 'Netsu ga aru kara, kusuri wo [ ? ] naranai.',
        lecturaCompleta: '飲まなければ (nomanakereba)',
        romajiCompleto: 'nomanakereba',
        explicacionContexto: 'Obligación: 飲む (beber/tomar) → 飲まない → quitar い y añadir ければならない = 飲まなければならない。',
        opciones: ['飲まなければ', '飲まなくては', '飲んでから', '飲みながら'],
        indiceCorrecto: 0,
      },
      {
        id: 'n4_2_q3',
        tipo: 'opcion_multiple',
        pregunta: '¿Qué significa la expresión cotidiana: "靴を脱がなくてもいいですよ"?',
        caracterPrincipal: '脱がなくてもいいです (nuganakute mo ii desu)',
        lecturaHiragana: 'くつをぬがなくてもいいですよ。',
        romaji: 'Kutsu wo nuganakute mo ii desu yo.',
        lecturaCompleta: 'No es necesario quitarse los zapatos.',
        romajiCompleto: 'You do not need to take off your shoes.',
        explicacionContexto: '〜なくてもいい expresa ausencia de obligación ("no es obligatorio hacerlo", "puedes no hacerlo").',
        opciones: ['Está prohibido quitarse los zapatos', 'No es necesario quitarse los zapatos', 'Debe quitarse los zapatos ahora', 'No puede entrar con zapatos'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 03: FORMA PASADA INFORMAL (-TA) Y EXPERIENCIA VIVIDA
  // ==========================================================================
  n4_03: {
    id: 'n4_03',
    titulo: 'Forma Pasada Informal (-ta) y Experiencia (〜たことがある)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Contar Vivencias Pasadas y la Estructura 〜たことがある',
      subtitulo: 'JLPT N4 · Experiencias de Vida y Pasado Informal (Irodori A2-1)',
      conceptoClave:
        'La forma 〜た (forma Ta) es exactamente la conjugación de pasado informal de los verbos. Sigue las mismas reglas de eufonía que la forma 〜て (te): simplemente se cambia "te" por "ta" y "de" por "da". Al unirse con 〜ことがある expresa haber tenido alguna vez en la vida esa experiencia.',
      reglaOFormula:
        'Conjugación Ta: Mismas reglas de la forma Te (食べて → 食べた, 飲んで → 飲んだ, 行って → 行った)\nFórmula de Experiencia: Verbo en forma Ta + ことがある / ことがあります',
      puntosClave: [
        'Preguntar experiencias: 〜たことがありますか ("¿Has estado/probado alguna vez...?").',
        'Respuesta afirmativa: はい、あります (Sí, la he tenido) o はい、一度あります (Sí, una vez).',
        'Respuesta negativa: いいえ、一度もありません (No, ni una sola vez).',
        'Enumerar acciones no secuenciales o representativas: 〜たり、〜たりする ("A veces hago X, a veces hago Y").',
      ],
      ejemplos: [
        {
          japones: '日本へ行ったことがありますか。',
          lectura: 'にほんへいったことがありますか。',
          romaji: 'Nihon e itta koto ga arimasu ka.',
          espanol: '¿Has ido alguna vez a Japón?',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-1/Tema%203/Audio/Y_[03-01]_kaiwa1.mp3',
        },
        {
          japones: '富士山に登ったことがあります。',
          lectura: 'ふじさんにのぼったことがあります。',
          romaji: 'Fujisan ni nobotta koto ga arimasu.',
          espanol: 'He subido al Monte Fuji (Experiencia personal vivida).',
        },
        {
          japones: '休みの日は、掃除したり買い物をしたりします。',
          lectura: 'やすみのひは、そうじしたりかいものをしたりします。',
          romaji: 'Yasumi no hi wa, souji shitari kaimono wo shitari shimasu.',
          espanol: 'En mis días libres, limpio, hago compras, entre otras cosas.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_3_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma pasada informal (Ta) del verbo 飲む (beber)?',
        caracterPrincipal: '飲む (nomu) → [ ? ]',
        lecturaHiragana: 'のむ → [ ? ]',
        romaji: 'nomu → [ ? ]',
        lecturaCompleta: '飲んだ (nonda)',
        romajiCompleto: 'nonda',
        explicacionContexto: 'Como la forma Te de 飲む es 飲んで (nonde), la forma Ta correspondiente es 飲んだ (nonda).',
        opciones: ['飲また (nomata)', '飲んだ (nonda)', '飲った (notta)', '飲みた (nomita)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n4_3_q2',
        tipo: 'opcion_multiple',
        pregunta: 'Elige la opción correcta para decir "Nunca he probado el natto":',
        caracterPrincipal: '納豆を [ ? ] ことがありません。',
        lecturaHiragana: 'なっとうを [ ? ] ことがありません。',
        romaji: 'Nattou wo [ ? ] koto ga arimasen.',
        lecturaCompleta: '食べた (tabeta)',
        romajiCompleto: 'tabeta',
        explicacionContexto: 'La estructura de experiencia requiere obligatoriamente el verbo en pasado informal (forma Ta): 食べた + ことがありません。',
        opciones: ['食べる', '食べて', '食べた', '食べない'],
        indiceCorrecto: 2,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 04: COMPARACIONES Y PREFERENCIAS (YORI, HOU GA II, ICHIBAN)
  // ==========================================================================
  n4_04: {
    id: 'n4_04',
    titulo: 'Comparaciones y Preferencias (〜より、〜のほうがいい、一番)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Comparar Opciones y Recomendar Decisiones',
      subtitulo: 'JLPT N4 · Juicios de Valor y Preferencias (Irodori A2-1)',
      conceptoClave:
        'En japonés las comparaciones no utilizan palabras como "más" o "menos" solas, sino partículas de relación: 〜より (yori - "más que...") y 〜のほうが (no hou ga - "el lado de... es más"). Para dar consejos amables se usa 〜たほうがいい ("sería mejor que hicieras...").',
      reglaOFormula:
        'Comparación directa: A は B より [Adjetivo] です (A es más [Adj] que B)\nPregunta de alternativa: A と B と どちらが [Adj] ですか (¿Entre A y B cuál es más...?)\nSuperlativo: [Categoría] の中で 一番 [Adj] です (El más... de todos)',
      puntosClave: [
        'Consejo afirmativo: Verbo en forma Ta + ほうがいいです: 病院へ行ったほうがいいですよ ("Sería mejor que fueras al hospital").',
        'Consejo negativo (advertencia): Verbo en forma Nai + ほうがいいです: 無理をしないほうがいい ("Es mejor que no te sobreexijas").',
        'Respuesta a "¿cuál prefieres?": どちらも好きです (Me gustan ambos) o A のほうが好きです (Prefiero A).',
      ],
      ejemplos: [
        {
          japones: '新幹線は飛行機より便利です。',
          lectura: 'しんかんせんはひこうきよりべんりです。',
          romaji: 'Shinkansen wa hikouki yori benri desu.',
          espanol: 'El tren bala es más conveniente que el avión.',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-1/Tema%204/Audio/Y_[04-01]_kaiwa1.mp3',
        },
        {
          japones: '日本料理の中で寿司が一番好きです。',
          lectura: 'にほんりょうりのなかですしがいちばんすきです。',
          romaji: 'Nihon ryouri no naka de sushi ga ichiban suki desu.',
          espanol: 'De toda la comida japonesa, el sushi es el que más me gusta.',
        },
        {
          japones: '風邪を引いたときは、温かいお茶を飲んだほうがいいです。',
          lectura: 'かぜをひいたときは、あたたかいおちゃをのんだほうがいいです。',
          romaji: 'Kaze wo hiita toki wa, atatakai ocha wo nonda hou ga ii desu.',
          espanol: 'Cuando te resfrías, es mejor que bebas té caliente.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_4_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cómo se dice en japonés: "El metro es más rápido que el autobús"?',
        caracterPrincipal: '地下鉄はバス [ ? ] 速いです。',
        lecturaHiragana: 'ちかてつはばす [ ? ] はやいです。',
        romaji: 'Chikatetsu wa basu [ ? ] hayai desu.',
        lecturaCompleta: '地下鉄はバスより速いです。',
        romajiCompleto: 'Chikatetsu wa basu yori hayai desu.',
        explicacionContexto: 'より (yori) marca el punto de referencia de la comparación ("que el autobús").',
        opciones: ['から (kara)', 'より (yori)', 'ほど (hodo)', 'まで (made)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n4_4_q2',
        tipo: 'opcion_multiple',
        pregunta: 'Elige la forma correcta para aconsejar a alguien no desvelarse:',
        caracterPrincipal: '夜遅くまで起き [ ? ] ほうがいいですよ。',
        lecturaHiragana: 'よるおそくまでおき [ ? ] ほうがいいですよ。',
        romaji: 'Yoru osoku made oki [ ? ] hou ga ii desu yo.',
        lecturaCompleta: '起きない (okinai)',
        romajiCompleto: 'okinai',
        explicacionContexto: 'Para aconsejar NO hacer algo, se usa el verbo en forma negativa informal (Nai) + ほうがいい: 起きないほうがいい。',
        opciones: ['て (te)', 'ない (nai)', 'た (ta)', 'ず (zu)'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 05: VERBOS DE DAR Y RECIBIR (AGERU, MORAU, KURERU)
  // ==========================================================================
  n4_05: {
    id: 'n4_05',
    titulo: 'Verbos de Dar y Recibir (あげる、もらう、くれる)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'La Perspectiva Psicológica Japonesa: Dar y Recibir',
      subtitulo: 'JLPT N4 · Relaciones Sociales y Favores (Irodori A2-1)',
      conceptoClave:
        'En japonés, la elección del verbo para "dar" o "recibir" depende estrictamente del punto de vista del hablante y de su círculo interno (Uchi vs Soto). Esta sutileza define la cortesía y la empatía en la cultura japonesa.',
      reglaOFormula:
        'あげる (ageru): Yo (o mi grupo) doy a otra persona\nくれる (kureru): Otra persona me da a MÍ (o a alguien de mi familia)\nもらう (morau): Yo recibo de otra persona (marcado con に)',
      puntosClave: [
        '¡Regla de Oro con くれる! NUNCA puedes decir "Yo le doy a X usando kureru". Kureru siempre significa que algo viene HACIA mí o hacia mi núcleo cercano.',
        'Extensión a Favores (Forma -Te): 〜てあげる (hacer un favor a otro), 〜てくれる (alguien me hace un favor a mí con gratitud), 〜てもらう (recibir un favor solicitado).',
      ],
      ejemplos: [
        {
          japones: '友達が誕生日に素敵なプレゼントをくれました。',
          lectura: 'ともだちがたんじょうびにすてきなぷれぜんとをくれました。',
          romaji: 'Tomodachi ga tanjoubi ni suteki na purezento wo kuremashita.',
          espanol: 'Mi amigo me dio un regalo maravilloso por mi cumpleaños.',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-1/Tema%205/Audio/Y_[05-01]_kaiwa1.mp3',
        },
        {
          japones: '妹に日本語の本をあげました。',
          lectura: 'いもうとににほんごのほんをあげました。',
          romaji: 'Imouto ni nihongo no hon wo agemashita.',
          espanol: 'Le di un libro de japonés a mi hermana menor.',
        },
        {
          japones: '先生に推薦状を書いてもらいました。',
          lectura: 'せんせいにすいせんじょうをかいてもらいました。',
          romaji: 'Sensei ni suisenjou wo kaite moraimashita.',
          espanol: 'El profesor me escribió una carta de recomendación (recibí ese favor del profesor).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_5_q1',
        tipo: 'opcion_multiple',
        pregunta: 'Un compañero de clase te prestó un paraguas cuando llovía. ¿Cuál es la forma correcta de expresar tu agradecimiento?',
        caracterPrincipal: '田中さんが傘を貸して [ ? ]',
        lecturaHiragana: 'たなかさんがかさをかして [ ? ]',
        romaji: 'Tanaka-san ga kasa wo kashite [ ? ]',
        lecturaCompleta: 'くれました (kuremashita)',
        romajiCompleto: 'kuremashita',
        explicacionContexto: 'Cuando otra persona te hace un favor a ti, se emplea くれました (kuremashita), reconociendo el beneficio recibido.',
        opciones: ['あげました (agemashita)', 'くれました (kuremashita)', 'もらいました (moraimashita)', 'やりました (yarimashita)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n4_5_q2',
        tipo: 'opcion_multiple',
        pregunta: '¿Qué partícula marca a la persona DE QUIEN se recibe algo con もらう (morau)?',
        caracterPrincipal: '母 [ ? ] 時計をもらいました。',
        lecturaHiragana: 'はは [ ? ] とけいをもらいました。',
        romaji: 'Haha [ ? ] tokei wo moraimashita.',
        lecturaCompleta: '母に (Haha ni)',
        romajiCompleto: 'Haha ni',
        explicacionContexto: 'En construcciones con もらう, la persona fuente del regalo o favor se marca con la partícula に (ni) o から (kara).',
        opciones: ['を (wo)', 'に (ni)', 'で (de)', 'へ (e)'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 06: FORMA POTENCIAL (HABILIDAD Y POSIBILIDAD)
  // ==========================================================================
  n4_06: {
    id: 'n4_06',
    titulo: 'Forma Potencial y Expresión de Capacidades (〜できる、〜話せる)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Poder y Ser Capaz: La Forma Potencial (可能形)',
      subtitulo: 'JLPT N4 · Habilidades, Idiomas y Oportunidades (Irodori A2-2)',
      conceptoClave:
        'En N5 usabas la perífrasis larga 〜ことができます. En N4 los hablantes nativos sintetizan esta idea conjugando el verbo directamente en su Forma Potencial (Kanou-kei), expresando tanto habilidad aprendida como posibilidad situacional.',
      reglaOFormula:
        'Grupo 1 (Godan): Cambia vocal final "u" por fila "e" + る (話す → 話せる, 飲む → 飲める, 行く → 行ける)\nGrupo 2 (Ichidan): Quita る + られる (食べる → 食べられる, 見る → 見られる)\nGrupo 3 (Irregulares): する → できる (dekiru), 来る → こられる (korareru)',
      puntosClave: [
        '¡Cambio de Partícula! Con la forma potencial, el objeto directo normalmente cambia de を a が: 日本語を話す → 日本語が話せる ("Puedo hablar japonés").',
        'Llamado coloquial "Ra-nuki": En el habla informal de hoy en día, muchos japoneses quitan el "ra" en Grupo 2: 食べれる (tabereru), aunque en el JLPT oficial se prioriza 食べられる (taberareru).',
      ],
      ejemplos: [
        {
          japones: '漢字を少し読むことができますか。→ ええ、少し読めます。',
          lectura: 'かんじをすこしよむことができますか。→ ええ、すこしよめます。',
          romaji: 'Kanji wo sukoshi yomu koto ga dekimasu ka? -> Ee, sukoshi yomemasu.',
          espanol: '¿Puedes leer un poco de kanji? -> Sí, puedo leer un poco.',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-2/Tema%201/Audio/Y_[01-01]_kaiwa1.mp3',
        },
        {
          japones: 'この部屋から富士山が見えます。',
          lectura: 'このへやからふじさんがみえます。',
          romaji: 'Kono heya kara Fujisan ga miemasu.',
          espanol: 'Desde esta habitación se puede ver el Monte Fuji (Visibilidad natural: Mieru).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_6_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma potencial de 書く (kaku - escribir)?',
        caracterPrincipal: '書く (kaku) → [ ? ]',
        lecturaHiragana: 'かく → [ ? ]',
        romaji: 'kaku → [ ? ]',
        lecturaCompleta: '書ける (kakeru)',
        romajiCompleto: 'kakeru',
        explicacionContexto: 'Grupo 1 Godan: "ku" pasa a la columna "e" ("ke") + る: 書く → 書ける (kakeru - poder escribir).',
        opciones: ['書かれる (kakareru)', '書ける (kakeru)', '書かせる (kakaseru)', '書くできる (kakudekiru)'],
        indiceCorrecto: 1,
      },
      {
        id: 'n4_6_q2',
        tipo: 'opcion_multiple',
        pregunta: 'Completa la oración: "Gracias a la medicina, ahora puedo dormir bien"',
        caracterPrincipal: '薬のおかげで、よく [ ? ] ようになりました。',
        lecturaHiragana: 'くすりのおかげで、よく [ ? ] ようになりました。',
        romaji: 'Kusuri no okage de, yoku [ ? ] you ni narimashita.',
        lecturaCompleta: '眠れる (nemureru)',
        romajiCompleto: 'nemureru',
        explicacionContexto: '眠る (dormir) es Grupo 1: pasa a 眠れる (nemureru - poder dormir).',
        opciones: ['眠る', '眠れる', '眠った', '眠らない'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 07: FORMA VOLITIVA Y PLANES A FUTURO (TSUMORI, -YOU)
  // ==========================================================================
  n4_07: {
    id: 'n4_07',
    titulo: 'Forma Volitiva y Planes Futuros (〜よう / 〜つもり)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Proponer, Invitar y Planear: La Forma Volitiva (意向形)',
      subtitulo: 'JLPT N4 · Metas, Invitaciones Informales y Determinación',
      conceptoClave:
        'La Forma Volitiva (Ikou-kei) es la variante informal de 〜ましょう (hagamos tal cosa / vayamos). Expresa iniciativa propia o una propuesta amistosa. Combinada con と思っています expresa una intención o plan que se viene meditando.',
      reglaOFormula:
        'Grupo 1: Cambiar vocal "u" por fila "o" alargada (行く → 行こう, 飲む → 飲もう)\nGrupo 2: Quitar る + よう (食べる → 食べよう, 見る → 見よう)\nGrupo 3: する → しよう (shiyou), 来る → こよう (koyou)',
      puntosClave: [
        'Propuesta informal: 一緒に行こう！ ("¡Vamos juntos!").',
        'Intención meditada: Verbo Volitivo + と思っています ("Tengo pensado hacer...").',
        'Plan firme y decidido: Verbo en forma diccionario + つもりです ("Tengo la firme intención de...").',
      ],
      ejemplos: [
        {
          japones: '来年、日本へ留学しようと思っています。',
          lectura: 'らいねん、にほんへりゅうがくしようとおもっています。',
          romaji: 'Rainen, Nihon e ryuugaku shiyou to omotte imasu.',
          espanol: 'Tengo pensado ir a estudiar al extranjero a Japón el próximo año.',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-2/Tema%202/Audio/Y_[02-01]_kaiwa1.mp3',
        },
        {
          japones: '疲れたから、ちょっと休もう。',
          lectura: 'つかれたから、ちょっとやすもう。',
          romaji: 'Tsukareta kara, chotto yasumou.',
          espanol: 'Como estoy cansado, descansemos un poco (Propuesta informal).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_7_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cuál es la forma volitiva informal de 食べる (comer)?',
        caracterPrincipal: '食べる (taberu) → [ ? ]',
        lecturaHiragana: 'たべる → [ ? ]',
        romaji: 'taberu → [ ? ]',
        lecturaCompleta: '食べよう (tabeyou)',
        romajiCompleto: 'tabeyou',
        explicacionContexto: 'Grupo 2 Ichidan: se sustituye る por よう: 食べる → 食べよう (¡comamos!).',
        opciones: ['食べろう (taberou)', '食べよう (tabeyou)', '食べましょう (tabemashou - es formal)', '食べたい (tabetai)'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 08: CONDICIONALES ESENCIALES (~TARA, ~BA, ~TO, ~NARA)
  // ==========================================================================
  n4_08: {
    id: 'n4_08',
    titulo: 'Condicionales Prácticos: 〜たら、〜ば、〜と、〜なら',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Los 4 Caminos del "Si...": Condicionales en Japonés',
      subtitulo: 'JLPT N4 · Hipótesis, Causa Natural y Contexto',
      conceptoClave:
        'El japonés posee 4 formas principales para decir "si": cada una con un tono y matiz preciso. Dominar cuándo usar cada una es uno de los mayores hitos para aprobar con honores el examen JLPT N4.',
      reglaOFormula:
        '〜たら: Pasado Ta + ら (Universal: condición temporal "si ocurre / cuando ocurra")\n〜と: Verbo diccionario + と (Consecuencia natural e inevitable: "al girar a la derecha, está...")\n〜ば: Condicional formal hipotético (安ければ = "si fuera barato")\n〜なら: Condicional contextual de tópico ("si se trata de...")',
      puntosClave: [
        '〜たら es el más flexible y seguro de usar en la conversación diaria.',
        'Con 〜と NUNCA se pueden usar órdenes, peticiones ni deseos en la oración principal.',
        'Con 〜なら se responde a sugerencias del interlocutor: "Si vas a Tokio, deberías visitar Asakusa".',
      ],
      ejemplos: [
        {
          japones: '時間があったら、旅行に行きたいです。',
          lectura: 'じかんがあったら、りょこうにいきたいです。',
          romaji: 'Jikan ga attara, ryokou ni ikitai desu.',
          espanol: 'Si tengo tiempo, quiero ir de viaje.',
          audioUrl: '/api/audio/GRAMATICA/IRODORI/A2-2/Tema%203/Audio/Y_[03-01]_kaiwa1.mp3',
        },
        {
          japones: '春になると、桜が咲きます。',
          lectura: 'はるになると、さくらがさきます。',
          romaji: 'Haru ni naru to, sakura ga sakimasu.',
          espanol: 'Al llegar la primavera, florecen los cerezos (Fenómeno natural inevitable: ~to).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_8_q1',
        tipo: 'opcion_multiple',
        pregunta: 'Para dar indicaciones en la calle: "Si giras a la derecha en esa esquina, verás el banco inmediatamente":',
        caracterPrincipal: 'あの角を右に曲がる [ ? ]、すぐ銀行があります。',
        lecturaHiragana: 'あのかどをみぎにまがる [ ? ]、すぐぎんこうがあります。',
        romaji: 'Ano kado wo migi ni magaru [ ? ], sugu ginkou ga arimasu.',
        lecturaCompleta: 'と (to)',
        romajiCompleto: 'to',
        explicacionContexto: 'Las indicaciones geográficas y leyes fijas de causa-efecto utilizan la partícula condicional と con forma de diccionario.',
        opciones: ['なら (nara)', 'と (to)', 'ば (ba)', 'ても (temo)'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 09: VERBOS TRANSITIVOS E INTRANSITIVOS COMUNES
  // ==========================================================================
  n4_09: {
    id: 'n4_09',
    titulo: 'Verbos Transitivos vs Intransitivos (自動詞 と 他動詞)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: '¿Quién Hace la Acción? Jidoushi y Tadoushi',
      subtitulo: 'JLPT N4 · Pares Verbales y Estados de Cosas',
      conceptoClave:
        'Muchos verbos japoneses vienen en pares emparejados: uno transitivo (un agente humano realiza la acción intencionalmente sobre un objeto: を) y uno intransitivo (el objeto cambia de estado espontáneamente: が).',
      reglaOFormula:
        'Transitivo (他動詞): [Persona] が [Cosa] を 開ける (abrir algo)\nIntransitivo (自動詞): [Cosa] が 開く (algo se abre solo)\nEstado continuo resultante: Verbo intransitivo en forma -Te + います (ドアが開いています = "La puerta está abierta")',
      puntosClave: [
        '開ける (akeru - transitivo) vs 開く (aku - intransitivo).',
        '消す (kesu - apagar algo) vs 消える (kieru - apagarse).',
        '落とす (otosu - dejar caer) vs 落ちる (ochiru - caerse).',
      ],
      ejemplos: [
        {
          japones: '窓が開いていますよ。寒くないですか。',
          lectura: 'まどがあいていますよ。さむくないですか。',
          romaji: 'Mado ga aite imasu yo. Samukunai desu ka.',
          espanol: 'La ventana está abierta. ¿No tienes frío? (Estado continuo: aku + te imasu).',
        },
        {
          japones: '空気が冷たいので、窓を閉めました。',
          lectura: 'くうきがつめたいので、まどをしめました。',
          romaji: 'Kuuki ga tsumetai node, mado wo shimemashita.',
          espanol: 'Como el aire estaba frío, cerré la ventana (Acción transitiva intencional: shimemashita).',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_9_q1',
        tipo: 'opcion_multiple',
        pregunta: 'Elige el verbo correcto para completar: "La luz de la habitación se apagó de repente"',
        caracterPrincipal: '部屋の電気が急に [ ? ]。',
        lecturaHiragana: 'へやのでんきがきゅうに [ ? ]。',
        romaji: 'Heya no denki ga kyuu ni [ ? ].',
        lecturaCompleta: '消えました (kiemashita)',
        romajiCompleto: 'kiemashita',
        explicacionContexto: 'Como no hay un sujeto que accione el interruptor con を, sino que la luz se apaga sola con が, se usa el intransitivo 消える (kieru).',
        opciones: ['消しました (keshimashita)', '消えました (kiemashita)', '落としました (otoshimashita)', '開けました (akemashita)'],
        indiceCorrecto: 1,
      },
    ],
  },

  // ==========================================================================
  // N4 - LECCIÓN 10: DESEOS PROPIOS Y AJENOS (~TAI, ~TAGARU, ~TE HOSHII)
  // ==========================================================================
  n4_10: {
    id: 'n4_10',
    titulo: 'Deseos y Peticiones (〜たい、〜たがる、〜てほしい)',
    nivel_jlpt: 'N4',
    teoria: {
      titulo: 'Expresar Anhelos sin Vulnerar la Cortesía',
      subtitulo: 'JLPT N4 · Psicología y Deseo Propio vs Deseo de Terceros',
      conceptoClave:
        'En japonés tradicional, tú solo puedes afirmar con certeza lo que TÚ sientes en tu propio corazón. Por eso, 〜たい (tai) y ほしい (hoshii) se reservan para la primera persona ("yo quiero"). Para hablar del deseo de otra persona se usan formas de observación como 〜たがっている.',
      reglaOFormula:
        'Mi deseo de hacer una acción: Raíz Masu + たい (食べたい = quiero comer)\nMi deseo de que OTRO haga una acción: Verbo en forma -Te + ほしい (手伝ってほしい = quiero que me ayudes)\nDeseo observado en otra persona: Raíz Masu + たがる / たがっている',
      puntosClave: [
        '〜たい se conjuga exactamente igual que un adjetivo en -i: 食べたくない (no quiero comer), 食べたかった (quería comer).',
        'Partícula con たい: Puede usarse tanto を como が: 水を飲みたい / 水が飲みたい.',
      ],
      ejemplos: [
        {
          japones: '今年の夏休みは温泉に行きたいです。',
          lectura: 'ことしのなつやすみはおんせんにいきたいです。',
          romaji: 'Kotoshi no natsuyasumi wa onsen ni ikitai desu.',
          espanol: 'En las vacaciones de verano de este año quiero ir a unas aguas termales.',
        },
        {
          japones: '弟は新しいゲームを買いたがっています。',
          lectura: 'おとうとはあたらしいげーむをかいたがっています。',
          romaji: 'Otouto wa atarashii geemu wo kaitagatte imasu.',
          espanol: 'Mi hermano menor parece querer mucho comprarse un nuevo videojuego.',
        },
      ],
    },
    preguntas: [
      {
        id: 'n4_10_q1',
        tipo: 'opcion_multiple',
        pregunta: '¿Cómo dices respetuosamente a un amigo: "Quiero que vengas a mi fiesta de cumpleaños"?',
        caracterPrincipal: '私の誕生日に [ ? ] ほしいです。',
        lecturaHiragana: 'わたしのたんじょうびに [ ? ] ほしいです。',
        romaji: 'Watashi no tanjoubi ni [ ? ] hoshii desu.',
        lecturaCompleta: '来て (kite)',
        romajiCompleto: 'kite',
        explicacionContexto: 'Deseo de que otra persona realice una acción: Verbo en forma -Te + ほしい: 来る → 来てほしい。',
        opciones: ['来る', '来て', '来たい', '来ない'],
        indiceCorrecto: 1,
      },
    ],
  },
};

