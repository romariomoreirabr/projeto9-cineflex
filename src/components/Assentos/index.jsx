import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Assento from "../Assento";

import "./style.css";


export default function Assentos() {
    const {idSessao} = useParams();
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;

    const [dadosAPI, setDadosAPI] = useState("");
    useEffect(() => {
        const promiss = axios.get(URL);
        promiss.then((resposta) => {
            setDadosAPI(resposta.data);
        });

    }, []);

    if (dadosAPI.length != "") {
        const { seats, movie, day, name } = dadosAPI;
        const { title, posterURL } = movie;
        const { weekday } = day;

        return (
            <>
                <div className="pagina__assentos">
                    <div className="texto">
                        <span>Selecione o(s) assento(s)</span>
                    </div>
                    <div className="assentos">
                        {seats.map(({ id, name, isAvailable }) => {
                            // console.log(id, name, isAvailable);
                            return (
                                <div key={id}>
                                    <Assento id={id} name={name} isAvailable={isAvailable} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="legendas">
                        <div className="legenda">
                            <div className="assento selecionado"></div>
                            <span>Selecionado</span>
                        </div>
                        <div className="legenda">
                            <div className="assento disponivel"></div>
                            <span>Disponível</span>
                        </div>
                        <div className="legenda">
                            <div className="assento indisponivel"></div>
                            <span>Indisponível</span>
                        </div>
                    </div>
                    <form action="">
                        <label htmlFor="nome">Nome do comprador:</label>
                        <input type="text" name="nome" placeholder="Digite seu nome..." required />
                        <label htmlFor="cpf">CPF do comprador:</label>
                        <input type="text" name="cpf" placeholder="Digite seu CPF..." required />
                        <div><button type="submit">Reservar assento(s)</button></div>
                    </form>
                </div>
                <footer className="footer">
                    <figure><img src={posterURL} alt="capa do filme"></img></figure>
                    <span>{title}<br />{weekday} - {name} </span>
                </footer>
            </>
        )

    } else {
        console.log("Eu não tenho algo a redenrizar!");
        return (
            <>
                <div className="pagina__assentos">
                    <p>Eu não tenho algo a redenrizar!</p>
                </div>
                <footer className="footer"></footer>
            </>
        )
    }

}