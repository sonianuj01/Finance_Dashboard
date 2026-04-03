import React from 'react';

export default function Insights({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const expensesByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const sorted = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);
  const highestCategory = sorted[0] || ['None', 0];
  const incomeTotal = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-white">Spending Analytics</h3>
        <p className="text-slate-400 leading-relaxed">
          Your top expense is <span className="text-indigo-400 font-bold">{highestCategory[0]}</span>. 
          You've spent <span className="text-slate-200 font-semibold">${highestCategory[1].toLocaleString()}</span> here, 
          which is a significant portion of your monthly budget.
        </p>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-white">Savings Outlook</h3>
        <p className="text-slate-400 leading-relaxed">
          {incomeTotal > expenseTotal 
            ? "Positive cash flow detected. Your income covers your expenses with a margin of " + (incomeTotal - expenseTotal).toLocaleString() + ". Keep it up!"
            : "Warning: Expenses are currently higher than reported income. We recommend analyzing your top categories to find saving opportunities."}
        </p>
      </div>
    </div>
  );
}