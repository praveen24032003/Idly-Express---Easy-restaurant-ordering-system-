import { useCart } from "../context/CartContext";

const sampleMenu = [
  { id: 1, name: "Idly", price: 20 },
  { id: 2, name: "Sandhagai", price: 40 },
  { id: 3, name: "Idiyappam", price: 30 },
];

export default function Menu() {
  const { addItem } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sampleMenu.map((item) => (
        <div key={item.id} className="p-6 bg-white/40 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>₹{item.price}</p>
          <button
            onClick={() => addItem(item)}
            className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}