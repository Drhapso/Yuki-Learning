-- ==============================================================================
-- SCHEMA SQL: PLATAFORMA DE APRENDIZAJE DE JAPONÉS (JLPT N5 - N1 + SRS)
-- Motor: PostgreSQL / Supabase Compatible
-- ==============================================================================

-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. TIPOS Y ENUMS
-- ------------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE jlpt_level_enum AS ENUM ('INTRO', 'N5', 'N4', 'N3', 'N2', 'N1');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE lesson_type_enum AS ENUM ('gramatica', 'kanji', 'vocabulario', 'escritura');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE progress_status_enum AS ENUM ('bloqueado', 'disponible', 'en_progreso', 'completado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE study_item_type_enum AS ENUM ('kanji', 'vocabulario', 'gramatica', 'expresion');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE srs_rating_enum AS ENUM ('dificil', 'bien', 'facil');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 2. TABLA: USERS (Perfiles de Usuario y Gamificación)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    xp_total INTEGER NOT NULL DEFAULT 0 CHECK (xp_total >= 0),
    racha_actual INTEGER NOT NULL DEFAULT 0 CHECK (racha_actual >= 0),
    racha_maxima INTEGER NOT NULL DEFAULT 0 CHECK (racha_maxima >= 0),
    meta_diaria INTEGER NOT NULL DEFAULT 20 CHECK (meta_diaria > 0), -- Meta en cantidad de tarjetas/XP al día
    nivel_actual_jlpt jlpt_level_enum NOT NULL DEFAULT 'N5',
    ultima_actividad TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. TABLA: LESSONS (Currículo estructurado por Niveles JLPT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nivel_jlpt jlpt_level_enum NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    tipo lesson_type_enum NOT NULL,
    orden INTEGER NOT NULL, -- Secuencia en el mapa de estudios
    xp_recompensa INTEGER NOT NULL DEFAULT 50,
    contenido_json JSONB NOT NULL DEFAULT '{}'::jsonb, 
    -- Estructura de contenido_json:
    -- {
    --   "teoria": "Explicación en Markdown",
    --   "ejemplos": [{"japones": "これは本です", "lectura": "これはほんです", "espanol": "Esto es un libro"}],
    --   "preguntas": [{"pregunta": "...", "opciones": ["..."], "correcta": 0, "audio_url": "..."}]
    -- }
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (nivel_jlpt, orden)
);

-- ------------------------------------------------------------------------------
-- 4. TABLA: USER_PROGRESS (Rastreo del Árbol de Habilidades)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_usuario UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    id_leccion UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    estado progress_status_enum NOT NULL DEFAULT 'bloqueado',
    puntaje_obtenido INTEGER DEFAULT 0 CHECK (puntaje_obtenido >= 0 AND puntaje_obtenido <= 100),
    intentos INTEGER NOT NULL DEFAULT 0,
    fecha_completado TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (id_usuario, id_leccion)
);

-- ------------------------------------------------------------------------------
-- 5. TABLA: STUDY_ITEMS (Catálogo Global de Elementos SRS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS study_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo study_item_type_enum NOT NULL,
    caracter VARCHAR(50) NOT NULL,         -- Ej: 食べる, 水, ~てもいい
    lectura VARCHAR(100) NOT NULL,         -- Ej: たべる, みず
    romaji VARCHAR(100),                   -- Ej: taberu, mizu
    significado TEXT NOT NULL,             -- Ej: Comer, Agua, Estar permitido hacer...
    significados_alternativos TEXT[] DEFAULT '{}',
    ejemplo_frase TEXT,                    -- Ej: 毎朝、水を飲みます。
    ejemplo_traduccion TEXT,               -- Ej: Cada mañana bebo agua.
    audio_url TEXT,                        -- Enlace al archivo MP3 nativo
    nivel jlpt_level_enum NOT NULL DEFAULT 'N5',
    frecuencia_orden INTEGER DEFAULT 9999, -- Orden de prioridad o frecuencia de uso
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. TABLA: USER_SRS_REVIEWS (Progreso del Sistema de Repaso Espaciado)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_srs_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_usuario UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    id_item UUID NOT NULL REFERENCES study_items(id) ON DELETE CASCADE,
    nivel_memoria INTEGER NOT NULL DEFAULT 1 CHECK (nivel_memoria BETWEEN 1 AND 9),
    -- Escala SRS (1-9):
    -- 1-3: Aprendiz (Apprentice) -> Horas / 1 día
    -- 4-6: Gurú (Guru)           -> 2 días a 2 semanas
    -- 7-8: Maestro (Master)      -> 1 mes a 4 meses
    -- 9: Dominado (Burned)       -> Retención a largo plazo (6 meses a 1 año)
    fecha_proxima_revision TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total_aciertos INTEGER NOT NULL DEFAULT 0,
    total_fallos INTEGER NOT NULL DEFAULT 0,
    racha_aciertos INTEGER NOT NULL DEFAULT 0,
    ultima_revision TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (id_usuario, id_item)
);

-- ------------------------------------------------------------------------------
-- 7. ÍNDICES DE RENDIMIENTO (Performance Queries)
-- ------------------------------------------------------------------------------
-- Búsqueda ultra-rápida de tarjetas pendientes hoy para el botón del Dashboard
CREATE INDEX IF NOT EXISTS idx_srs_due_date 
    ON user_srs_reviews(id_usuario, fecha_proxima_revision ASC);

-- Filtro por nivel de memoria SRS (para estadísticas por etapa)
CREATE INDEX IF NOT EXISTS idx_srs_memory_level 
    ON user_srs_reviews(id_usuario, nivel_memoria);

-- Búsqueda de ítems por nivel JLPT y tipo
CREATE INDEX IF NOT EXISTS idx_study_items_level_type 
    ON study_items(nivel, tipo);

-- Progreso del usuario por lección
CREATE INDEX IF NOT EXISTS idx_user_progress_status 
    ON user_progress(id_usuario, estado);

-- ------------------------------------------------------------------------------
-- 8. FUNCIONES AUXILIARES & TRIGGERS
-- ------------------------------------------------------------------------------

-- Función para actualizar el timestamp updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trigger_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trigger_user_srs_reviews_updated_at
    BEFORE UPDATE ON user_srs_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Función RPC para Supabase: Obtener conteo de tarjetas pendientes de repaso hoy
CREATE OR REPLACE FUNCTION get_srs_pending_count(user_id UUID)
RETURNS TABLE (
    total_pendientes BIGINT,
    kanji_pendientes BIGINT,
    vocabulario_pendientes BIGINT,
    gramatica_pendientes BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) AS total_pendientes,
        COUNT(*) FILTER (WHERE si.tipo = 'kanji') AS kanji_pendientes,
        COUNT(*) FILTER (WHERE si.tipo = 'vocabulario') AS vocabulario_pendientes,
        COUNT(*) FILTER (WHERE si.tipo = 'gramatica') AS gramatica_pendientes
    FROM user_srs_reviews usr
    JOIN study_items si ON usr.id_item = si.id
    WHERE usr.id_usuario = user_id
      AND usr.fecha_proxima_revision <= NOW();
END;
$$ LANGUAGE plpgsql STABLE;

-- ------------------------------------------------------------------------------
-- 9. POLÍTICAS DE SEGURIDAD (Row Level Security - Supabase RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_srs_reviews ENABLE ROW LEVEL SECURITY;

-- Catálogo de lecciones e ítems legibles para todos los usuarios autenticados
CREATE POLICY "Lecciones visibles para usuarios autenticados" 
    ON lessons FOR SELECT USING (true);

CREATE POLICY "Ítems de estudio visibles para usuarios autenticados" 
    ON study_items FOR SELECT USING (true);

-- Progreso y revisiones personales restringidas al propietario
CREATE POLICY "Usuarios pueden ver y actualizar su propio perfil" 
    ON users FOR ALL USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden gestionar su propio progreso" 
    ON user_progress FOR ALL USING (auth.uid() = id_usuario);

CREATE POLICY "Usuarios pueden gestionar sus propias revisiones SRS" 
    ON user_srs_reviews FOR ALL USING (auth.uid() = id_usuario);
