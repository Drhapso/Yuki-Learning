'use client';

import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Smartphone,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { UserProfile, JLPTLevel } from '../types';
import {
  loginUser,
  registerUser,
  exportProgressSyncPayload,
  importProgressSyncPayload,
  logoutUser,
  isUserLoggedIn,
} from '../lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  currentUser?: UserProfile;
  initialMode?: 'login' | 'register' | 'sync';
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  currentUser,
  initialMode = 'login',
  onClose,
  onAuthSuccess,
  onLogout,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'sync'>(initialMode);
  const [syncSubTab, setSyncSubTab] = useState<'export' | 'import'>('export');

  // Campos de formulario
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nivelInicial, setNivelInicial] = useState<JLPTLevel>('INTRO');
  const [avatar, setAvatar] = useState<string>('🌸');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  // Estados de transferencia y feedback
  const [syncCode, setSyncCode] = useState<string>('');
  const [inputSyncCode, setInputSyncCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await loginUser(email, password);
      if (res.success && res.user) {
        setSuccessMsg('¡Sesión iniciada con éxito! Cargando tu progreso...');
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 600);
      } else {
        setErrorMsg(res.error || 'Credenciales inválidas.');
      }
    } catch (err: any) {
      setErrorMsg('Error al conectar. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombre.trim()) {
      setErrorMsg('Por favor ingresa tu nombre de usuario.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        nombre,
        email,
        password,
        nivelInicial,
        avatarUrl,
        avatarIcon: avatar,
      });

      if (res.success && res.user) {
        setSuccessMsg('¡Cuenta creada con éxito! Tu perfil ha quedado registrado.');
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 600);
      } else {
        setErrorMsg(res.error || 'Error al crear la cuenta.');
      }
    } catch (err) {
      setErrorMsg('Error al procesar el registro.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSyncCode = () => {
    const code = exportProgressSyncPayload();
    setSyncCode(code);
    setSuccessMsg('Código de sincronización generado con todo tu progreso actual.');
  };

  const handleCopySyncCode = () => {
    if (!syncCode) return;
    navigator.clipboard.writeText(syncCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBackup = () => {
    const code = syncCode || exportProgressSyncPayload();
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yuki_learning_backup_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSyncCode = () => {
    setErrorMsg(null);
    if (!inputSyncCode.trim()) {
      setErrorMsg('Pega el código de sincronización para restaurar tu progreso.');
      return;
    }

    const res = importProgressSyncPayload(inputSyncCode);
    if (res.success && res.restoredProfile) {
      setSuccessMsg('¡Progreso restaurado con éxito! Bienvenido a Yuki Learning.');
      setTimeout(() => {
        onAuthSuccess(res.restoredProfile!);
        onClose();
      }, 700);
    } else {
      setErrorMsg(res.error || 'Código de sincronización inválido.');
    }
  };

  const handleFileAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      setErrorMsg('La imagen debe ser menor a 2.5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const userLoggedIn = isUserLoggedIn();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-rose-500/20">
            雪
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {mode === 'login' && 'Iniciar Sesión'}
            {mode === 'register' && 'Crear Nueva Cuenta'}
            {mode === 'sync' && 'Sincronizar entre Dispositivos'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Accede con tu cuenta para continuar con tu progreso.'}
            {mode === 'register' && 'Regístrate para respaldar tu racha y nivel de estudio.'}
            {mode === 'sync' && 'Transfiere tu progreso a tu teléfono celular u otro dispositivo.'}
          </p>
        </div>

        {/* Mensajes de Alerta y Notificación */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Barra de Pestañas Principales */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(null); }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'login' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(null); }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'register' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Registro
          </button>
          <button
            type="button"
            onClick={() => { setMode('sync'); setErrorMsg(null); if (!syncCode) handleGenerateSyncCode(); }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'sync' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dispositivos
          </button>
        </div>

        {/* ================================================================== */}
        {/* MODO 1: INICIAR SESIÓN                                              */}
        {/* ================================================================== */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Verificando...' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
              >
                ¿Aún no tienes cuenta? <strong className="text-indigo-400">Regístrate gratis</strong>
              </button>
            </div>
          </form>
        )}

        {/* ================================================================== */}
        {/* MODO 2: CREAR NUEVA CUENTA                                         */}
        {/* ================================================================== */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="flex items-center gap-3">
              {/* Selector de Foto o Emoji */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-2xl shadow-md overflow-hidden ring-2 ring-slate-700">
                  {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : avatar}
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[11px] font-bold text-slate-400 block">Foto de Perfil (Opcional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileAvatarChange}
                  className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Nombre o Apodo</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre de estudiante"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Contraseña (Mín. 6 caracteres)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">¿Desde dónde deseas comenzar?</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNivelInicial('INTRO')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    nivelInicial === 'INTRO'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs">Introducción</div>
                  <div className="text-[10px] text-slate-400">Hiragana & Katakana</div>
                </button>
                <button
                  type="button"
                  onClick={() => setNivelInicial('N5')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    nivelInicial === 'N5'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs">JLPT N5</div>
                  <div className="text-[10px] text-slate-400">Principiante directo</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Creando cuenta...' : 'Crear Cuenta y Comenzar'}</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        )}

        {/* ================================================================== */}
        {/* MODO 3: SINCRONIZACIÓN Y MIGRACIÓN CROSS-DEVICE                    */}
        {/* ================================================================== */}
        {mode === 'sync' && (
          <div className="space-y-4">
            {/* Subpestañas Exportar / Importar */}
            <div className="flex border-b border-slate-800">
              <button
                type="button"
                onClick={() => setSyncSubTab('export')}
                className={`flex-1 pb-2 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                  syncSubTab === 'export'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Pasar a otro dispositivo</span>
              </button>
              <button
                type="button"
                onClick={() => setSyncSubTab('import')}
                className={`flex-1 pb-2 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                  syncSubTab === 'import'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Restaurar aquí</span>
              </button>
            </div>

            {syncSubTab === 'export' ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Copia tu <strong>Código de Sincronización</strong> o descarga tu respaldo para restaurar todo tu nivel, racha y repaso SRS en tu teléfono celular o tablet:
                </p>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-[11px] text-slate-400 font-mono break-all line-clamp-3 bg-slate-900 p-2 rounded-lg">
                    {syncCode || 'Generando código seguro...'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopySyncCode}
                      className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadBackup}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Descargar archivo de respaldo .txt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40 flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Abre <strong>Yuki Learning</strong> en tu teléfono, ve a <em>Dispositivos → Restaurar aquí</em> y pega este código para continuar exactamente donde lo dejaste.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Pega aquí el código que generaste en tu otro dispositivo para restaurar tu cuenta:
                </p>

                <textarea
                  rows={4}
                  placeholder="Pega aquí tu código de sincronización..."
                  value={inputSyncCode}
                  onChange={(e) => setInputSyncCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />

                <button
                  type="button"
                  onClick={handleImportSyncCode}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restaurar Mi Progreso</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer: Cerrar sesión si está logueado */}
        {userLoggedIn && (
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Conectado como <strong className="text-slate-200">{currentUser?.nombre}</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                logoutUser();
                onLogout();
                onClose();
              }}
              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthModal;

