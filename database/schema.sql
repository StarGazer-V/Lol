CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('STUDENT', 'MODERATOR', 'FACULTY', 'SUPER_ADMIN');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE subscription_tier AS ENUM ('FREE', 'STANDARD', 'PREMIUM');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name user_role UNIQUE NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  action text UNIQUE NOT NULL,
  description text
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email citext UNIQUE NOT NULL,
  password_hash text,
  full_name text,
  role_id uuid NOT NULL REFERENCES roles(id),
  email_verified_at timestamptz,
  two_factor_secret text,
  two_factor_enabled boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS device_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token_hash text NOT NULL,
  device_fingerprint text NOT NULL,
  ip_address inet,
  user_agent text,
  revoked_at timestamptz,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS login_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  email citext NOT NULL,
  success boolean NOT NULL,
  ip_address inet,
  user_agent text,
  failure_reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}',
  ip_address inet,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  UNIQUE(subject_id, slug)
);

CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  UNIQUE(chapter_id, slug)
);

CREATE TABLE IF NOT EXISTS subtopics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  UNIQUE(topic_id, slug)
);

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id uuid NOT NULL REFERENCES subjects(id),
  chapter_id uuid REFERENCES chapters(id),
  topic_id uuid REFERENCES topics(id),
  subtopic_id uuid REFERENCES subtopics(id),
  stem text NOT NULL,
  patient_history text,
  examination_findings text,
  investigations text,
  diagnosis text,
  management text,
  detailed_explanation text NOT NULL,
  memory_trick text,
  high_yield_points text[],
  references jsonb NOT NULL DEFAULT '[]',
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Hard')),
  estimated_seconds int NOT NULL DEFAULT 60,
  previous_year_exam text,
  tags text[] NOT NULL DEFAULT '{}',
  ai_summary text,
  ai_quality_score numeric(5,2),
  duplicate_group_id uuid,
  status content_status NOT NULL DEFAULT 'DRAFT',
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS question_options (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  label char(1) NOT NULL,
  body text NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  explanation text NOT NULL,
  UNIQUE(question_id, label)
);

CREATE TABLE IF NOT EXISTS question_media (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  media_type text NOT NULL CHECK (media_type IN ('IMAGE', 'RADIOLOGY', 'PATHOLOGY_SLIDE', 'ECG', 'TABLE', 'GRAPH', 'PDF')),
  storage_url text NOT NULL,
  alt_text text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  mode text NOT NULL,
  negative_marks numeric(4,2) NOT NULL DEFAULT 1.00,
  duration_seconds int NOT NULL,
  status content_status NOT NULL DEFAULT 'DRAFT',
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS test_questions (
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  PRIMARY KEY (test_id, question_id)
);

CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_id uuid REFERENCES tests(id) ON DELETE SET NULL,
  mode text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  paused_seconds int NOT NULL DEFAULT 0,
  score numeric(8,2),
  percentile numeric(5,2),
  predicted_rank int,
  metadata jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS attempt_answers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id uuid NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id),
  selected_option_id uuid REFERENCES question_options(id),
  is_correct boolean NOT NULL,
  time_spent_seconds int NOT NULL,
  marked_for_revision boolean NOT NULL DEFAULT false,
  answered_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(attempt_id, question_id)
);

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookmarks (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE SET NULL,
  front text NOT NULL,
  back text NOT NULL,
  due_at timestamptz NOT NULL DEFAULT now(),
  interval_days int NOT NULL DEFAULT 1,
  ease_factor numeric(4,2) NOT NULL DEFAULT 2.50
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL DEFAULT 'FREE',
  provider text,
  provider_subscription_id text,
  active_from timestamptz NOT NULL DEFAULT now(),
  active_until timestamptz
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('RAZORPAY', 'STRIPE')),
  provider_payment_id text UNIQUE NOT NULL,
  amount_cents int NOT NULL,
  currency char(3) NOT NULL,
  status text NOT NULL,
  raw_payload jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  channel text NOT NULL DEFAULT 'IN_APP',
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_generation_jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  requested_by uuid REFERENCES users(id) ON DELETE SET NULL,
  source_type text NOT NULL,
  source_uri text,
  prompt text,
  model text NOT NULL,
  status text NOT NULL DEFAULT 'QUEUED',
  quality_report jsonb NOT NULL DEFAULT '{}',
  created_question_ids uuid[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_questions_subject_status ON questions(subject_id, status);
CREATE INDEX IF NOT EXISTS idx_questions_topic_difficulty ON questions(topic_id, difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_tags ON questions USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_attempts_user_started ON attempts(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_created ON audit_logs(actor_id, created_at DESC);
