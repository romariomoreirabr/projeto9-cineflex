import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./style.css";

export default function Sessoes() {
    const { idFilme } = useParams();

    const [sessoes, setSesoes] = useState("");

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
        const promiss = axios.get(URL);
        promiss.then((resposta) => {
            setSesoes(resposta.data);
        })
    }, []);

    if (sessoes !== "") {
        const { posterURL, title, days } = sessoes;
        return (
            <>
                <div className="sessoes">
                    <div className="texto">
                        <span>Selecione o filme</span>
                    </div>
                    {
                        days.map((sessao) => {
                            const { id, weekday, date, showtimes } = sessao;
                            return (
                                <div key={id} className="sessao">
                                    <p>{weekday} - {date}</p>
                                    <div className="buttons">
                                        {showtimes.map((times) => {
                                            const { name, id } = times;
                                            return (
                                                <Link to={`/assentos/${id}`} key={id}>
                                                    <div className="button">{name}</div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <footer className="footer">
                    <figure><img src={posterURL} alt="capa do filme"></img></figure>
                    <span>{title}</span>
                </footer>
            </>
        )
    } else
        return (
            <>
                <div className="sessoes">
                    <div className="texto">
                        <span>Selecione o filme</span>
                    </div>
                </div>
            </>
        )

}