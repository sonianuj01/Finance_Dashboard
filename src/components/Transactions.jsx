import React, { useState } from 'react';

export default function Transactions({ transactions, role, onAdd }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [newTx, setNewTx] = useState({ date: '', amount: '', category: '', type: 'expense' });

  const filteredData = transactions
    .filter(t => filter === 'all' ? true : t.type === filter)
    .filter(t => t.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.date || !newTx.amount || !newTx.category) return;
    onAdd({ ...newTx, amount: Number(newTx.amount) });
    setNewTx({ date: '', amount: '', category: '', type: 'expense' });
  };

  const inputClass = "p-2 border border-slate-700 rounded-md bg-[#0f172a] text-slate-200 focus:ring-2 ring-indigo-500 outline-none";

  return (
    <div className="flex flex-col gap-6">
      {role === 'admin' && (
        <form onSubmit={handleAdd} className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-slate-800 flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-xs text-slate-400">Date</label>
            <input type="date" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-xs text-slate-400">Amount</label>
            <input type="number" placeholder="0.00" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-xs text-slate-400">Category</label>
            <input type="text" placeholder="e.g. Food" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} className={inputClass} />
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition-colors h-[42px] font-medium">
            Add Entry
          </button>
        </form>
      )}

      <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} w-full sm:w-64`}
          />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={`${inputClass} w-full sm:w-48`}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-sm">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {filteredData.map(t => (
                <tr key={t.id} className="border-b border-slate-800 last:border-0 hover:bg-[#273549] transition-colors">
                  <td className="py-4 text-sm">{t.date}</td>
                  <td className="py-4 font-medium text-slate-100">{t.category}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${t.type === 'income' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-rose-900/30 text-rose-400'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-4 text-right font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-100'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}