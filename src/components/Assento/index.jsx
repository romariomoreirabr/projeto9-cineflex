import { useState, useEffect } from "react";

import "./style.css";

export default function Assento(props) {
    // console.log("Assento foi chamado. PROPS: " + props);
    const { id, name, isAvailable } = props;
    // console.log(props.isAvailable);
    const [statusAssento, setStatusAssento] = useState(["", ""]);
    const status1 = isAvailable ? "disponivel" : "indisponivel";

    useEffect(() => {

        setStatusAssento([status1, ""]);
    }, [])

    function selecionarAssento() {
        if (statusAssento[0] === "indisponivel") {
            alert("Esse assento não está disponível!");
        } else {
            const status2 = statusAssento[1] === "" ? "selecionado" : "";
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

// export default function Assento(props) {
//     console.log("Assento foi chamado. PROPS: " + props);
//     const { id, name, isAvailable } = props;
//     console.log(props.isAvailable);
//     // const [statusAssento, setStatusAssento] = useState("");
//     let status = "disponivel";
//     if (isAvailable) {
//         status = "disponivel";
//     }
//     else {
//         status = "indisponivel";;
//     }
//     // setStatusAssento(status);
//     let classe = `assento ${status}`;
//     return (
//         <div className={classe} key={id}>
//             <p>{name}</p>
//         </div>
//     )
// }