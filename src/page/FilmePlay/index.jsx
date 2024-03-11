import { useParams } from "react-router-dom";
import './style.css'
export default function FilmePlay(){
    const { id } = useParams();
    return(
        <div><iframe className="videoF" src={`https://superflixapi.top/filme/${id}#noEpList#noLink#color:919191` }scrolling="no" frameborder="0" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" ></iframe></div>
    )
}