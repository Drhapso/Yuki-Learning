import { JLPTExamData } from '../types';

export const MASTER_EXAMS: Record<string, JLPTExamData> = {
  // ==========================================================================
  // SIMULACRO OFICIAL JLPT N2 (NIVEL INTERMEDIO SUPERIOR / PRE-AVANZADO)
  // ==========================================================================
  exam_n2_official: {
    id: 'exam_n2_official',
    nivel: 'N2',
    titulo: 'Simulacro Oficial JLPT N2 (日本語能力試験 N2)',
    subtitulo: 'Prueba Estandarizada Oficial con Baremo Real',
    descripcion:
      'Evaluación exhaustiva de nivel intermedio-avanzado: incluye lectura de ensayos de opinión, gramática situacional compleja y comprensión auditiva nativa cronometrada con audio oficial.',
    tiempoTotalMinutos: 105,
    puntajeMaximoTotal: 180,
    puntajeAprobatorio: 90, // Mínimo 90/180 para aprobar
    puntajeMinimoSeccion: 19, // Mínimo 19/60 en CADA sección para evitar reprobación automática
    secciones: [
      {
        tipo: 'gengo_chishiki',
        nombre: 'Gengo Chishiki (言語知識)',
        subtitulo: 'Vocabulario, Kanjis de N2 y Gramática',
        puntajeMaximo: 60,
      },
      {
        tipo: 'dokkai',
        nombre: 'Dokkai (読解)',
        subtitulo: 'Comprensión de Lectura y Ensayos Críticos',
        puntajeMaximo: 60,
      },
      {
        tipo: 'choukai',
        nombre: 'Choukai (聴解)',
        subtitulo: 'Comprensión Auditiva a Velocidad Nativa',
        puntajeMaximo: 60,
      },
    ],
    preguntas: [
      // --- GENGO CHISHIKI ---
      {
        id: 'n2_gc_q1',
        seccion: 'gengo_chishiki',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 漢字読み (Lectura de Kanji)',
        instruccion: '＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
        caracterPrincipal: '両国の間で新たな【条約】が結ばれた。',
        opciones: ['じょうやく (jouyaku)', 'じょうき (jouki)', 'ちょうやく (chouyaku)', 'しょうやく (shouyaku)'],
        indiceCorrecto: 0,
        explicacion:
          '条約 (tratado/acuerdo bilateral) se lee じょうやく (jouyaku). 条 (jou - cláusula/artículo) + 約 (yaku - promesa/convenio).',
        puntos: 15,
      },
      {
        id: 'n2_gc_q2',
        seccion: 'gengo_chishiki',
        mondaiNumero: 2,
        mondaiTitulo: '問題２ 文脈規定 (Uso en Contexto)',
        instruccion: '（　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
        caracterPrincipal: '彼はどんな困難にも（　）立ち向かう強い意志を持っている。',
        opciones: ['くじけずに (kujikezu ni)', 'あきらめて (akiramete)', 'ためらって (tameratte)', 'おそれて (osorete)'],
        indiceCorrecto: 0,
        explicacion:
          'くじけずに (sin desanimarse / sin rendirse ante el golpe). Expresa una perseverancia inquebrantable frente a la adversidad.',
        puntos: 15,
      },
      {
        id: 'n2_gc_q3',
        seccion: 'gengo_chishiki',
        mondaiNumero: 3,
        mondaiTitulo: '問題３ 文の文法１ (Gramática de Oración)',
        instruccion: '次の文の（　）に入れるのに最もよいものを、一つ選びなさい。',
        caracterPrincipal: '今回の新製品は、消費者のアンケート結果を（　）開発された。',
        opciones: ['もとにして (moto ni shite)', 'こめて (komete)', 'めぐって (megutte)', 'とおして (tooshite)'],
        indiceCorrecto: 0,
        explicacion:
          '〜をもとにして significa "basándose en / tomando como fundamento": tomar los resultados de la encuesta como base para el desarrollo del producto.',
        puntos: 15,
      },
      {
        id: 'n2_gc_q4',
        seccion: 'gengo_chishiki',
        mondaiNumero: 4,
        mondaiTitulo: '問題４ 文の組み立て (Construcción con Estrella ★)',
        instruccion: '次の文の ★ に入る最もよいものを、一つ選びなさい。',
        caracterPrincipal: 'どんなに困難であっても、＿＿　＿＿　★　＿＿　諦めるわけにはいかない。',
        opciones: [
          '１：引き受けた',
          '２：以上は',
          '３：自分で',
          '４：途中で',
        ],
        indiceCorrecto: 0, // [自分で(3) 引き受けた(1) 以上は(2) ★途中で(4)] -> Opciones: 3, 1, 2, 4 -> Posición 3 (★) es 2 (以上は) o 4
        explicacion:
          'Estructura: 「自分で(3) 引き受けた(1) ★以上は(2) 途中で(4) 諦めるわけにはいかない」. Como yo mismo lo asumí (〜以上は: "ya que / puesto que"), no puedo renunciar a mitad de camino.',
        puntos: 15,
      },

      // --- DOKKAI ---
      {
        id: 'n2_dk_q1',
        seccion: 'dokkai',
        mondaiNumero: 8,
        mondaiTitulo: '問題８ 短文読解 (Comprensión de Texto Corto)',
        instruccion: '次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。',
        pasajeLectura:
          '【読解文】：現代の社会では、効率性ばかりが重視される傾向がある。しかし、何事も早く終わらせることだけが価値ではない。立ち止まってじっくり考えたり、一見無駄に思える時間を過ごしたりすることの中にこそ、新しい創造の芽が隠されているのではないだろうか。急ぐことによって失われる心のゆとりを取り戻すことが、今私たちに求められている。',
        caracterPrincipal: '筆者がこの文章で最も伝えたいことは何か。',
        opciones: [
          '社会で成功するためには、効率を何よりも最優先すべきだ。',
          '立ち止まってゆとりを持ち、じっくり思索する時間も大切である。',
          '無駄な時間を過ごす人は、新しいものを創造することができない。',
          '現代人は急ぐことで、より多くの創造性を発揮している。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'El autor reflexiona sobre el exceso de énfasis en la eficiencia («効率性ばかりが重視される») y sostiene que detenerse a reflexionar con calma («立ち止まってじっくり考えたり...ゆとりを取り戻す») es donde florece la creatividad.',
        puntos: 30,
      },
      {
        id: 'n2_dk_q2',
        seccion: 'dokkai',
        mondaiNumero: 9,
        mondaiTitulo: '問題９ 中文読解 (Comprensión de Texto Medio)',
        instruccion: '文章の内容と合致するものを一つ選びなさい。',
        pasajeLectura:
          '【読解文】：読書とは、単に著者の知識を受け取る受動的な作業ではない。読者はページをめくりながら、自分の過去の経験や価値観と照らし合わせ、心の中で著者と対話を続けている。だからこそ、同じ一冊の本を読んでも、人によって受け取るメッセージはまったく異なってくるのである。',
        caracterPrincipal: '読書において、人によって受け取るメッセージが異なるのはなぜか。',
        opciones: [
          '本に書かれている知識が不完全だから。',
          '読者が自分の経験や価値観をもとに著者と対話しながら読むから。',
          '読者は受動的にしか文章を理解できないから。',
          '著者が読者ごとに異なる本を書いているから。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'El texto explica explícitamente: «自分の過去の経験や価値観と照らし合わせ、心の中で著者と対話を続けている。だからこそ...».',
        puntos: 30,
      },

      // --- CHOUKAI ---
      {
        id: 'n2_ck_q1',
        seccion: 'choukai',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 課題理解 (Comprensión de Tarea)',
        instruccion: '音声を聞いて、質問に対する最も適切な答えを選びなさい。',
        audioUrl: '/api/audio/ENTRENAMIENTO%20JLPT/Test%20Items/N2/Listening/Audio/N2Q1%20-%20Task-based%20comprehension.mp3',
        dialogoScript:
          '【スクリプト】：会社で男の人と女の人が話しています。男の人はこの後、まず何をしなければなりませんか。\n男「課長、明日の会議の資料、印刷しておきました。」\n女「ありがとう。あ、でもこのグラフ、最新のデータに差し替えるのを忘れていたわ。修正してくれる？」\n男「わかりました。すぐ直します。」\n女「直したら、部長に確認印をもらってから全員分コピーしてね。」\n質問：男の人はこの後、まず何をしますか。',
        caracterPrincipal: '男の人はこの後、まず何をしますか。',
        opciones: [
          '会議室を予約する。',
          'グラフのデータを修正する。',
          '部長に確認印をもらいに行く。',
          '全員分の資料をコピーする。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'La jefa le pide primero que corrija los datos del gráfico («修正してくれる？»), y el hombre responde «すぐ直します». Luego se lo mostrará al jefe de departamento y finalmente hará las copias.',
        puntos: 30,
      },
      {
        id: 'n2_ck_q2',
        seccion: 'choukai',
        mondaiNumero: 2,
        mondaiTitulo: '問題２ ポイント理解 (Comprensión de Puntos Clave)',
        instruccion: '音声を聞いて、話し手が最も重要視しているポイントを選びなさい。',
        audioUrl: '/api/audio/ENTRENAMIENTO%20JLPT/Test%20Items/N2/Listening/Audio/N2Q2%20-%20Point%20comprehension.mp3',
        dialogoScript:
          '【スクリプト】：大学で留学生の女性と先生が話しています。女性が日本に来て一番驚いたことは何ですか。\n女「先生、日本に来て半年経ちましたが、電車の時間の正確さには本当に感動しました。」\n男「そうだね、日本の交通網は時間に厳しいからね。」\n女「ええ、私の国では10分や20分の遅れは当たり前でしたから、分単位で運行されていることに一番驚きました。」\n質問：留学生の女性が日本で最も驚いたことは何ですか。',
        caracterPrincipal: '留学生の女性が日本で最も驚いたことは何ですか。',
        opciones: [
          '電車の運賃がとても安いこと。',
          '電車の運行時間が分単位で極めて正確なこと。',
          '駅員がとても親切なこと。',
          '電車の本数が少ないこと。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'La estudiante menciona explícitamente: «分単位で運行されていることに一番驚きました» (lo que más me sorprendió fue que opere al minuto exacto).',
        puntos: 30,
      },
    ],
  },

  // ==========================================================================
  // SIMULACRO OFICIAL JLPT N1 (MAESTRÍA Y NIVEL NATIVO)
  // ==========================================================================
  exam_n1_official: {
    id: 'exam_n1_official',
    nivel: 'N1',
    titulo: 'Simulacro Oficial JLPT N1 (日本語能力試験 N1)',
    subtitulo: 'La Cumbre de la Certificación Japonesa Oficial',
    descripcion:
      'Evaluación de máximo nivel académico y profesional: textos filosóficos y editoriales sin concesiones, modismos clásicos, sutiles giros dialécticos y comprensión auditiva de conferencias y debates rápidos.',
    tiempoTotalMinutos: 110,
    puntajeMaximoTotal: 180,
    puntajeAprobatorio: 100, // Mínimo 100/180 para aprobar N1
    puntajeMinimoSeccion: 19, // Mínimo 19/60 en CADA sección
    secciones: [
      {
        tipo: 'gengo_chishiki',
        nombre: 'Gengo Chishiki (言語知識)',
        subtitulo: 'Kanjis de Alta Frecuencia N1, Vocabulario Preciso y Gramática Clásica',
        puntajeMaximo: 60,
      },
      {
        tipo: 'dokkai',
        nombre: 'Dokkai (読解)',
        subtitulo: 'Ensayos Filosóficos, Crítica Social y Argumentación Compleja',
        puntajeMaximo: 60,
      },
      {
        tipo: 'choukai',
        nombre: 'Choukai (聴解)',
        subtitulo: 'Audios Oficiales N1 de Velocidad Plena con Modismos',
        puntajeMaximo: 60,
      },
    ],
    preguntas: [
      // --- GENGO CHISHIKI N1 ---
      {
        id: 'n1_gc_q1',
        seccion: 'gengo_chishiki',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 漢字読み (Lectura de Kanjis Avanzados)',
        instruccion: '＿＿の言葉の読み方として最もよいものを、一つ選びなさい。',
        caracterPrincipal: '事態を【打開】するために、双方が妥協案を模索した。',
        opciones: ['だかい (dakai)', 'たいかい (taikai)', 'だくかい (dakukai)', 'だげき (dageki)'],
        indiceCorrecto: 0,
        explicacion:
          '打開 (dakai): romper un callejón sin salida, superar un punto muerto. 打 (da) + 開 (kai).',
        puntos: 15,
      },
      {
        id: 'n1_gc_q2',
        seccion: 'gengo_chishiki',
        mondaiNumero: 2,
        mondaiTitulo: '問題２ 文脈規定 (Matices Semánticos N1)',
        instruccion: '（　）に入れるのに最もよいものを、一つ選びなさい。',
        caracterPrincipal: '彼の言動は、教育者としての立場を（　）ものとして厳しく批判された。',
        opciones: ['わきまえない', 'さしつかえない', 'たゆまない', 'おぼつかない'],
        indiceCorrecto: 0,
        explicacion:
          '立場をわきまえない (no ser consciente del propio rol o posición / no tener discernimiento de la posición que ostenta). わきまえる significa discernir, guardar la debida compostura de acuerdo a la posición.',
        puntos: 15,
      },
      {
        id: 'n1_gc_q3',
        seccion: 'gengo_chishiki',
        mondaiNumero: 3,
        mondaiTitulo: '問題３ 文の文法 (Gramática Literaria N1)',
        instruccion: '次の文の（　）に入る最も適切なものを一つ選びなさい。',
        caracterPrincipal: '被災地の人々の苦境を思うと、（　）。',
        opciones: [
          '胸が痛んでならない (mune ga itande naranai)',
          '胸を痛めるほかない',
          '胸が痛むことになっている',
        ],
        indiceCorrecto: 0,
        explicacion:
          '〜てならない expresa un sentimiento espontáneo e incontrolable que desborda al hablante: "no puedo evitar sentir un profundo dolor en el pecho".',
        puntos: 15,
      },
      {
        id: 'n1_gc_q4',
        seccion: 'gengo_chishiki',
        mondaiNumero: 4,
        mondaiTitulo: '問題４ 語彙と成句 (Yojijukugo y Locuciones)',
        instruccion: '文中の意味に最もふさわしい四字熟語を選びなさい。',
        caracterPrincipal: '二人の間には言葉がなくとも、完全に心を通わせ合う（　）の境地があった。',
        opciones: ['以心伝心 (いしんでんしん)', '一期一会 (いちごいちえ)', '十人十色 (じゅうにんといろ)', '我田引水 (がでんいんすい)'],
        indiceCorrecto: 0,
        explicacion:
          '以心伝心 (ishin denshin): entenderse mutuamente de corazón a corazón sin necesidad de expresarlo con palabras.',
        puntos: 15,
      },

      // --- DOKKAI N1 ---
      {
        id: 'n1_dk_q1',
        seccion: 'dokkai',
        mondaiNumero: 8,
        mondaiTitulo: '問題８ 論説文読解 (Texto Crítico y Filosófico)',
        instruccion: '次の文章を読んで、筆者の主張として最も合致するものを一つ選びなさい。',
        pasajeLectura:
          '【論説文】：言葉は単なる伝達の道具ではない。言葉こそが、私たちが世界をどのように認識し、切り取るかを規定している。異なる言語を学ぶということは、単に同じ事物に別のラベルを貼り替える作業ではなく、世界を捉え直す新しい視座を獲得することに他ならない。母語の檻から一歩外へ踏み出すことで、私たちは初めて自らの思考の限界を自覚できるのである。',
        caracterPrincipal: '筆者が考える「外国語を学ぶ真の意義」とは何か。',
        opciones: [
          '自国の言葉より優れた語彙を習得すること。',
          '世界を認識するための新しい視座を獲得し、自らの思考の枠組みを相対化すること。',
          '多くの人と素早く情報を伝達できるようになること。',
          '世界中のあらゆる事物に正確な共通のラベルを貼ること。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'El texto afirma categóricamente que aprender otro idioma es «世界を捉え直す新しい視座を獲得することに他ならない» (no es otra cosa que adquirir una nueva perspectiva para aprehender el mundo).',
        puntos: 30,
      },
      {
        id: 'n1_dk_q2',
        seccion: 'dokkai',
        mondaiNumero: 9,
        mondaiTitulo: '問題９ 主張比較 (Comprensión Comparada)',
        instruccion: '筆者の認識について正しいものを一つ選びなさい。',
        pasajeLectura:
          '【論説文】：技術の進歩は人間の労力を軽減したが、同時に「待つ」という行為に対する私たちの耐性を著しく低下させた。即時性が美徳とされる社会において、時間をかけて熟成される思考や人間関係の深みが軽視されつつあるのではないか。真の豊かさとは、スピードによって得られる利便性の中だけにあるのではない。',
        caracterPrincipal: '筆者が現代社会の傾向に対して懸念している点は何か。',
        opciones: [
          '技術の進歩が遅すぎて生活が不便なままであること。',
          '即時性を過度に重んじるあまり、時間をかけて育む思考や関係の深みが失われること。',
          '人々が待つことを好むようになり、作業能率が落ちていること。',
          '利便性が高まることで、人間関係の数が減少しつつあること。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'El autor alerta que la obsesión por la inmediatez hace que se desatienda la profundidad de las reflexiones y relaciones humanas que requieren maduración en el tiempo.',
        puntos: 30,
      },

      // --- CHOUKAI N1 ---
      {
        id: 'n1_ck_q1',
        seccion: 'choukai',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 課題理解 (Comprensión de Tareas Complejas)',
        instruccion: '音声を聞いて、話し合いの結果として正しい行動を選びなさい。',
        audioUrl: '/api/audio/ENTRENAMIENTO%20JLPT/Test%20Items/N1/Listening/Audio/N1Q1%20-%20Task-based%20comprehension.mp3',
        dialogoScript:
          '【スクリプト】：企業戦略会議で二人の幹部が話しています。\n男「次期プロジェクトの予算案ですが、研究開発費の削減案が出ています。」\n女「それは困るわ。短期的なコスト削減のために長期的な競争力を損なうわけにはいかないでしょう。」\n男「おっしゃる通りです。では、広告費と外注費の見直しから着手しましょう。」\n女「ええ、そちらの再試算を至急進めてください。」\n質問：二人は今後、どの予算を再検討することにしましたか。',
        caracterPrincipal: '二人は今後、どの予算を再検討することにしましたか。',
        opciones: [
          '研究開発費のみを大幅に削減する。',
          '広告費と外注費を再試算し見直す。',
          '新規事業の立ち上げを即時中止する。',
          'すべての部署の予算を一律10％削減する。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'La ejecutiva se opone tajantemente a reducir I+D («短期的なコスト削減のために...損なうわけにはいかない»), acordando en su lugar revisar los gastos publicitarios y de subcontratación («広告費と外注費の見直し»).',
        puntos: 30,
      },
      {
        id: 'n1_ck_q2',
        seccion: 'choukai',
        mondaiNumero: 2,
        mondaiTitulo: '問題２ 統合理解 (Comprensión Integrada)',
        instruccion: '音声を聞いて、講師の最も強調したい結論を選びなさい。',
        audioUrl: '/api/audio/ENTRENAMIENTO%20JLPT/Test%20Items/N1/Listening/Audio/N1Q2%20-%20Point%20comprehension.mp3',
        dialogoScript:
          '【スクリプト】：シンポジウムで研究者が講演しています。\n「イノベーションは決して個人の天才的な閃きだけで生まれるものではありません。異なる専門分野を持つ人々がオープンに対話し、摩擦を恐れずにアイデアを交差させる場こそが、真の変革を生み出す土壌となるのです。」\n質問：講演者が最も強調しているイノベーションの本質は何ですか。',
        caracterPrincipal: '講演者が最も強調しているイノベーションの本質は何ですか。',
        opciones: [
          '一人の天才による孤立した研究成果。',
          '異分野の専門家同士がオープンに対話しアイデアを交差させること。',
          '既存のルールを徹底的に守り続けること。',
          '資金力のある大企業のみが投資を行うこと。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'El ponente enfatiza: «異なる専門分野を持つ人々がオープンに対話し、摩擦を恐れずにアイデアを交差させる場こそが...» (la confluencia interdisciplinaria abierta).',
        puntos: 30,
      },
    ],
  },

  // ==========================================================================
  // SIMULACRO OFICIAL JLPT N3 (INTERMEDIO)
  // ==========================================================================
  exam_n3_official: {
    id: 'exam_n3_official',
    nivel: 'N3',
    titulo: 'Simulacro Oficial JLPT N3 (日本語能力試験 N3)',
    subtitulo: 'Consolidación Intermedia y Transición Natural',
    descripcion:
      'Evaluación del paso de principiante a intermedio: lectura de noticias breves, comprensión de conversaciones laborales con audios oficiales.',
    tiempoTotalMinutos: 90,
    puntajeMaximoTotal: 180,
    puntajeAprobatorio: 95,
    puntajeMinimoSeccion: 19,
    secciones: [
      {
        tipo: 'gengo_chishiki',
        nombre: 'Gengo Chishiki (言語知識)',
        subtitulo: 'Vocabulario y Gramática N3',
        puntajeMaximo: 60,
      },
      {
        tipo: 'dokkai',
        nombre: 'Dokkai (読解)',
        subtitulo: 'Comprensión de Textos y Artículos',
        puntajeMaximo: 60,
      },
      {
        tipo: 'choukai',
        nombre: 'Choukai (聴解)',
        subtitulo: 'Escucha con Audios N3',
        puntajeMaximo: 60,
      },
    ],
    preguntas: [
      {
        id: 'n3_gc_q1',
        seccion: 'gengo_chishiki',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 漢字読み (Lectura de Kanji)',
        instruccion: '＿＿の言葉の読み方として最もよいものを一つ選びなさい。',
        caracterPrincipal: '来週の会議の日程を【決定】した。',
        opciones: ['けってい (kettei)', 'けつてい (ketsutei)', 'かってい (kattei)', 'けいじょう (keijou)'],
        indiceCorrecto: 0,
        explicacion: '決定 (decisión/fijación) se lee けってい (kettei).',
        puntos: 30,
      },
      {
        id: 'n3_gc_q2',
        seccion: 'gengo_chishiki',
        mondaiNumero: 2,
        mondaiTitulo: '問題２ 文法 (Gramática)',
        instruccion: '（　）に入る最もよいものを一つ選びなさい。',
        caracterPrincipal: 'どんなに忙しくても、毎日日本語を勉強（　）。',
        opciones: ['するようにしている', 'するはずだ', 'するわけがない', 'するかもしれない'],
        indiceCorrecto: 0,
        explicacion: '〜ようにしている expresa el esfuerzo voluntario por mantener un hábito diario.',
        puntos: 30,
      },
      {
        id: 'n3_dk_q1',
        seccion: 'dokkai',
        mondaiNumero: 4,
        mondaiTitulo: '問題４ 短文読解 (Lectura Breve)',
        instruccion: '文章を読んで、質問に最も適切な答えを選びなさい。',
        pasajeLectura:
          '【お知らせ】：図書館の利用者の皆様へ。来週の月曜日は館内清掃のため、終日休館となります。返却本は入口横の返却ポストをご利用いただけますが、CDやDVDなどのAV資料は破損の恐れがあるため、火曜日以降に直接カウンターまでお持ちください。',
        caracterPrincipal: 'CDを返却したい人はどうすればよいですか。',
        opciones: [
          '月曜日に返却ポストに入れる。',
          '火曜日以降に直接カウンターに持参する。',
          '清掃スタッフに手渡す。',
          '郵送で返却する。',
        ],
        indiceCorrecto: 1,
        explicacion:
          'El aviso aclara: «CDやDVDなどのAV資料は破損の恐れがあるため、火曜日以降に直接カウンターまでお持ちください».',
        puntos: 60,
      },
      {
        id: 'n3_ck_q1',
        seccion: 'choukai',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 課題理解 (Comprensión Auditiva)',
        instruccion: '音声を聞いて、質問に答えなさい。',
        audioUrl: '/api/audio/ENTRENAMIENTO%20JLPT/Test%20Items/N3/Listening/Audio/N3Q1%20-%20Task-based%20comprehension.mp3',
        dialogoScript:
          '【スクリプト】：店員とお客さんが話しています。お客さんは何色のシャツを買うことにしましたか。\n客「すみません、このシャツの青色はありますか。」\n店員「あいにく青は売り切れておりまして、現在白と黒のみとなっております。」\n客「そうですか、じゃあ白をお願いします。」\n質問：お客さんは何色のシャツを買いますか。',
        caracterPrincipal: 'お客さんは何色のシャツを買いますか。',
        opciones: ['青色 (azul)', '白色 (blanco)', '黒色 (negro)', '赤色 (rojo)'],
        indiceCorrecto: 1,
        explicacion: 'Como el azul estaba agotado, el cliente decide comprar el blanco («白をお願いします»).',
        puntos: 60,
      },
    ],
  },

  // ==========================================================================
  // SIMULACRO OFICIAL JLPT N4 (BÁSICO SUPERIOR)
  // ==========================================================================
  exam_n4_official: {
    id: 'exam_n4_official',
    nivel: 'N4',
    titulo: 'Simulacro Oficial JLPT N4 (日本語能力試験 N4)',
    subtitulo: 'Conversación Diaria y Estilo Informal',
    descripcion:
      'Evaluación completa para afianzar el paso de N5 a N4: uso de condicionales, verbos de dar y recibir, estilo llano y audios de la vida cotidiana.',
    tiempoTotalMinutos: 80,
    puntajeMaximoTotal: 180,
    puntajeAprobatorio: 90,
    puntajeMinimoSeccion: 19,
    secciones: [
      {
        tipo: 'gengo_chishiki',
        nombre: 'Gengo Chishiki (言語知識)',
        subtitulo: 'Vocabulario y Gramática N4',
        puntajeMaximo: 60,
      },
      {
        tipo: 'dokkai',
        nombre: 'Dokkai (読解)',
        subtitulo: 'Lectura de Notas y Avisos Prácticos',
        puntajeMaximo: 60,
      },
      {
        tipo: 'choukai',
        nombre: 'Choukai (聴解)',
        subtitulo: 'Audios Oficiales de Escucha N4',
        puntajeMaximo: 60,
      },
    ],
    preguntas: [
      {
        id: 'n4_gc_q1',
        seccion: 'gengo_chishiki',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 漢字読み (Lectura de Kanji)',
        instruccion: '＿＿の言葉の読み方として最もよいものを一つ選びなさい。',
        caracterPrincipal: '角の【交差点】で友達と会いました。',
        opciones: ['こうさてん (kousaten)', 'こうざてん (kouzaten)', 'きょうさてん (kyousaten)', 'こうさでん (kousaden)'],
        indiceCorrecto: 0,
        explicacion: '交差点 (intersección/cruce) se lee こうさてん (kousaten).',
        puntos: 30,
      },
      {
        id: 'n4_gc_q2',
        seccion: 'gengo_chishiki',
        mondaiNumero: 2,
        mondaiTitulo: '問題２ 文法 (Gramática N4)',
        instruccion: '（　）に入る最もよいものを一つ選びなさい。',
        caracterPrincipal: '田中さんが私の重い荷物を運んで（　）。',
        opciones: ['くれました', 'あげました', 'もらいました', 'やりました'],
        indiceCorrecto: 0,
        explicacion: 'Cuando otra persona me ayuda a mí con un favor, se usa 〜てくれました。',
        puntos: 30,
      },
      {
        id: 'n4_dk_q1',
        seccion: 'dokkai',
        mondaiNumero: 4,
        mondaiTitulo: '問題４ 情報検索 (Búsqueda de Información)',
        instruccion: 'メモを読んで、問いに答えなさい。',
        pasajeLectura:
          '【メモ】：ゴミ出しのルール。\n・燃えるゴミ：火曜日・金曜日（朝８時まで）\n・燃えないゴミ：第２・第４水曜日\n・プラスチック：木曜日',
        caracterPrincipal: '水曜日に出せるゴミは何ですか。',
        opciones: ['燃えるゴミ', '燃えないゴミ（指定の水曜日）', 'プラスチック', '粗大ゴミ'],
        indiceCorrecto: 1,
        explicacion: 'El segundo y cuarto miércoles corresponde a 燃えないゴミ (basura no inflamable).',
        puntos: 60,
      },
      {
        id: 'n4_ck_q1',
        seccion: 'choukai',
        mondaiNumero: 1,
        mondaiTitulo: '問題１ 課題理解 (Comprensión Auditiva)',
        instruccion: '音声を聞いて、質問に答えなさい。',
        audioUrl: '/api/audio/ENTRENAMIENTO%20JLPT/Test%20Items/N4/Listening/Audio/N4Q1%20-%20Task-based%20comprehension.mp3',
        dialogoScript:
          '【スクリプト】：男の人と女の人が話しています。女の人は明日、何時に集合しますか。\n男「明日のハイキングだけど、朝８時半に駅前でいい？」\n女「もう少し早く、８時にしない？登るのに時間がかかるから。」\n男「そうだね、じゃあ８時にしよう。」\n質問：二人は明日、何時に駅前に集まりますか。',
        caracterPrincipal: '二人は明日、何時に駅前に集まりますか。',
        opciones: ['７時３０分', '８時００分', '８時３０分', '９時００分'],
        indiceCorrecto: 1,
        explicacion: 'La mujer propone a las 8:00 y el hombre acepta: «じゃあ８時にしよう».',
        puntos: 60,
      },
    ],
  },
};

