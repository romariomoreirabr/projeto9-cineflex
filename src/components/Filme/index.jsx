import "./style.css"

export default function Filme(props) {
    const {posterURL} = props;
    return (
        <div className="filme">
            <img src={posterURL} alt="Poster filme" />
        </div>
    )
}