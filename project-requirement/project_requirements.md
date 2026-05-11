# Software Requirements Specification: Personal Finance Tracker

## 1. Project Overview
The **Personal Finance Tracker** is a web-based application designed to help users manage their financial health by tracking income and expenses. The system provides a centralized dashboard for monitoring balances, categorizing transactions, and viewing historical financial data.

### 1.1 Objectives
- Provide a secure and intuitive interface for financial logging.
- Enable relational categorization of transactions.
- Deliver real-time balance calculations.
- Maintain a high standard of UI/UX following a "FinTech" aesthetic.

---

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

---

## 3. Database Schema (Schema-First Design)

### 3.1 `users` Table
Stores user credentials and profile information.
- `id` (PK, unsignedBigInteger)
- `name` (string)
- `email` (string, unique)
- `password` (string)
- `currency` (enum: ['USD', 'PHP'], default: 'USD') - *User preferred currency*
- `remember_token` (string, nullable)
- `timestamps`

### 3.2 `categories` Table
Defines types of spending and income.
- `id` (PK, unsignedBigInteger)
- `user_id` (FK: users.id, cascade) - *Ensures users have private categories*
- `name` (string)
- `type` (enum: ['income', 'expense'])
- `color` (string, nullable) - *For UI visualization*
- `timestamps`

### 3.3 `transactions` Table
Core ledger for financial entries.
- `id` (PK, unsignedBigInteger)
- `user_id` (FK: users.id, cascade)
- `category_id` (FK: categories.id, restrict)
- `amount` (decimal: 15,2)
- `date` (date)
- `description` (text, nullable)
- `timestamps`
- **Indexes**: `user_id`, `category_id`, `date`

### 3.4 `budgets` Table
Sets spending limits for categories.
- `id` (PK, unsignedBigInteger)
- `user_id` (FK: users.id, cascade)
- `category_id` (FK: categories.id, cascade)
- `amount` (decimal: 15,2)
- `period` (enum: ['weekly', 'monthly', 'yearly'])
- `start_date` (date)
- `end_date` (date, nullable)
- `timestamps`

---

## 4. Functional Requirements

### 4.1 Authentication & Security
- **Registration/Login**: Secure access via Laravel Sanctum.
- **Form Validation**: Strict server-side validation using **Laravel Form Requests** for all data entry points (Transactions, Categories, Budgets).
- **Policies**: Users can only view, edit, or delete their own transactions and categories.
- **Currency Selection**: Global state management for currency (USD/PHP) persisting to the user profile.

### 4.2 Category Management
- **CRUD**: Users can create, update, and delete their own categories.
- **Categorization**: Categories must be marked as either "Income" or "Expense".

### 4.3 Transaction Management (Core CRUD)
- **Create**: Form with amount, date, description, and a category dropdown filtered by the transaction type.
- **Read & Search**: 
    - **Pagination**: Results are paginated (10 per page) to ensure performance.
    - **Filtering**: Real-time filtering by Date Range, Category, and Transaction Type.
    - **Search**: Full-text search on transaction descriptions.
- **Update**: Modal or page to edit existing entries.
- **Delete**: Soft delete or permanent delete with confirmation.

### 4.4 Dashboard & Analytics
- **Balance Calculation**: Total Income - Total Expenses.
- **Budget Tracking**: Compare `transactions.amount` against `budgets.amount` per category.
- **Monthly Summary**: Visual breakdown of spending by category vs. budget.
- **Filters**: Filter transactions by date range or category.

---

## 5. UI/UX Specifications

### 5.1 Design Principles (FinTech Aesthetic)
- **Color Palette**:
  - Primary: `#10B981` (Emerald Green) - Positive/Income
  - Accent: `#F43F5E` (Rose Red) - Negative/Expense
  - Neutrals: `#334155` (Slate Gray) for text, `#FFFFFF` for backgrounds.
- **Typography**: Clean, sans-serif fonts (e.g., Inter or Outfit) for readability.
- **Layout**:
  - **Sidebar**: Dashboard, Transactions, Categories, Settings.
  - **Cards**: Modern elevated cards for balance summaries.
  - **Tables**: Clean, interactive tables with sorting and filtering.

### 5.2 Detailed View Specifications

#### A. Dashboard (The Financial Hub)
- **Summary Cards**:
    - **Total Balance**: Large numeric display of current net worth.
    - **Monthly Cash Flow**: Side-by-side comparison of Income (Green) and Expenses (Red).
- **Budget Performance Widget**:
    - **Burn Rate**: Progress bars for each category showing `Spent / Budgeted`.
    - **Status Indicators**: Visual cues (labels) for "On Track", "Warning", or "Over Budget".
- **Recent Activity**:
    - Mini-tables for **Latest Income** and **Latest Expenses**.
- **Charts**:
    - Doughnut chart for Expense distribution by Category.
    - Line chart for 6-month Income vs. Expense trends.

#### B. Transactions (The Ledger)
- **Data Table**:
    - Columns: Date, Description, Category (with color-coded badge), Amount (formatted with +/-), and Actions.
- **Advanced Filtering**:
    - Search by description.
    - Filter by Date Range, Category, and Transaction Type.
- **Action Modal**: Unified "Add/Edit Transaction" form with real-time validation.

#### C. Categories (Organization)
- **Category Grid**:
    - Card-based display showing Category Name, Type (Income/Expense), and assigned Color.
    - Quick Stat: Total spent in this category for the current month.
- **Management**: Easy interface to create/edit categories without leaving the page.

#### D. Settings (User Preferences)
- **Profile Management**: Update user name, email, and preferred currency (USD/PHP).
- **System Preferences**:
    - Global currency selection (Quick-toggle in Header and Profile Edit).
    - Default Budget period (Weekly vs. Monthly).
- **Data Tools**:
    - Export data to CSV/PDF.
    - Dangerous Action: "Clear All Transactions" with multi-step confirmation.

### 5.3 Micro-interactions
- Hover states on buttons and list items.
- Smooth transitions between Inertia pages.
- **Loading Skeletons**: 
    - `StatCardSkeleton`: Pulsing cards for summary stats.
    - `ChartSkeleton`: Structural outlines for analytics charts.
    - `TableSkeleton`: Placeholder rows for transaction and budget tables.

---

## 6. Implementation Roadmap

1. **Phase 1: Foundation**: Migration setup, Models with relationships, and Authentication.
2. **Phase 2: Core Logic**: Category and Transaction CRUD with Form Requests and Policies.
3. **Phase 3: Frontend**: Inertia components with React and Tailwind CSS.
4. **Phase 4: Reports**: PDF generation for monthly summaries.
5. **Phase 5: Polish**: UI refinements and final security audits.
