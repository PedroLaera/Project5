import "./formLogin.css";

const FormLogin = () => {
  return (
    <div>
      <div className="card">
        <div className="left-panel">
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Senha" className="input-field" />
          <button className="login-button">Fazer Login</button>
        </div>
        <div className="right-panel">
          <button className="google-button">Google</button>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
