import { db } from "../../firebaseConnect";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user";
import { ReactComponent as HeartA } from "../../assets/icons/heart.svg"
import { ReactComponent as HeartB } from "../../assets/icons/heart-fill.svg";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";


import api from "../../services";

const AddFav = ({ id }) => {
  const { user, apiKey } = useContext(UserContext);
  const [filme, setFilme] = useState({});
 const [favorito, setFavorito] = useState(false);


  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            append_to_response: "release_dates",
          },
        });
        setFilme(response.data);
      } catch (error) {
        console.error("Filme não encontrado:", error);
      }
    }

    if (id) {
      loadFilme();
    }
  }, [id, apiKey]);
  const docRef = doc(db, `cineData/${user.uid}/favorito/${filme.id}`);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setFavorito(true);
      } else {
        setFavorito(false);
      }
    });

    return () => unsubscribe();
  }, [id, user.uid,docRef]);
console.log('repeticao')

  const salvarFilme = async () => {
    if (!user?.uid) {
      console.error("Usuário não autenticado.");
      return;
    }

    if (!filme?.id) {
      console.error("Filme inválido.");
      return;
    }
    
    const docSnap = await getDoc(docRef);
  
   

    try {
      const documentoRef = doc(db, `cineData/${user.uid}/favorito/${filme.id}`);
      if (docSnap.exists()) {
        await deleteDoc(docRef);
        return true;
      } else {
        await setDoc(documentoRef, {
            nome: filme.title,
            sobre: filme.overview,
            categoria: filme.genres,
            poster: filme.poster_path,
            backdrop: filme.backdrop_path,
          });
    
          console.log("Filme adicionado aos favoritos:", filme.id);
        return false;
      }
     
    } catch (error) {
      console.error("Erro ao adicionar favoritos:", error);
    }
  };

  return (
    <button onClick={salvarFilme} className="bnt-page-infos">
      <span>
      {favorito ? (
            <div className="icon-name-page">
              <HeartB className="icon-salvar-page" />
              <div><span className="bnt-text-page">salvo</span></div>
            </div>
          ) : (
            <div className="icon-name-page">
              <HeartA className="icon-salvar-page" />
              <div><span className="bnt-text-page">salvar</span></div>
            </div>
          )}
      </span>
    </button>
  );
};

export default AddFav;
