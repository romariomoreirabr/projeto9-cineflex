import { Link, useLocation } from "react-router-dom";

import "./style.css";

export default function Sucesso() {

    const { state } = useLocation();
    const { filme, data, horario, assentos, nome, cpf } = state;

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
                                    <span key={assento}>Assento {assento}</span>
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
                <Link to="/">
                    <div className="botao">
                        <button>Voltar pra Home</button>
                    </div>
                </Link>
            </div>
        </>
    )
}