import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { formatMoney } from './format.js'

function SpendingChart({ transactions }) {
  const totals = {};
  for (const t of transactions) {
    if (t.type === "expense") totals[t.category] = (totals[t.category] || 0) + t.amount;
  }
  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ left: 20, right: 20 }}>
            <XAxis dataKey="category" />
            <YAxis tickFormatter={formatMoney} />
            <Tooltip formatter={v => [formatMoney(v), "Spent"]} />
            {/* Same red as --expense in index.css */}
            <Bar dataKey="amount" fill="#dc2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
