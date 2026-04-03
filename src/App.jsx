import React, { useState } from 'react';
import Overview from './components/Overview';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import { initialTransactions } from './data/mock';
import { LayoutDashboard, Receipt, Lightbulb } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState('viewer');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeTab, setActiveTab] = useState('overview');

  const addTransaction = (newTx) => {
    setTransactions([...transactions, { ...newTx, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#1e293b] border-r border-slate-800 p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-indigo-400">FinDash</h1>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-400">Current Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-slate-700 rounded-md bg-[#0f172a] text-slate-200 outline-none focus:ring-2 ring-indigo-500"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'overview' ? 'bg-indigo-900/40 text-indigo-300 font-medium' : 'hover:bg-slate-800 text-slate-400'}`}>
            <LayoutDashboard size={20} /> Overview
          </button>
          <button onClick={() => setActiveTab('transactions')} className={`flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'transactions' ? 'bg-indigo-900/40 text-indigo-300 font-medium' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Receipt size={20} /> Transactions
          </button>
          <button onClick={() => setActiveTab('insights')} className={`flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'insights' ? 'bg-indigo-900/40 text-indigo-300 font-medium' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Lightbulb size={20} /> Insights
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'overview' && <Overview transactions={transactions} />}
        {activeTab === 'transactions' && <Transactions transactions={transactions} role={role} onAdd={addTransaction} />}
        {activeTab === 'insights' && <Insights transactions={transactions} />}
      </main>
    </div>
  );
}