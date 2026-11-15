import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

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
          <LineChart data={data} margin={{ left: 20, right: 20 }}>
            <XAxis dataKey="category" />
            <YAxis tickFormatter={v => `$${v}`} />
            <Tooltip formatter={v => [`$${v}`, "Spent"]} />
            <Line type="monotone" dataKey="amount" stroke="#e74c3c" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
