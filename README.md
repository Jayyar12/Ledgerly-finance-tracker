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

## 2. Technical Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | PHP | 8.2 | Server-side execution |
| **Framework** | Laravel | 12.x | Backend logic and routing |
| **Frontend Bridge** | Inertia.js | v2 | SPA-like experience with server-side routing |
| **UI Framework** | React + Tailwind CSS | Latest | Modern, responsive interface |
| **Database** | MySQL | 8.0 | Relational data storage (Name: `finance_tracker`) |
| **Auth** | Laravel Sanctum | SPA Mode | Session-based secure authentication |
| **Authorization** | Gates & Policies | Laravel Native | Fine-grained access control |
| **PDF Engine** | DomPDF | Latest | Financial report generation |
| **Queue** | Redis/Database | Laravel Queues | Background processing for reports |

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Install dependencies**:
   ```bash
   composer install
   npm install
   ```

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
