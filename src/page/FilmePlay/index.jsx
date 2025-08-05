import { useParams } from "react-router-dom";
import './style.css'
export default function FilmePlay(){
    const { id } = useParams();
    return(
        <div><iframe className="videoF"  src={` https://superflixapi.mom/filme/${id}#noLink#noEpList#transparent#color:004aad` }scrolling="no" frameborder="0" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" title="filme"></iframe></div>
    )
}
