import { useLocation, useParams } from "react-router-dom";

import "./style.css";

export default function Sucesso() {
    alert("Página de Sucesso!");

    const { state } = useLocation();
    const { filme, data, horario, assentos, nome, cpf } = state;
    console.log(filme, data, horario, assentos, nome, cpf);

    // const params = useParams();
    // console.log(params);
    // const {filme, data,horario, assentos, nome, cpf} = params;

    return (
        <>
            <div className="sucesso">
                <div className="titulo"><p>Pedido feito<br />com sucesso!</p></div>
                <div className="conteudo">
                    <div className="dados">
                        <strong>Filme e sessão</strong>
                        <span>{filme}</span>
                        <span>{data} {horario}</span>
                    </div>
                    <div className="dados">
                        <strong>Ingressos</strong>
                        {
                            assentos.map((assento) => {
                                return (
                                    <span id={assento}>Assento {assento}</span>
                                )
                            })
                        }
                    </div>
                    <div className="dados">
                        <strong>Comprador</strong>
                        <span>Nome:{nome}</span>
                        <span>CPF: {cpf}</span>
                    </div>

                </div>
                <div className="botao">
                    <button>Voltar pra Home</button>
                </div>
            </div>

        </>

    )
}