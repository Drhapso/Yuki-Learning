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
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

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

        {/* Encabezado */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/20">
            {avatar}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {initialProfile ? 'Actualizar Mi Perfil' : '¡Bienvenido a NihongoPlatform!'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              {initialProfile
                ? 'Modifica tus preferencias para este dispositivo.'
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

          {/* 2. Selector de Avatar Temático */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Selecciona tu avatar:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVATARS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAvatar(item)}
                  className={`p-2.5 rounded-xl text-xl flex items-center justify-center transition-all ${
                    avatar === item
                      ? 'bg-rose-500/20 border-2 border-rose-500 scale-105 shadow-md shadow-rose-500/10'
                      : 'bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Nivel JLPT Inicial */}
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

          {/* 4. Meta Diaria de Estudio */}
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

