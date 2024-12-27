import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConnect";
import { query, where, onSnapshot, collection } from "firebase/firestore";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY || "";

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      if (usuario) {
        fetchUserPhotos(usuario.uid); // Busca fotos ao autenticar
      } else {
        setPhoto([]);
      }
    });

    return () => unsubscribeAuth(); // Limpeza ao desmontar
  }, []);

  // Função para buscar fotos do Firebase
  const fetchUserPhotos = (userUid) => {
    const tarefaRef = collection(db, "cineData");
    const q = query(tarefaRef, where("userUid", "==", userUid));

    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        nome: doc.data().nome,
        usuario: doc.data().usuario,
        favorito: doc.data().favorito,
      }));
      setPhoto(lista);
    });

    return unsubscribeSnapshot; // Retorna para limpeza posterior, se necessário
  };

  const authStatus = user ? user.emailVerified : null;

  const login = (userdata) => {
    setUser(userdata);
  };

  const logout = () => {
    setUser(null);
    setPhoto([]); // Limpa fotos ao deslogar
  };

  return (
    <UserContext.Provider value={{ authStatus, apiKey, photo, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
