import "./favoritos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebaseConnect";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import {
  query,
  where,
  onSnapshot,
  collection,
  orderBy,
} from "firebase/firestore";

function Favoritos() {
  const [novo, setnovo] = useState([]);
  const [filme, setfilme] = useState([]);
  const [users, setusers] = useState({});
  useEffect(() => {
    const minhalista = localStorage.getItem("@baflix");
    setfilme(JSON.parse(minhalista) || []);
  }, []);

  function excluirf(id) {
    let filtrofilmes = filme.filter((item) => {
      return item.id !== id;
    });
    setfilme(filtrofilmes);
    localStorage.setItem("@baflix", JSON.stringify(filtrofilmes));
    toast.success("Filme removido com sucesso!");
  }

  useEffect(() => {
    async function dadosFav() {
      const userdatalhes = localStorage.getItem("@usuario");
      setusers(JSON.parse(userdatalhes));

      if (userdatalhes) {
        const data = JSON.parse(userdatalhes);

        

        const tarefaRef = collection(db, "cineData");

        const q = query(
          tarefaRef,
     
          where("userUid", "==", data?.uid)
        );

        const unsub = onSnapshot(q, (Snapshot) => {

          let lista = [];
          Snapshot.forEach((doc) => {
            lista.push({

              favorito: doc.data().favorito
      
            });
            
          });
         setnovo(lista);
         console.log(novo)
        }); 
      }
    }
    dadosFav();
  }, []);
console.log(novo);
  return (
    <div className="PaideTodesFav">
      <Header/>
      <div className="fav2">
        <h1>Filmes Salvos</h1>
      </div>

      {novo.length === 0 && (
        <span className="vaziofav">
          Voce não adicionou nenhum filme aos favoritos
        </span>
      )}

      <div>
        <ul className="pai-fav-ul">
          {novo.map((item) => {
            return (
              <li key={item.favorito.id}>
               
                <div className="paifav"> 
                
                  <div className="imgfav">
                    <img
                      src={`https://image.tmdb.org/t/p//original/${item.favorito.backdrop_path}`}
                    />
                  </div>
                  <div>
                    <span className="titulofav2">{item.favorito.title}</span>
                  </div>
                  <div className="detalhesfav">
                    <div>
                      <Link
                        className="detalhesfavbutton2"
                        to={`/filme/${item.favorito.id}`}
                      >
                        Detalhes
                      </Link>
                    </div>
                    <div>
                      <button
                        onClick={() => excluirf(item.id)}
                        className="buttonfav"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <MenuMobile/>
    </div>
  );
}
export default Favoritos;
