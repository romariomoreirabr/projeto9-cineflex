import "../../assets/css/reset.css";
import "../../assets/css/style.css";

import Header from "../Header";
import Inicio from "../Inicio";
import Sessao from "../Sessao";
import Assentos from "../Assentos";


export default function App() {
    return (
        <>
            <Header />
            {/* <Inicio /> */}
            {/* <Sessao /> */}
            <Assentos />
        </>
    )
}