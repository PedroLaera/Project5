import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/custom/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Teste from "./pages/teste";
import Product from "./pages/Product";
import Register from "./pages/Register";

export function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </Router>
  );
}
