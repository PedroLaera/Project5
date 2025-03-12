import { Link } from "react-router";
import Header from "../components/header/Header";

const About = () => {
  return (
    <div>
      <Header />
      <h1>Desenvolvedores</h1>
      <button>
        <Link to="https://github.com/PedroLaera/Project5">GitHub</Link>
      </button>
    </div>
  );
};

export default About;
