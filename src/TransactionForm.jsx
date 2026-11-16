import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);

    // Reject blank text and NaN/Infinity/zero/negative amounts; they corrupt the totals.
    const newErrors = {};
    if (!description.trim()) newErrors.description = "Please enter a description.";
    if (amount === "") newErrors.amount = "Please enter an amount.";
    else if (!Number.isFinite(value) || value <= 0) newErrors.amount = "Amount must be a number greater than 0.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: value,
      type,
      category,
      // Shift by the timezone offset so the ISO string is the local date, not UTC.
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10),
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      {/* noValidate: show our own messages instead of the browser's bubbles */}
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Description"
          aria-label="Description"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors(prev => ({ ...prev, description: undefined }));
          }}
        />
        <input
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          aria-invalid={!!errors.amount}
          aria-describedby={errors.amount ? "amount-error" : undefined}
          min="0.01"
          step="0.01"
          required
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setErrors(prev => ({ ...prev, amount: undefined }));
          }}
        />
        <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      <div role="alert">
        {errors.description && <p id="description-error" className="form-error">{errors.description}</p>}
        {errors.amount && <p id="amount-error" className="form-error">{errors.amount}</p>}
      </div>
    </div>
  );
}

export default TransactionForm
