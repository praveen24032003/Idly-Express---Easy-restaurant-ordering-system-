import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Kitchen from "./pages/Kitchen";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="backdrop-blur-xl bg-white/30 sticky top-0 z-50 shadow-lg rounded-b-xl">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <Link to="/" className="text-2xl font-bold text-white drop-shadow">
              🍽️ Idly Express
            </Link>
            <div className="flex gap-6 text-white font-medium">
              <Link to="/menu">Menu</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/kitchen">Kitchen</Link>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        </nav>

        <motion.div
          className="p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}
