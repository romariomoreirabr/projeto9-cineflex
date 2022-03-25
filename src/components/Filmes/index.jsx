import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

import Filme from "../Filme";

export default function Filmes() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const promess = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promess.then((resposta) => {
            setFilmes(resposta.data);
        })
    }, []);

    return (
        <div className="lista__filmes">
            {filmes.map((filme) => {
                return (
                    <div key={filme.id}>
                        <Filme posterURL={filme.posterURL} />
                    </div>
                );
            })}
        </div>
    )
}
