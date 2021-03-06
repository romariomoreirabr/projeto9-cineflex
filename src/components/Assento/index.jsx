import { useState, useEffect } from "react";

import "./style.css";

export default function Assento(props) {
    const { id, name, isAvailable, buscarAssentosSelecionados } = props;
    const [statusAssento, setStatusAssento] = useState(["", ""]);
    const status1 = isAvailable ? "disponivel" : "indisponivel";

    useEffect(() => {
        setStatusAssento([status1, ""]);
    }, [])

    function selecionarAssento() {
        if (statusAssento[0] === "indisponivel") {
            alert("Esse assento não está disponível!");
        } else {
            let status2 = "";
            if (statusAssento[1] === "") {
                status2 = "selecionado";
                buscarAssentosSelecionados({ idAssento: id, nameAssento: name });
            } else {
                status2 = "";
                buscarAssentosSelecionados({ idAssento: id, nameAssento: name });
            }
            setStatusAssento([status1, status2]);
        }
    }
    const [var1, var2] = statusAssento;
    let classe = `assento ${var1} ${var2}`;

    return (
        <div className={classe} onClick={() => { selecionarAssento() }}>
            <p>{name}</p>
        </div>
    )
}