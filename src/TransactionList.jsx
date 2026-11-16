import { useState } from 'react'
import { formatMoney } from './format.js'

const formatDate = (iso) =>
  new Date(iso + "T00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select aria-label="Filter by type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select aria-label="Filter by category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th className="amount">Amount</th>
            <th><span className="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td className="date">{formatDate(t.date)}</td>
              <td>{t.description}</td>
              <td><span className="category-tag">{t.category}</span></td>
              <td className={`amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                {t.type === "income" ? "+" : "-"}{formatMoney(t.amount)}
              </td>
              <td>
                <button
                  className="delete-btn"
                  aria-label={`Delete ${t.description}`}
                  onClick={() => {
                    if (window.confirm(`Delete "${t.description}" (${formatMoney(t.amount)})?`)) onDelete(t.id);
                  }}
                >✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
