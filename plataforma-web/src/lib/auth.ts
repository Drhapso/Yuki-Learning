import { UserProfile, UserAccount, DeviceSyncPayload, CurriculumLevel, SRSFlashcardItem, JLPTLevel } from '../types';
import {
  loadStoredProfile,
  saveStoredProfile,
  loadStoredCurriculum,
  saveStoredCurriculum,
  loadStoredSRSDeck,
  saveStoredSRSDeck,
  getInitialCurriculum,
  resetDeviceData,
} from './storage';
import { MOCK_FLASHCARDS } from './mockData';

const AUTH_KEYS = {
  ACCOUNTS: 'yuki_registered_accounts_v1',
  SESSION: 'yuki_active_session_v1',
};

/**
 * Función criptográfica auxiliar: Hash seguro SHA-256 en el navegador
 */
export async function hashPassword(password: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    // Fallback simple si no hay Web Crypto
    return btoa(unescape(encodeURIComponent(password)));
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Carga todas las cuentas registradas en este dispositivo/navegador
 */
export function getStoredAccounts(): UserAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AUTH_KEYS.ACCOUNTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error al leer cuentas:', e);
    return [];
  }
}

/**
 * Guarda la lista de cuentas en localStorage
 */
function saveStoredAccounts(accounts: UserAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTH_KEYS.ACCOUNTS, JSON.stringify(accounts));
  } catch (e) {
    console.error('Error al guardar cuentas:', e);
  }
}

/**
 * Registra una nueva cuenta de usuario
 */
export async function registerUser({
  nombre,
  email,
  password,
  nivelInicial = 'INTRO',
  avatarUrl,
  avatarIcon = '🌸',
}: {
  nombre: string;
  email: string;
  password: string;
  nivelInicial?: JLPTLevel;
  avatarUrl?: string;
  avatarIcon?: string;
}): Promise<{ success: boolean; error?: string; user?: UserProfile }> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getStoredAccounts();

  if (accounts.some((acc) => acc.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'Ya existe una cuenta registrada con este correo electrónico.' };
  }

  const passwordHash = await hashPassword(password);
  const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const newProfile: UserProfile = {
    id: userId,
    nombre: nombre.trim(),
    email: normalizedEmail,
    avatar_url: avatarUrl,
    avatar_icon: avatarIcon,
    xp_total: 0,
    racha_actual: 1,
    racha_maxima: 1,
    meta_diaria: 20,
    nivel_actual_jlpt: nivelInicial,
    nivel_usuario: 1,
    xp_nivel_actual: 0,
    xp_proximo_nivel: 100,
  };

  const newAccount: UserAccount = {
    id: userId,
    nombre: nombre.trim(),
    email: normalizedEmail,
    passwordHash,
    avatar_url: avatarUrl,
    avatar_icon: avatarIcon,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  accounts.push(newAccount);
  saveStoredAccounts(accounts);

  // Inicializar estado limpio para esta cuenta
  const initialCurriculum = getInitialCurriculum(nivelInicial);
  const nowIso = new Date().toISOString();
  const initialDeck = MOCK_FLASHCARDS.map((c) => ({
    ...c,
    fechaProximaRevision: nowIso,
    totalAciertos: 0,
    totalFallos: 0,
  }));

  saveStoredProfile(newProfile);
  saveStoredCurriculum(initialCurriculum);
  saveStoredSRSDeck(initialDeck);

  // Guardar sesión activa
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify({ userId, email: normalizedEmail }));
  }

  return { success: true, user: newProfile };
}

/**
 * Inicia sesión con correo y contraseña
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: UserProfile }> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getStoredAccounts();
  const account = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);

  if (!account) {
    return { success: false, error: 'No se encontró ninguna cuenta registrada con este correo.' };
  }

  const hash = await hashPassword(password);
  if (account.passwordHash !== hash) {
    return { success: false, error: 'Contraseña incorrecta. Por favor, verifica tus datos.' };
  }

  // Actualizar último login
  account.lastLoginAt = new Date().toISOString();
  saveStoredAccounts(accounts);

  // Cargar perfil actual o reconstruir desde la cuenta
  let currentProfile = loadStoredProfile();
  if (!currentProfile || currentProfile.id !== account.id) {
    currentProfile = {
      id: account.id,
      nombre: account.nombre,
      email: account.email,
      avatar_url: account.avatar_url,
      avatar_icon: account.avatar_icon || '🌸',
      xp_total: currentProfile?.xp_total ?? 0,
      racha_actual: currentProfile?.racha_actual ?? 1,
      racha_maxima: currentProfile?.racha_maxima ?? 1,
      meta_diaria: currentProfile?.meta_diaria ?? 20,
      nivel_actual_jlpt: currentProfile?.nivel_actual_jlpt ?? 'INTRO',
      nivel_usuario: currentProfile?.nivel_usuario ?? 1,
      xp_nivel_actual: currentProfile?.xp_nivel_actual ?? 0,
      xp_proximo_nivel: currentProfile?.xp_proximo_nivel ?? 100,
    };
    saveStoredProfile(currentProfile);
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify({ userId: account.id, email: normalizedEmail }));
  }

  return { success: true, user: currentProfile };
}

/**
 * Cierra la sesión activa actual
 */
export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEYS.SESSION);
  }
}

/**
 * Verifica si hay una sesión activa
 */
export function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_KEYS.SESSION);
}

// ============================================================================
// SINCRONIZACIÓN Y RESPALDO CROSS-DEVICE (CÓDIGO DE TRANSFERENCIA Y MIGRACIÓN)
// ============================================================================

/**
 * Exporta todo el progreso actual del usuario a un Código de Sincronización codificado
 */
export function exportProgressSyncPayload(): string {
  const profile = loadStoredProfile();
  const curriculum = loadStoredCurriculum();
  const srsDeck = loadStoredSRSDeck();

  const payload: DeviceSyncPayload = {
    version: 1,
    timestamp: new Date().toISOString(),
    user: profile!,
    curriculum,
    srsDeck,
    checksum: `yuki_${Date.now()}`,
  };

  const jsonString = JSON.stringify(payload);
  // Codificar en Base64 seguro para copiar y pegar fácilmente
  return btoa(unescape(encodeURIComponent(jsonString)));
}

/**
 * Importa y restaura el progreso desde otro dispositivo mediante el Código de Sincronización
 */
export function importProgressSyncPayload(
  encodedData: string
): { success: boolean; error?: string; restoredProfile?: UserProfile } {
  try {
    const jsonString = decodeURIComponent(escape(atob(encodedData.trim())));
    const payload: DeviceSyncPayload = JSON.parse(jsonString);

    if (!payload.user || !payload.curriculum || !payload.srsDeck) {
      return { success: false, error: 'El código de sincronización no contiene una estructura válida.' };
    }

    // Persistir todos los datos restaurados
    saveStoredProfile(payload.user);
    saveStoredCurriculum(payload.curriculum);
    saveStoredSRSDeck(payload.srsDeck);

    // Registrar la cuenta en este dispositivo si no existía
    const accounts = getStoredAccounts();
    if (!accounts.some((a) => a.id === payload.user.id || a.email.toLowerCase() === payload.user.email.toLowerCase())) {
      accounts.push({
        id: payload.user.id,
        nombre: payload.user.nombre,
        email: payload.user.email,
        passwordHash: 'restored_sync_account',
        avatar_url: payload.user.avatar_url,
        avatar_icon: payload.user.avatar_icon,
        createdAt: payload.timestamp,
        lastLoginAt: new Date().toISOString(),
      });
      saveStoredAccounts(accounts);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify({ userId: payload.user.id, email: payload.user.email }));
    }

    return { success: true, restoredProfile: payload.user };
  } catch (err) {
    console.error('Error al importar progreso:', err);
    return { success: false, error: 'Código de sincronización corrupto o inválido. Verifica haberlo copiado completo.' };
  }
}

