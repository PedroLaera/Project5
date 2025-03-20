import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "./NewAccount.css";

const NewAccount = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <button onClick={() => navigation("/Register")}>Criar conta</button>
      {id}
    </div>
  );
};

export default NewAccount;
