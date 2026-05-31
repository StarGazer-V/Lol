# API Contract Overview

Base URL: `/api/v1`

## Authentication
- `POST /auth/register` — create a student account and send verification email.
- `POST /auth/login` — email/password login with rate limiting and device registration.
- `GET /auth/google` and `GET /auth/google/callback` — Google OAuth login.
- `POST /auth/verify-email` — verify email token.
- `POST /auth/password/forgot` and `POST /auth/password/reset` — password reset flow.
- `POST /auth/refresh` — rotate refresh token.
- `POST /auth/logout` — revoke current session.
- `GET /auth/sessions` and `DELETE /auth/sessions/{id}` — device/session management.
- `POST /auth/2fa/setup`, `POST /auth/2fa/verify`, `POST /auth/2fa/disable` — optional TOTP 2FA.

## Curriculum and content
- `GET /subjects/tree` — cached 19-subject MBBS hierarchy.
- `POST /admin/subjects`, `POST /admin/chapters`, `POST /admin/topics`, `POST /admin/subtopics` — RBAC-protected curriculum CRUD.
- `GET /questions` — filter by subject, chapter, topic, difficulty, tags, mode, PYQ flag, and status.
- `POST /questions` — faculty/moderator question creation.
- `PATCH /questions/{id}` — update draft or review question.
- `POST /questions/{id}/submit-review` — Draft → Review.
- `POST /questions/{id}/approve` — Review → Approved.
- `POST /questions/{id}/publish` — Approved → Published.
- `POST /imports/questions` — CSV, Excel, JSON, PDF, or DOCX bulk import job.

## Practice and exams
- `POST /practice/custom-tests` — build subject/topic/difficulty/time filtered test.
- `POST /practice/adaptive` — generate AI adaptive question block.
- `POST /attempts` — start attempt with timer and negative marking rules.
- `POST /attempts/{id}/answers` — submit answer and receive instant explanation.
- `POST /attempts/{id}/pause`, `POST /attempts/{id}/resume`, `POST /attempts/{id}/finish` — exam controls.
- `GET /attempts/{id}/scorecard` — score, percentile, rank prediction, mistakes, and revision plan.

## AI engine
- `POST /ai/generate/questions` — generate MCQs from topic, prompt, PDF, DOCX, guideline, or reference.
- `POST /ai/review/questions/{id}` — hallucination, duplicate, plagiarism, reference, and quality checks.
- `POST /ai/study-plan` — personalized revision schedule.
- `POST /ai/doubt-solver` — safe answer assistant with citations and escalation flags.
- `POST /ai/flashcards` — automatic flashcard generation from mistakes or notes.

## Analytics, gamification, and subscriptions
- `GET /analytics/dashboard` — accuracy, heatmaps, weak topics, rank prediction, study time, and revision efficiency.
- `GET /leaderboards/weekly`, `GET /leaderboards/national`, `GET /leaderboards/college` — leaderboard snapshots.
- `GET /gamification/profile` — XP, streaks, badges, achievements.
- `POST /subscriptions/checkout` — create Razorpay or Stripe checkout.
- `POST /webhooks/razorpay`, `POST /webhooks/stripe` — signed payment webhook ingestion.
