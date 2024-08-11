import "./favoritos.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConnect";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import MenuSuspenso from "../../components/MenuSuspenso";
import { UserContext } from "../../contexts/user";
import {
  query,
  where,
  onSnapshot,
  collection,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

function Favoritos() {
  const [novo, setNovo] = useState([]);
  const { user } = useContext(UserContext);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const docRef = doc(db, "cineData", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const dadosDoFirestore = docSnap.data();
            setDados(dadosDoFirestore.favorito || []);
          } else {
            console.log("Documento não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, [user]);

  async function excluirf(itemId) {
    try {
      const novoArray = dados.filter((item) => item.id !== itemId);
      const docRef = doc(db, "cineData", user.uid);
      await updateDoc(docRef, { favorito: novoArray });
      setDados(novoArray);
      console.log("Item excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir item do array:", error);
    }
  }

  useEffect(() => {
    if (user) {
      const tarefaRef = collection(db, "cineData");

      const q = query(tarefaRef, where("userUid", "==", user.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          const data = doc.data().favorito || [];
          lista.push({ id: doc.id, data });
        });
        setNovo(lista);
      });

      return () => unsubscribe();
    }
  }, [user]);
  console.log(novo);

  return (
    <div className="PaideTodesFav">
      <Header />
      <MenuSuspenso />
      <div className="fav2">
        <h1>Filmes Salvos</h1>
      </div>
      {dados.length === 0 && (
        <span className="vaziofav">
          Voce não adicionou nenhum filme aos favoritos
        </span>
      )}
      <div className="center">
        {novo.map((n) => (
          <ul className="pai-fav-ul" key={n.id}>
            {n.data.map((item) => (
              <li key={item.id}>
                <div className="paifav">
                  <div className="imgfav">
                    {item.poster_path ? (
                      <Link to={`/filme/${item.id}`} >
                      <img
                        alt="capa-favorito"
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                      />
                        </Link>
                    ) : (
                      <p>Imagem não disponível</p>
                    )}

                 <div className="bnt-div-excluir">
                      <button
                        onClick={() => excluirf(item.id)}
                        className="buttonfav"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
               
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <MenuMobile />
    </div>
  );
}

export default Favoritos;