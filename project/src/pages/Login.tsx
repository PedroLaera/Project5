import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Header from "../components/header/Header";
import FormLogin from "../components/FormLogin/FormLogin";
import NewAccount from "../components/NewAccount/NewAccount";
//import NewAccount from "../components/NewAccount/NewAccount";
const Login = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <Header />
      <div className="container">
        <FormLogin />
      </div>
      <div>
        <button onClick={() => navigation("/")}>Ir para Home</button>
        {id}
      </div>
      <NewAccount />
    </div>
  );
};

export default Login;
