import "./formLogin.css";
import { Link } from "react-router";

const FormLogin = () => {
  return (
    <div>
      <div className="card">
        <div className="left-panel">
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Senha" className="input-field" />
          <button className="login-button">
            <Link to="/">Fazer Login</Link>
          </button>
        </div>
        <div className="right-panel">
          <button className="google-button">Google</button>
        </div>
        <button>
          <Link to="/Register">Não tenho conta</Link>
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
