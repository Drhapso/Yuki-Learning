'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  User,
  GraduationCap,
  Flame,
  Check,
  X,
  Camera,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { UserProfile, JLPTLevel } from '../types';

interface ProfileSetupModalProps {
  initialProfile?: UserProfile | null;
  isOpen: boolean;
  canCancel?: boolean;
  onSave: (newProfile: UserProfile) => void;
  onClose?: () => void;
}

const AVATARS = ['🦊', '🌸', '🍙', '🏯', '🐱', '🍵', '⛩️', '🎏', '🔥', '🎋'];

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  initialProfile,
  isOpen,
  canCancel = false,
  onSave,
  onClose,
}) => {
  const [nombre, setNombre] = useState(initialProfile?.nombre || '');
  const [nivelJLPT, setNivelJLPT] = useState<JLPTLevel>(initialProfile?.nivel_actual_jlpt || 'INTRO');
  const [metaDiaria, setMetaDiaria] = useState<number>(initialProfile?.meta_diaria || 20);
  const [avatar, setAvatar] = useState<string>(initialProfile?.avatar_icon || '🦊');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialProfile?.avatar_url);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setError('La fotografía seleccionada debe pesar menos de 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      setAvatarUrl(base64);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('Por favor, ingresa tu nombre o apodo para continuar.');
      return;
    }

    const nuevoPerfil: UserProfile = {
      id: initialProfile?.id || `usr_${Date.now()}`,
      nombre: nombre.trim(),
      email: initialProfile?.email || `${nombre.toLowerCase().replace(/\s+/g, '')}@nihongo.local`,
      avatar_icon: avatar,
      avatar_url: avatarUrl,
      xp_total: initialProfile?.xp_total ?? 0,
      racha_actual: initialProfile?.racha_actual ?? 1,
      racha_maxima: initialProfile?.racha_maxima ?? 1,
      meta_diaria: metaDiaria,
      nivel_actual_jlpt: nivelJLPT,
      nivel_usuario: initialProfile?.nivel_usuario ?? 1,
      xp_nivel_actual: initialProfile?.xp_nivel_actual ?? 0,
      xp_proximo_nivel: initialProfile?.xp_proximo_nivel ?? 100,
    };

    onSave(nuevoPerfil);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Botón cerrar si es opcional */}
        {canCancel && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Encabezado con Vista Previa del Avatar / Fotografía */}
        <div className="text-center space-y-2">
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-4xl shadow-lg shadow-rose-500/20 overflow-hidden ring-2 ring-slate-700">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                avatar
              )}
            </div>
            {avatarUrl && (
              <button
                type="button"
                onClick={() => setAvatarUrl(undefined)}
                className="absolute -top-1 -right-1 p-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-md"
                title="Eliminar foto y usar icono"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {initialProfile ? 'Actualizar Mi Perfil' : '¡Bienvenido a NihongoPlatform!'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              {initialProfile
                ? 'Modifica tu fotografía, nombre y preferencias para este dispositivo.'
                : 'Crea tu perfil en este dispositivo para empezar tu aprendizaje personalizado.'}
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Nombre / Apodo */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-400" />
              <span>¿Cómo te llamas o cómo deseas que te llamemos?</span>
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ej. Juan, María, Tanaka..."
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold transition-all"
              autoFocus
            />
            {error && <p className="text-xs text-rose-400 font-semibold">{error}</p>}
          </div>

          {/* 2. Carga de Fotografía Personal */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-indigo-400" />
              <span>Fotografía o Imagen de Perfil:</span>
            </label>
            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>{avatarUrl ? 'Cambiar fotografía...' : 'Subir imagen desde tu equipo'}</span>
                <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
              </label>
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl(undefined)}
                  className="py-2.5 px-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 hover:bg-rose-900/60 text-xs font-semibold transition-colors"
                >
                  Quitar foto
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-400">
              Sube tu propia foto (JPG, PNG o WebP, máx. 3MB) o elige uno de los avatares temáticos debajo.
            </p>
          </div>

          {/* 3. Selector de Avatar Temático Japonés */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              O elige un avatar japonés:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVATARS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setAvatar(item);
                    setAvatarUrl(undefined); // Si elige emoji, deselecciona la foto
                  }}
                  className={`p-2.5 rounded-xl text-xl flex items-center justify-center transition-all ${
                    !avatarUrl && avatar === item
                      ? 'bg-rose-500/20 border-2 border-rose-500 scale-105 shadow-md shadow-rose-500/10'
                      : 'bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Nivel JLPT Inicial */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nivel inicial de inicio:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNivelJLPT('INTRO')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  nivelJLPT === 'INTRO'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-indigo-400">Desde Cero (Intro)</div>
                <div className="text-[11px] text-slate-400">Hiragana y Katakana</div>
              </button>

              <button
                type="button"
                onClick={() => setNivelJLPT('N5')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  nivelJLPT === 'N5'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-rose-400">Básico (JLPT N5)</div>
                <div className="text-[11px] text-slate-400">Partículas y primeros kanjis</div>
              </button>
            </div>
          </div>

          {/* 5. Meta Diaria de Estudio */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Meta diaria de tarjetas:</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 10, label: 'Ligero', time: '~5 min' },
                { count: 20, label: 'Recomendado', time: '~10 min' },
                { count: 35, label: 'Intensivo', time: '~20 min' },
              ].map((tier) => (
                <button
                  key={tier.count}
                  type="button"
                  onClick={() => setMetaDiaria(tier.count)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    metaDiaria === tier.count
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-sm font-black text-emerald-400">{tier.count}</div>
                  <div className="text-[10px] font-bold text-slate-200">{tier.label}</div>
                  <div className="text-[9px] text-slate-500">{tier.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-rose-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>{initialProfile ? 'Guardar Cambios' : 'Crear Mi Perfil y Comenzar'}</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ProfileSetupModal;
