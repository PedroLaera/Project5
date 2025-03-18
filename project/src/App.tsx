import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shop from "./pages/Shop/Shop";

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
            <Route path="/Shop" element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
