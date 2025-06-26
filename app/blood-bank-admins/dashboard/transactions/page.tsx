// /app/blood-bank-admins/dashboard/transactions/page.tsx
"use client";
import { useEffect, useState } from "react";

type Transaction = {
  id: string;
  type: "donation" | "purchase";
  blood_type: string;
  quantity: number;
  person_name: string;
  phone?: string;
  created_at: string;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data.transactions || []);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🧾 Transactions History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border shadow-sm text-sm bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Blood Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Person</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{tx.type}</td>
                <td className="py-2 px-4">{tx.blood_type}</td>
                <td className="py-2 px-4">{tx.quantity}</td>
                <td className="py-2 px-4">{tx.person_name}</td>
                <td className="py-2 px-4">{tx.phone || "-"}</td>
                <td className="py-2 px-4">
                  {new Date(tx.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
