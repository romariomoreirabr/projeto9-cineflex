import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Assento from "../Assento";

import "./style.css";


export default function Assentos() {
    const { idSessao } = useParams();
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;

    const [dadosAPI, setDadosAPI] = useState("");
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [nomeFormulario, setNomeFomulario] = useState("");
    const [cpfFormulario, setCpfFomulario] = useState("");

    const navigate = useNavigate();

    function buscarAssentosSelecionados(idAssento) {
        const posElementoNoArray = assentosSelecionados.findIndex(elemento => elemento === idAssento);
        console.log("Já tem? " + posElementoNoArray);
        if (posElementoNoArray === -1) { //Não existe no Array
            let arrayAssentos = [...assentosSelecionados, idAssento];
            setAssentosSelecionados(arrayAssentos);
        } else { //Existe no array
            let arrayAssentos = [...assentosSelecionados];
            arrayAssentos.splice(posElementoNoArray, 1);
            setAssentosSelecionados(arrayAssentos);
        }
    }

    function enviarDadosAPI(event) {
        event.preventDefault();
        if (nomeFormulario !== "" && cpfFormulario !== "" && assentosSelecionados.length !== 0) {
            console.log("IDs: " + assentosSelecionados);
            console.log("NAME: " + nomeFormulario);
            console.log("CPF: " + cpfFormulario);

            const objeto = {
                ids: assentosSelecionados,
                name: nomeFormulario,
                cpf: cpfFormulario
            }

            const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", objeto);
            request.then((resposta) => {

                // const informacoesSucesso = {
                //     filme: dadosAPI.movie.title,
                //     data: dadosAPI.day.date,
                //     horario:  dadosAPI.name,
                //     assentos: assentosSelecionados,
                //     nome: nomeFormulario,
                //     cpf: cpfFormulario
                // }

                console.log(resposta);
                alert("Enviado com sucesso!");
                navigate(`/sucesso/`);
                // navigate(`/sucesso/${informacoesSucesso}`);
            })
            request.catch(() => {
                alert("Ocorreu algum erro!");
            })
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
                        <input type="text" name="cpf" placeholder="Digite seu CPF..." required value={cpfFormulario}
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