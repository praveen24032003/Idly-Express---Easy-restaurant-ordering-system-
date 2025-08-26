import { useEffect, useState } from "react";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) => [
        ...prev,
        { id: Date.now(), item: "Idly Plate", qty: 2, status: "Pending" },
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white/40 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">👨‍🍳 Kitchen Dashboard</h2>
      {orders.map((o) => (
        <div key={o.id} className="p-4 mb-2 bg-white rounded-lg shadow-md flex justify-between">
          <span>{o.qty}x {o.item}</span>
          <span className="text-sm text-red-600">{o.status}</span>
        </div>
      ))}
    </div>
  );
}