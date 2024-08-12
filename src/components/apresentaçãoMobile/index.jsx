import { useState, useEffect, useRef, useContext } from "react";
import { ReactComponent as HeartA } from './icon/heart.svg';
import { ReactComponent as HeartB } from './icon/heart-fill.svg';
import {
  query,
  where,
  onSnapshot,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { db } from "../../firebaseConnect";
import ColorThief from 'colorthief';
import api from "../../services";
import './style.css';
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";

function ApresentacaoMobile() {
  const [filmeAleatorio, setFilmeAleatorio] = useState({});
  const [color, setColor] = useState("");
  const [sombra, setSombra] = useState("");
  const imageRef = useRef(null);
  const [filmeIds, setFilmeIds] = useState([]);
  const { user } = useContext(UserContext);
  
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear().toString();
  const mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
  const dia = ("0" + dataAtual.getDate()).slice(-2);
  const dataCompleta = `${ano}-${mes}-${dia}`;
  const img = `https://image.tmdb.org/t/p/original/${filmeAleatorio.poster_path}`;

  // Efeito para obter um filme aleatório
  useEffect(() => {
    const obterFilmeAleatorio = async () => {
      try {
        const resposta = await api.get("/discover/movie", {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            sort_by: "popularity.desc",
            language: "pt-BR",
            "primary_release_date.lte": dataCompleta,
            page: Math.floor(Math.random() * 100) + 1,
          },
        });

        const { results } = resposta.data;
        if (results && results.length > 0) {
          setFilmeAleatorio(results[0]);
        } else {
          console.error("Nenhum filme aleatório encontrado.");
        }
      } catch (erro) {
        console.error("Erro ao obter filme aleatório:", erro);
      }
    };

    obterFilmeAleatorio();
  }, [dataCompleta]);

  
  useEffect(() => {
    const imgElement = imageRef.current;
    if (imgElement) {
      const handleLoad = () => extractColor(imgElement);
      if (imgElement.complete) {
        handleLoad();
      } else {
        imgElement.addEventListener('load', handleLoad);
        return () => {
          imgElement.removeEventListener('load', handleLoad);
        };
      }
    }
  }, [img]);

  const extractColor = (imgElement) => {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(imgElement);
    setColor(`rgb(${color[0]},${color[1]},${color[2]})`);
    setSombra(`rgb(${color[0]},${color[1]},${color[2]}, 0.804)`);
  };

  
  useEffect(() => {
    const fetchFilmeIds = async () => {
      const userdatalhes = localStorage.getItem("@usuario");
      if (!userdatalhes) {
        console.error("Dados do usuário não encontrados no localStorage.");
        return;
      }
      const data = JSON.parse(userdatalhes);
      if (!data?.uid) {
        console.error("UID do usuário não encontrado nos dados do localStorage.");
        return;
      }

      const tarefaRef = collection(db, "cineData");
      const q = query(tarefaRef, where("userUid", "==", data?.uid));

      onSnapshot(q, (snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          const favoritoArray = doc.data().favorito;
          if (Array.isArray(favoritoArray)) {
            favoritoArray.forEach((item) => {
              if (item && item.id) {
                lista.push(item.id);
              }
            });
          }
        });
        setFilmeIds(lista);
      });
    };

    fetchFilmeIds();
  }, []);

 
  const salvarfilme = async () => {
    if (filmeIds.includes(filmeAleatorio.id)) {
      const documentoRef = doc(db, "cineData", user.uid);
      await updateDoc(documentoRef, {
        favorito: arrayRemove(filmeAleatorio)
      });
    } else {
   
      const documentoRef = doc(db, "cineData", user.uid);
      await updateDoc(documentoRef, {
        favorito: arrayUnion(filmeAleatorio)
      });
    }
  };

 
  const hasFilme = filmeIds.includes(filmeAleatorio.id);

  return (
    <div className="div-mobile-style">
      <div className="Div-img-Background" style={{ boxShadow: `0px 10px 100px 100px ${color}`, backgroundColor: color }}>
        <img
          className="imgBackground"
          ref={imageRef}
          src={img}
          alt="Poster"
          crossOrigin="anonymous"
        />
      </div>
      <div className="bnts-mobile-slide" style={{ boxShadow: `inset 0px -60px 50px 5px ${sombra}` }}>
        <div className="bnt-slide">
          <Link to={`/FilmePlay/${filmeAleatorio.id}`}>
            <button className="bnt-slide-assistir">Assistir</button>
          </Link>
        </div>
        <div className="bnt-slide">
          <button onClick={salvarfilme} className="bnt-slide-favoritos">
            <span>
              {hasFilme ? <HeartB /> : <HeartA />}
            </span>
            <span>Favoritos</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApresentacaoMobile;
