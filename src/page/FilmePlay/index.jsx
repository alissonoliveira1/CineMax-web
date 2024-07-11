import { useParams } from "react-router-dom";
import './style.css'
export default function FilmePlay(){
    const { id } = useParams();
    return(
        <div><iframe className="videoF"  src={`https://embedder.net/e/${id}` }scrolling="no" frameborder="0" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" title="filme"></iframe></div>
    )
}