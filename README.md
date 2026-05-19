# Ledgerly - Personal Finance Tracker

![Ledgerly Dashboard Screenshot](public/images/finance-report.png)

## Key Features

- **Dynamic Dashboard**: Real-time balance calculations, monthly income vs. expense tracking, and savings rate analysis.
- **Interactive Analytics**: Visual distribution of expenses and 6-month financial trends using custom-engineered responsive charts.
- **Global Currency Support**: Seamlessly switch between **USD ($)** and **PHP (₱)** with persistent user preferences.
- **Budget Tracking**: Set category-specific budgets and monitor burn rates with visual progress indicators.
- **Transaction Ledger**: Advanced filtering, search, and pagination for full control over your financial history.
- **Performance Caching**: Application-level caching for complex financial aggregations, reducing database load and improving perceived speed.
- **Modern UI/UX**:
    - **Soft UI Aesthetic**: A clean, premium emerald-and-slate theme.
    - **Account Onboarding**: Mandatory 3-step setup (Currency, Balance, Categories) for a seamless first-time experience.
    - **Interactive Hover States**: Premium, spring-based hover effects on cards and budgets for a reactive feel.
    - **Optimized Motion**: Butter-smooth modal transitions and hardware-accelerated (GPU) animations using Framer Motion.
    - **Dark Mode Support**: Optimized for both light and dark viewing environments.

## Technical Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime (Backend)** | PHP | `^8.4` | Server-side execution & logic |
| **Runtime (Frontend)** | Node.js | `^20.19.0` or `>=22.12.0` | Frontend build & asset bundling |
| **Framework** | Laravel | `13.x` (specifically `^13.7`) | Backend MVC framework and API layer |
| **Frontend Bridge** | Inertia.js | `v2` (specifically `^2.0`) | SPA-like experience with server-side routing |
| **UI Framework** | React | `^18.2` | Component-based modern UI |
| **Styling** | Tailwind CSS | `v4` (specifically `@tailwindcss/vite ^4.0.0`) | Utility-first responsive design framework |
| **Build Tool** | Vite | `^8.0` (specifically `^8.0.13`) | Ultra-fast frontend bundler and dev server |
| **Database** | SQLite / MySQL | SQLite (default) / MySQL `8.0+` | Relational data storage |
| **Auth** | Laravel Sanctum | `^4.0` | Secure session-based SPA authentication |
| **PDF Engine** | DomPDF | `^3.1` | Asynchronous financial report generation |
| **Motion/Animations** | Framer Motion | `^12.38` | Fluid, GPU-accelerated UI interactions |

## Prerequisites

Before setting up and running Ledgerly, please ensure your local development environment meets the following minimum requirements:

### Backend Requirements (PHP & Composer)
* **PHP**: `^8.4` (As specified in `composer.json`)
* **Composer**: `v2.x`
* **Required PHP Extensions**:
  * `openssl`, `pdo`, `mbstring`, `tokenizer`, `xml`, `ctype`, `json`
  * `dom`, `gd` (Required for PDF template and image processing via **DomPDF**)
* **Database**:
  * **SQLite** (Default; standard for modern Laravel development)
  * **MySQL** `8.0+` or **PostgreSQL** (Optional; configure credentials via `.env`)

### Frontend Requirements (Node.js & NPM)
* **Node.js**: `^20.19.0` or `>=22.12.0` (Required due to `@tailwindcss/oxide` and `@rolldown` bindings in `package-lock.json`)
* **NPM**: `v10.x` or higher

## Installation


1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jayyar12/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Install dependencies**:
   ```bash
   composer install
   npm install --legacy-peer-deps
   ```
   > [!NOTE]
   > The `--legacy-peer-deps` flag is required during `npm install` to bypass strict peer-dependency version conflicts between cutting-edge frontend libraries (like Tailwind CSS v4, Vite 8, and React 18).


3. **Environment Setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Configure your database settings in the `.env` file.*

4. **Run Migrations & Seeders**:
   ```bash
   php artisan migrate --seed
   ```

5. **Start the development server**:
   ```bash
   php artisan serve
   npm run dev
   ```

## Project Structure

- `app/Http/Controllers`: Backend logic handling dashboard data, transactions, and user profiles.
- `app/Models`: Relational database models (User, Category, Transaction, Budget).
- `resources/js/Pages`: React components for Dashboard, Ledger, and Settings.
- `database/migrations`: Normalized database schema with foreign key constraints and indexes.

## Security & Performance

- **Authorization**: Granular access control using Laravel Policies (Users can only access their own data).
- **Validation**: Strict input sanitization via Laravel Form Requests.
- **Performance**:
    - **Application Caching**: Dashboard statistics are cached for 60 minutes using user-specific keys.
    - **Automated Invalidation**: Uses Eloquent Observers (`TransactionObserver`, `BudgetObserver`, `CategoryObserver`) to instantly clear stale cache when data is modified.
    - **Eager Loading**: Prevents N+1 query issues across all relationships.
    - **Asset Optimization**: Optimized Vite/Rolldown builds for fast frontend delivery.

---
Built with ❤️ by [Jay Guiroy](https://github.com/jay-guiroy)
