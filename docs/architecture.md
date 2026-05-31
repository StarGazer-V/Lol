# MedAstra AI Production Architecture

## Product scope
MedAstra AI is designed as a mobile-first, PWA-enabled, SEO-ready medical education platform for NEET PG and INI-CET preparation. It supports subject, chapter, topic, and subtopic practice across all 19 MBBS subjects; clinical MCQs; image-based questions; realistic exam simulation; analytics; subscriptions; gamification; and AI-assisted content workflows.

## Recommended stack
- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, React Query, Zod, next-seo, next-pwa, and dynamic imports for lazy loading.
- **Backend:** NestJS modular API or Supabase edge functions for smaller deployments.
- **Database:** PostgreSQL with strict constraints, indexes, full-text search, JSONB metadata, and optional pgvector for semantic duplicate detection.
- **Cache and queues:** Redis for sessions, rate-limit counters, leaderboard snapshots, question recommendations, and BullMQ background jobs.
- **Storage:** S3-compatible object storage or Supabase Storage for radiology, pathology slides, ECGs, PDFs, DOCX files, and question media.
- **AI services:** Provider-agnostic LLM gateway with prompt versioning, retrieval-augmented context, quality scoring, duplicate detection, and faculty approval.
- **Payments:** Razorpay and Stripe adapters with webhook signature verification.
- **Deployment:** Vercel for web, Docker/Kubernetes or managed containers for APIs, managed PostgreSQL, managed Redis, and CDN-backed image delivery.

## Bounded contexts
1. **Identity and access:** email login, Google OAuth, email verification, password reset, JWT access tokens, refresh token rotation, device sessions, login history, optional TOTP 2FA, RBAC, and audit logging.
2. **Curriculum:** subjects, chapters, topics, subtopics, tags, references, and content metadata for the complete MBBS hierarchy.
3. **Question bank:** stems, patient history, examination findings, investigations, diagnosis, management, media, options, answer keys, explanations, memory tricks, high-yield points, previous-year flags, estimated solving time, and AI summaries.
4. **Practice and exams:** subject-wise, chapter-wise, topic-wise, daily MCQs, weekly tests, grand tests, mocks, rapid revision, clinical scenario, previous-year, image-based, adaptive, and custom-test builder modes.
5. **Analytics:** attempts, accuracy, timing, negative marking, learning curves, weak-topic detection, heatmaps, mistake analysis, revision efficiency, percentile, rank prediction, and study-time tracking.
6. **Revision tools:** bookmarks, favorites, flashcards, notes, annotations, mistake notebook, spaced repetition, weak-topic revision, AI study plans, and automatic notes.
7. **Administration:** user, role, faculty, moderator, subscription, payment, analytics, activity log, audit log, announcement, notification, import, and content moderation tools.
8. **AI generation:** PDF/DOCX/text ingestion, MCQ generation, explanation generation, hallucination checks, duplicate detection, plagiarism prevention, quality scoring, guideline validation, and Draft → Review → Approved → Published workflow.

## Security model
- Never hardcode the Super Admin password. On initialization, read `ADMIN_PASSWORD` from the environment, hash it with bcrypt or Argon2id, and create `vishwasv2004@gmail.com` only if absent.
- Use short-lived JWT access tokens and refresh-token rotation with hashed refresh tokens in the database.
- Bind sessions to device metadata, IP risk signals, user-agent hash, and explicit logout/revoke flows.
- Enforce RBAC at route guards, service methods, row-level queries, and admin UI actions.
- Validate every request with schemas, parameterized SQL/ORM queries, CSRF tokens for cookie flows, security headers, CORS allowlists, strict file scanning, and rate limits.
- Store audit logs for authentication, imports, question publishing, payment webhooks, role changes, and admin exports.

## Performance model
- Cache subject trees, published question lists, recommendations, leaderboards, and analytics snapshots in Redis.
- Use background jobs for imports, AI generation, PDF parsing, duplicate scans, email broadcasting, webhooks, and analytics aggregation.
- Add database indexes on hierarchy keys, tags, difficulty, status, previous-year flags, created timestamps, and attempt user/test pairs.
- Use image optimization, CDN cache headers, responsive media, route-level code splitting, and streaming server rendering.

## Deployment checklist
1. Copy `.env.example` to `.env` and set strong secrets, provider keys, and `ADMIN_PASSWORD`.
2. Run PostgreSQL migrations from `database/schema.sql`.
3. Start Redis and configure queue workers.
4. Run the admin seeder during API boot.
5. Configure OAuth callbacks, Razorpay/Stripe webhooks, object storage CORS, and CDN domains.
6. Enable CI checks, vulnerability scanning, database backups, log retention, and alerting.
