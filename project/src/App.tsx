import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Suport from "./pages/Suport/Suport";
import Product from "./pages/Product/Product";

import "./index.css";

function App() {
  return (
    <div className="general">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Suport" element={<Suport />} />
            <Route path="/About" element={<About />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Product/:id" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
