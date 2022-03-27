import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Assento from "../Assento";

import "./style.css";

export default function Assentos() {
    const { idSessao } = useParams();
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;

    const [dadosAPI, setDadosAPI] = useState("");
    const [assentosSelecionados, setAssentosSelecionados] = useState({
        idAssento: [],
        nameAssento: []
    });
    const [nomeFormulario, setNomeFomulario] = useState("");
    const [cpfFormulario, setCpfFomulario] = useState("");

    const navigate = useNavigate();

    function buscarAssentosSelecionados({ idAssento, nameAssento }) {
        let arrayID = [...assentosSelecionados.idAssento];
        let arrayName = [...assentosSelecionados.nameAssento];

        const posElementoNoArray = arrayID.findIndex(elemento => elemento === idAssento);

        if (posElementoNoArray === -1) { //Não existe no Array
            arrayID.push(idAssento);
            arrayName.push(nameAssento);
            setAssentosSelecionados({ idAssento: arrayID, nameAssento: arrayName });
        } else { //Existe no array
            arrayID.splice(posElementoNoArray, 1);
            arrayName.splice(posElementoNoArray, 1);
            setAssentosSelecionados({ idAssento: arrayID, nameAssento: arrayName });
        }
    }

    function enviarDadosAPI(event) {
        event.preventDefault();
        if (nomeFormulario !== "" && cpfFormulario !== "" && assentosSelecionados.idAssento.length !== 0) {

            const objeto = {
                ids: assentosSelecionados.idAssento,
                name: nomeFormulario,
                cpf: cpfFormulario
            }

            const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", objeto);
            request.then((resposta) => {

                const informacoesSucesso = {
                    filme: dadosAPI.movie.title,
                    data: dadosAPI.day.date,
                    horario: dadosAPI.name,
                    assentos: assentosSelecionados.nameAssento,
                    nome: nomeFormulario,
                    cpf: cpfFormulario
                }

                const { filme, data, horario, assentos, nome, cpf } = informacoesSucesso;

                alert("Enviado com sucesso!");
                navigate(`/sucesso`, { state: { filme: filme, data: data, horario: horario, assentos: assentos, nome: nome, cpf: cpf } });
            });
            request.catch(() => {
                alert("Ocorreu algum erro!");
            });
        }
    }

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
                                    <Assento id={id} name={name} isAvailable={isAvailable} buscarAssentosSelecionados={buscarAssentosSelecionados} />
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
                    <form onSubmit={enviarDadosAPI}>
                        <label htmlFor="nome">Nome do comprador:</label>
                        <input type="text" name="nome" placeholder="Digite seu nome..." required value={nomeFormulario}
                            onChange={(event) => {
                                setNomeFomulario(event.target.value)
                            }}
                        />
                        <label htmlFor="cpf">CPF do comprador:</label>
                        <input type="text" name="cpf" placeholder="Digite seu CPF..." pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" maxLength="11" minLength="11" required value={cpfFormulario}
                            onChange={(event) => {
                                setCpfFomulario(event.target.value)
                            }}
                        />
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
        return (
            <>
                <div className="pagina__assentos">
                    <p>Carregando...</p>
                </div>
                <footer className="footer"></footer>
            </>
        )
    }

}