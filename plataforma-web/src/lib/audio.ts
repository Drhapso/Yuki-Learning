/**
 * AUDIO ENGINE PARA YUKI LEARNING
 * 
 * Resuelve todos los fallos comunes de audio en el navegador:
 * 1. Limpieza de caracteres no fonéticos (tilde '〜', corchetes de huecos '[ ? ]', romaji entre paréntesis).
 * 2. Selección explícita de voces nativas en japonés (Google, Microsoft Haruka/Ayumi/Ichiro, Apple Kyoko/Otoya).
 * 3. Prevención de bloqueo de cola en Chrome/Edge mediante speechSynthesis.cancel() previo.
 * 4. Manejo del evento asíncrono window.speechSynthesis.onvoiceschanged.
 * 5. Efectos de sonido sintetizados con Web Audio API (Éxito, Error, Revelar tarjeta, Ganar XP).
 */

class JapaneseAudioEngine {
  private voices: SpeechSynthesisVoice[] = [];
  private japaneseVoice: SpeechSynthesisVoice | null = null;
  private audioContext: AudioContext | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  /**
   * Carga y filtra las mejores voces nativas en japonés instaladas en el sistema
   */
  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();

    // Prioridad: Voces nativas en japonés
    this.japaneseVoice =
      this.voices.find(
        (v) =>
          v.lang === 'ja-JP' ||
          v.lang === 'ja_JP' ||
          v.lang.toLowerCase().startsWith('ja')
      ) ||
      this.voices.find(
        (v) =>
          v.name.includes('Japanese') ||
          v.name.includes('日本語') ||
          v.name.includes('Haruka') ||
          v.name.includes('Ayumi') ||
          v.name.includes('Ichiro') ||
          v.name.includes('Kyoko')
      ) ||
      null;
  }

  /**
   * Inicializa AudioContext de forma segura bajo demanda
   */
  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  /**
   * Limpia el texto en japonés para pronunciación natural:
   * - Elimina ondas/tildes japonesas: '〜' o '~'
   * - Elimina Romaji explicativo entre paréntesis: '(taberu)', '(neko)'
   * - Elimina anotaciones con barra tipo '/ neko'
   * - Reemplaza huecos de ejercicio '[ ? ]' por pausas suaves
   * - Elimina puntos de okurigana '・' y guiones residuales
   */
  public cleanJapaneseText(text: string): string {
    if (!text) return '';

    return text
      // Eliminar tildes y ondas japonesas que congelan motores TTS
      .replace(/[〜~～]/g, '')
      // Eliminar romaji y notas entre paréntesis ej. (neko), (tabemasu)
      .replace(/\([a-zA-Z0-9\s\-–—/]+\)/g, '')
      .replace(/（[a-zA-Z0-9\s\-–—/]+）/g, '')
      // Eliminar anotaciones con barra tipo "/ neko" o "/ taberu"
      .replace(/\/[a-zA-Z0-9\s\-–—]+/g, '')
      // Reemplazar espacios de preguntas de opción múltiple [ ? ] por una coma o pausa breve
      .replace(/\[\s*\?\s*\]/g, '、')
      // Eliminar puntos de separación silábica de okurigana (ej. い・きる)
      .replace(/[・•]/g, '')
      // Limpiar corchetes residuales
      .replace(/[\[\]]/g, '')
      // Eliminar guiones iniciales o finales que a veces quedan de afijos ej. "-te" o "te-"
      .replace(/^[\-–—\s]+|[\-–—\s]+$/g, '')
      .trim();
  }

  /**
   * Extrae el texto fonético óptimo para pronunciar una tarjeta SRS:
   * Prioriza la lectura limpia en kana (garantizando la pronunciación exacta de la tarjeta),
   * o el carácter en kanji/japonés si no hay lectura definida.
   */
  public getCardSpeechText(card: { caracter: string; lectura?: string }): string {
    if (card.lectura) {
      const cleanKana = this.cleanJapaneseText(card.lectura);
      if (cleanKana && cleanKana.length > 0) {
        return cleanKana;
      }
    }
    return this.cleanJapaneseText(card.caracter);
  }

  /**
   * Sintetiza la pronunciación exacta de una tarjeta de repaso SRS usando el motor interno de la app (TTS)
   * garantizando que el sonido generado corresponda al carácter y lectura que se está estudiando.
   */
  public speakCard(
    card: { caracter: string; lectura?: string },
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    const speechText = this.getCardSpeechText(card);
    return this.speak(speechText, onEnd, onError);
  }

  /**
   * Resuelve la URL final del archivo de audio:
   * - Si está configurada la variable NEXT_PUBLIC_R2_AUDIO_BASE_URL (en Cloudflare Pages),
   *   redirige automáticamente las peticiones locales /api/audio/... hacia la CDN de Cloudflare R2.
   * - Si no está configurada, utiliza la ruta relativa del servidor local o la URL absoluta provista.
   */
  public resolveAudioUrl(url?: string): string | undefined {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    const r2Base = process.env.NEXT_PUBLIC_R2_AUDIO_BASE_URL;
    if (r2Base && url.startsWith('/api/audio/')) {
      const cleanBase = r2Base.replace(/\/+$/, '');
      const subpath = url.replace(/^\/api\/audio\//, '');
      const normalizedSubpath = subpath
        .replace(/^GRAMATICA\//i, 'gramatica/')
        .replace(/^ENTRENAMIENTO JLPT\//i, 'entrenamiento-jlpt/')
        .replace(/^ESCRITURA\//i, 'escritura/')
        .replace(/^VOCABULARIO\//i, 'vocabulario/');
      return `${cleanBase}/${normalizedSubpath}`;
    }

    return url;
  }

  /**
   * Reproductor Híbrido Inteligente (Opción A):
   * 1. Si existe audioUrl (archivo MP3 del repositorio o CDN Cloudflare R2), reproduce el audio nativo original.
   * 2. Si falla la carga del archivo o no se provee audioUrl, hace fallback suave e imperceptible al sintetizador TTS japonés.
   */
  public playAudio({
    text,
    audioUrl,
    onEnd,
    onError,
  }: {
    text: string;
    audioUrl?: string;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }) {
    this.stop();

    const resolvedUrl = this.resolveAudioUrl(audioUrl);

    if (resolvedUrl) {
      try {
        const audio = new Audio(resolvedUrl);
        this.currentAudioElement = audio;

        audio.onended = () => {
          this.currentAudioElement = null;
          if (onEnd) onEnd();
        };

        audio.onerror = (e) => {
          console.warn(`No se pudo cargar el archivo MP3 (${resolvedUrl}), usando fallback TTS:`, e);
          this.currentAudioElement = null;
          this.speak(text, onEnd, onError);
        };

        audio.play().catch((err) => {
          console.warn(`Reproducción de MP3 bloqueada o interrumpida (${resolvedUrl}), fallback a TTS:`, err);
          this.speak(text, onEnd, onError);
        });
        return;
      } catch (err) {
        console.warn('Error al instanciar elemento de audio, fallback a TTS:', err);
      }
    }

    this.speak(text, onEnd, onError);
  }

  /**
   * Reproduce la pronunciación nativa de una palabra u oración en japonés mediante el sintetizador interno de la app
   */
  public speak(text: string, onEnd?: () => void, onError?: (err: any) => void): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis no es soportado en este navegador.');
      return false;
    }

    const cleanText = this.cleanJapaneseText(text);
    if (!cleanText) return false;

    try {
      // 1. Reanudar si estaba pausado (evita congelamiento en móviles/Chrome)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // 2. Descongestionar cola si ya estaba hablando
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; // Velocidad pedagógica ligeramente pausada y clara
      utterance.pitch = 1.0;

      // Asegurar que las voces estén cargadas
      if (!this.japaneseVoice || this.voices.length === 0) {
        this.initVoices();
      }

      if (this.japaneseVoice) {
        utterance.voice = this.japaneseVoice;
      }

      // Prevenir recolección de basura prematura en Chromium guardando la referencia activa
      this.currentUtterance = utterance;

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (err) => {
        this.currentUtterance = null;
        console.warn('SpeechSynthesis error:', err);
        if (onError) onError(err);
      };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.error('Error al reproducir audio japonés:', err);
      this.currentUtterance = null;
      if (onError) onError(err);
      return false;
    }
  }

  /**
   * Detiene cualquier locución o archivo de audio en curso
   */
  public stop() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  // ==========================================================================
  // EFECTOS DE SONIDO SINTETIZADOS (SFX Web Audio API)
  // ==========================================================================

  /**
   * Sonido de Acierto / Respuesta Correcta (Acorde mayor brillante estilo Nintendo/Duolingo)
   */
  public playCorrectSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Acorde mayor)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.35);
    });
  }

  /**
   * Sonido de Error / Fallo (Tono suave que no aturde al usuario)
   */
  public playErrorSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Sonido al revelar tarjeta SRS (Swoosh suave)
   */
  public playFlipSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Sonido al completar una sesión o subir de nivel (Arpegio triunfal)
   */
  public playLevelUpSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [440, 554.37, 659.25, 880, 1108.73];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);

      gain.gain.setValueAtTime(0, now + i * 0.09);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.4);
    });
  }
}

// Instancia única (Singleton) para toda la aplicación
export const soundManager = new JapaneseAudioEngine();

