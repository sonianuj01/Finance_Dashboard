import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Overview({ transactions }) {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expenses;

  let currentBalance = 0;
  const trendData = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date)).map(t => {
    currentBalance += t.type === 'income' ? t.amount : -t.amount;
    return { date: t.date, balance: currentBalance };
  });

  const pieData = Object.entries(
    transactions.filter(t => t.type === 'expense').reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Total Balance</p>
          <h2 className="text-3xl font-bold text-white">${balance.toLocaleString()}</h2>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Total Income</p>
          <h2 className="text-3xl font-bold text-emerald-400">+${income.toLocaleString()}</h2>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Total Expenses</p>
          <h2 className="text-3xl font-bold text-rose-400">-${expenses.toLocaleString()}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 h-96">
          <h3 className="font-semibold text-slate-200 mb-6">Balance Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} itemStyle={{color: '#f1f5f9'}} />
              <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 h-96">
          <h3 className="font-semibold text-slate-200 mb-6">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}