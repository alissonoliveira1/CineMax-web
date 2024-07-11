import { useParams } from "react-router-dom";

import './style.css'
//<iframe className="videoF" src={`https://superflixapi.top/serie/${id}/${selectedSeason}/${eps2}#noLink#noEpList#color:919191`}  ></iframe>

function Play() {
  const { id, season_number, episode_number } = useParams();

  return (
    <div>
      <iframe
        className="videoF"
        title="play"
        src={`https://embedder.net/e/${id}/${season_number}/${episode_number}`}
        scrolling="no"
        frameborder="0"
        allowfullscreen=""
        webkitallowfullscreen=""
        mozallowfullscreen=""
      ></iframe>
    </div>
  );
}
export default Play;
