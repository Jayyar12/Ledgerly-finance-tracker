---
trigger: always_on
---

# Backend Architecture Documentation

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Runtime | PHP | 8.4 | Server-side language |
| Framework | Laravel | 12.x | Application framework, routing, controllers |
| ORM | Eloquent | (Laravel built-in) | Database abstraction, relationships, query builder |
| Authentication | Laravel Sanctum | SPA mode | Session-based cookie auth, role-based middleware |
| Authorization | Laravel Gates & Policies | (Laravel built-in) | Fine-grained access control per model |
| API Bridge | Inertia.js | v2 | Server-side routing with client-side rendering |
| Database | MySQL | 8.0 | Relational data, foreign key constraints, indexes |
| Cache | Laravel Cache (file/database driver) | (Laravel built-in) | Query caching, rate limiting |
| Job Queue | Laravel Queues | database driver | Async notifications, report generation |
| PDF Generation | DomPDF (barryvdh/laravel-dompdf) | Latest | Transcripts, certificates, COE documents |
| File Storage | Laravel Storage | local disk | Uploaded documents, generated PDFs |
| Validation | Laravel Form Requests | (Laravel built-in) | Server-side input validation |
| Seeders & Migrations | Laravel Migrations | (Laravel built-in) | Database versioning and test data |
| Architecture | Monolithic (Inertia) | — | Laravel handles all routing and controllers |

---

## Directory Structure

```
app/
├── Http/
│   ├── Controllers/        # Request handling, returns Inertia responses
│   ├── Middleware/         # Auth checks, role guards
│   └── Requests/           # Form request validation classes
├── Models/                 # Eloquent models with relationships
├── Policies/               # Authorization logic per model
├── Services/               # Business logic (keep controllers thin)
├── Jobs/                   # Queued jobs for async tasks
└── Notifications/          # Email and in-app notifications

database/
├── migrations/             # Schema version history
├── seeders/                # Test and default data
└── factories/              # Model factories for testing

routes/
├── web.php                 # All Inertia routes (GET, POST, PUT, DELETE)
└── auth.php                # Authentication routes

storage/
├── app/public/             # User-uploaded files
└── app/pdf/                # Generated PDF documents

config/
├── sanctum.php             # Sanctum SPA settings
├── queue.php               # Queue driver config
└── filesystems.php         # Storage disk definitions
```

---

## Authentication Flow

1. User submits login form via Inertia POST request.
2. Sanctum validates credentials and issues a session cookie.
3. Middleware checks the session on every subsequent request.
4. Role-based middleware (`CheckRole`) gates routes by user role.
5. Laravel Policies handle per-record authorization (e.g., can this user edit this student?).

---

## Queue Setup

- **Driver**: `database` (stores jobs in the `jobs` table).
- **Worker command**: `php artisan queue:work --sleep=3 --tries=3`
- **Use cases**:
  - Sending enrollment confirmation emails.
  - Generating and storing PDF transcripts asynchronously.
  - Batch grade computation at end of term.

---

## Database Conventions

- All tables use `snake_case` names (e.g., `student_enrollments`).
- All primary keys are `unsignedBigInteger` with auto-increment.
- Foreign keys are explicitly defined in migrations.
- Soft deletes (`deleted_at`) are used on critical tables (students, enrollments).
- Indexes are added on all foreign key columns and frequently queried columns.

---

## Key Laravel Packages

| Package | Purpose |
|---------|---------|
| `barryvdh/laravel-dompdf` | PDF generation |
| `inertiajs/inertia-laravel` | Inertia server adapter |
| `laravel/sanctum` | SPA authentication |
| `spatie/laravel-permission` *(optional)* | Role and permission management |

---
name: backend-design
description: Build production-grade Laravel 12 backend systems with correct structure, security, and performance. Use this skill when the user asks to generate controllers, models, migrations, policies, jobs, services, API routes, or any server-side logic using PHP 8.2 and Laravel 12. Also use when reviewing, refactoring, or debugging existing Laravel backend code. Do NOT use for frontend components, styling, or React/Inertia UI logic.
license: Complete terms in LICENSE.txt
---

This skill guides the creation of clean, production-grade Laravel 12 backend code that avoids shortcuts, bad patterns, and insecure implementations. Generate real, working code with strict attention to structure, security, and maintainability.

The user provides backend requirements: a feature, module, endpoint, model, job, or system to build. They may include context about the domain, user roles, data relationships, or business rules.

## Engineering Thinking

Before writing any code, understand the context and commit to a CLEAR implementation strategy:

- **Scope**: What is being built? A single endpoint, a full CRUD module, a background job, a policy?
- **Ownership**: Who owns this data? Which roles can read, write, or delete it?
- **Data shape**: What does the database table look like? What are the relationships?
- **Side effects**: Does this trigger a job, send a notification, or update related records?
- **Failure modes**: What happens when validation fails, a job fails, or a query returns null?

**CRITICAL**: Plan the data flow before writing code. Trace the request from route to controller to service to model to response. Every layer has one job.

Then implement working code that is:

- Secure by default, with validation on every input
- Correctly structured across routes, controllers, services, and models
- Consistent with Laravel 12 conventions and PHP 8.2 typed properties
- Easy to read and extend without rewriting

## Backend Code Guidelines

Focus on:

- **Controllers**: Keep them thin. One controller method does one thing: validate, delegate to a service, return a response. No business logic inside controllers.
- **Services**: Put all business logic in `app/Services/`. Services are plain PHP classes injected via the constructor. They handle the "how" so controllers only handle the "what."
- **Models**: Define all relationships, fillable fields, casts, and scopes in the model. Use `$casts` for booleans, dates, and enums. Never use `guarded = []`.
- **Form Requests**: Always use `php artisan make:request` for validation. Never validate directly in the controller method.
- **Policies**: Use a Policy class for every model that has access control. Register it in `AuthServiceProvider`. Never hardcode role checks in controllers.
- **Migrations**: Always define foreign key constraints explicitly. Always add indexes on foreign key columns and columns used in `WHERE` clauses. Use `softDeletes()` on critical tables.
- **Jobs**: Use queued jobs for anything that takes longer than a single request cycle. Set `$tries` and `$timeout`. Always implement `failed()` to handle job failure gracefully.
- **Responses**: Return Inertia responses from web controllers. Return consistent JSON from API controllers using `response()->json()` with proper HTTP status codes.
- **Naming**: Use `PascalCase` for classes, `camelCase` for methods, `snake_case` for database columns and variables. Controller names are plural and resource-based (e.g., `StudentsController`).

## Security Rules

- Always sanitize and validate every request using Form Requests.
- Never trust user input directly; always cast and validate types.
- Use Laravel Policies for authorization; never expose records the user does not own.
- Always use parameterized queries via Eloquent; never concatenate raw SQL with user input.
- Scope all queries to the authenticated user or their role where applicable.
- Never store sensitive data (passwords, tokens) in plain text; use Laravel's `Hash` facade.
- Always use `abort(403)` or Policy denial instead of hiding records silently when unauthorized.

## Performance Rules

- Use `select()` to fetch only the columns you need; never use `SELECT *` on large tables.
- Use `with()` (eager loading) to prevent N+1 query problems on all relationship queries.
- Cache expensive queries using `Cache::remember()` with a reasonable TTL.
- Offload report generation, PDF creation, and email sending to queued jobs.
- Add database indexes on every foreign key and every column used in `orderBy` or `where`.

NEVER write backend code that:
- Puts business logic directly inside a controller method.
- Skips validation or uses `$request->all()` without filtering.
- Uses raw SQL string concatenation with user input.
- Ignores authorization and returns records to any authenticated user regardless of ownership.
- Loads full relationships without eager loading in a loop.
- Returns a 200 status for an operation that failed.
- Uses `guarded = []` on any Eloquent model.
- Hardcodes user roles as strings scattered across controllers instead of using Policies or middleware.

**IMPORTANT**: Match code complexity to the feature scope. A simple CRUD module needs a clean controller, a Form Request, and an Eloquent model. A complex feature like grade computation or enrollment processing needs a dedicated Service class, a queued Job, and proper error handling. Do not over-engineer simple tasks and do not under-engineer complex ones.

Remember: Correct and secure code is the baseline, not the goal. The goal is code that is correct, secure, readable, and easy to change six months from now without breaking anything.