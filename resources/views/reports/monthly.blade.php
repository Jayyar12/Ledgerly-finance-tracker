<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Monthly Financial Report</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; color: #334155; line-height: 1.5; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #10B981; padding-bottom: 10px; }
        .header h1 { color: #10B981; margin: 0; }
        .header p { margin: 5px 0; color: #64748b; font-size: 14px; }
        
        .summary-box { width: 100%; margin-bottom: 30px; border-collapse: collapse; }
        .summary-box td { padding: 15px; border: 1px solid #e2e8f0; }
        .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; }
        .value { font-size: 18px; font-weight: bold; }
        .income { color: #10B981; }
        .expense { color: #F43F5E; }

        .section-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; border-left: 4px solid #10B981; padding-left: 10px; }
        
        table.data-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 12px; }
        table.data-table th { background-color: #f8fafc; text-align: left; padding: 10px; border-bottom: 2px solid #e2e8f0; }
        table.data-table td { padding: 10px; border-bottom: 1px solid #f1f5f9; }

        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #94a3b8; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Financial Report</h1>
        <p>{{ $summary['month_name'] }}</p>
        <p>Prepared for: {{ $user->name }}</p>
    </div>

    <table class="summary-box">
        <tr>
            <td>
                <div class="label">Total Income</div>
                <div class="value income">${{ number_format($summary['income'], 2) }}</div>
            </td>
            <td>
                <div class="label">Total Expense</div>
                <div class="value expense">${{ number_format($summary['expense'], 2) }}</div>
            </td>
            <td>
                <div class="label">Net Savings</div>
                <div class="value">${{ number_format($summary['income'] - $summary['expense'], 2) }}</div>
            </td>
        </tr>
    </table>

    @if(count($budgets) > 0)
    <div class="section-title">Budget Performance</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Category</th>
                <th>Limit</th>
                <th>Spent</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($budgets as $budget)
            <tr>
                <td>{{ $budget['category'] }}</td>
                <td>${{ number_format($budget['limit'], 2) }}</td>
                <td>${{ number_format($budget['spent'], 2) }}</td>
                <td style="color: {{ $budget['status'] === 'Over Budget' ? '#F43F5E' : '#10B981' }}; font-weight: bold;">
                    {{ $budget['status'] }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif

    <div class="section-title">Transactions Detail</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th style="text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $tx)
            <tr>
                <td>{{ $tx->date->format('Y-m-d') }}</td>
                <td>{{ $tx->category->name }}</td>
                <td>{{ $tx->description ?: '---' }}</td>
                <td style="text-align: right; font-weight: bold; color: {{ $tx->category->type === 'income' ? '#10B981' : '#F43F5E' }};">
                    {{ $tx->category->type === 'income' ? '+' : '-' }}${{ number_format($tx->amount, 2) }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Generated on {{ $summary['generated_at'] }} | Personal Finance Tracker
    </div>
</body>
</html>
