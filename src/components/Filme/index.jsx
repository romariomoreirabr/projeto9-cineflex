import { Link } from "react-router-dom";
import "./style.css"

export default function Filme(props) {
    const {posterURL, idFilme} = props;
    return (
        <Link to={`/sessoes/${idFilme}`}>
        <div className="filme">
            <img src={posterURL} alt="Poster filme" />
        </div>
        </Link>
    )
}