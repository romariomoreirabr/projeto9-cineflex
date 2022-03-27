import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../../assets/css/reset.css";
import "../../assets/css/style.css";

import Header from "../Header";
import Inicio from "../Inicio";
import Sessoes from "../Sessoes";
import Assentos from "../Assentos";
import Sucesso from "../Sucesso";


export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/sessoes/:idFilme" element={<Sessoes />} />
                <Route path="/assentos/:idSessao" element={<Assentos />} />
                <Route path="/sucesso" element={<Sucesso />} />
            </Routes>
        </BrowserRouter>

        // <>
        //     <Header />
        //     <Inicio />
        //     {/* <Sessao /> */}
        //     {/* <Assentos /> */}
        // </>
    )
}