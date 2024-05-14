import "./favoritos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConnect";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import {
  query,
  where,
  onSnapshot,
  collection,
  deleteDoc,
  doc
} from "firebase/firestore";

function Favoritos() {
  const [novo, setnovo] = useState([]);

 

  async function excluirf(id) { 
    console.log(id)
    const docRef = doc(db,"cineData", id)
   await deleteDoc(docRef)
  
    };
    
  

  useEffect(() => {
    async function dadosFav() {
      const userdatalhes = localStorage.getItem("@usuario");
   

      if (userdatalhes) {
        const data = JSON.parse(userdatalhes);

        

        const tarefaRef = collection(db, "cineData");

        const q = query(
          tarefaRef,
     
          where("userUid", "==", data?.uid)
        );

        onSnapshot(q, (Snapshot) => {

          let lista = [];
          Snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              favorito: doc.data().favorito
      
            });
            
          });
         setnovo(lista);
    
        }); 
      }
    }
    dadosFav();
  }, []);

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

      <div className="center">
        <ul className="pai-fav-ul">
          {novo.map((item) => {
            return (
              <li key={item.favorito.id}>
               
                <div className="paifav"> 
                
                  <div className="imgfav">
                    <img
                    alt="capa-favorito"
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
