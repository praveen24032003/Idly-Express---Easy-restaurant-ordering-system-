import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeItem, updateQty } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-2xl mx-auto bg-white/40 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} x {item.qty}</span>
            <div className="flex gap-2">
              <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
              <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              <button onClick={() => removeItem(item.id)} className="text-red-600">Remove</button>
            </div>
          </div>
        ))
      )}
      <h3 className="mt-4 font-bold">Total: ₹{total}</h3>
    </div>
  );
}