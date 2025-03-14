import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Account from "./pages/Account";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/About" element={<About />} />
            <Route path="/Account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
