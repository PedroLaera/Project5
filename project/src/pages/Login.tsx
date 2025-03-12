import { useParams } from "react-router";
import { useNavigate } from "react-router";
const Login = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h1>Login</h1>
      <p>Faça login para acessar o site.</p>
      <form>
        <input type="button" value="Entrar" />
        <input type="button" value="Esqueci minha senha" />
      </form>
      <br />
      <button onClick={() => navigation("/")}>Ir para Home</button>
      {id}
      <button onClick={() => navigation("/Register")}>Criar conta</button>
      {id}
    </div>
  );
};

export default Login;
