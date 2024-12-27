import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../../firebaseConnect';
import './style.css';
import { UserContext } from '../../../contexts/user';

const Passo3 = () => {
  const navigate = useNavigate();
  const [end, setEnd] = useState(null);
  const [newProfileName, setNewProfileName] = useState("");
  const [availableIcons, setAvailableIcons] = useState([]);
  const { user, photo } = useContext(UserContext);

 
  useEffect(() => {
    if (photo && photo.length > 0) {
      navigate("/home");
    }
  }, [photo, navigate]);

  
  useEffect(() => {
    const fetchIcons = async () => {
      const avatarDoc = doc(db, "cineUser", "avatar");
      onSnapshot(avatarDoc, (docSnap) => {
        if (docSnap.exists()) {
          setAvailableIcons(docSnap.data().icons || []);
        }
      });
    };
    fetchIcons();
  }, []);


  
  const handleSaveProfile = async () => {
    if (!newProfileName) {
      console.log("Por favor, insira um nome para o perfil.");
      return;
    }

    const profileData = {
      userUid: user.uid,
      usuario: end || (availableIcons[0]?.url || ""),
      nome: newProfileName,
    };

    try {
 
      const userDocRef = doc(db, "cineData", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
      
        await setDoc(userDocRef, profileData);
        console.log("Perfil registrado com sucesso.");
      } else {
        console.log("O perfil já existe.");
      }
      navigate("/home");
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
    }
  };

  
 

  return (
    <div className="container-passo3">
      <div className="container-filho-passo3">
        <div className="title-passo3">
          <span>Crie seu Perfil</span>
        </div>
        <form className="form-passo3" >
          <input
            type="text"
            placeholder="Digite o nome do perfil"
            value={newProfileName}
            max={20}
            maxLength={20}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, ""); // Remove espaços
              setNewProfileName(value);
            }}
          />
        </form>
        <div className="div-pai-perfil-passo3">
          {availableIcons.map((icon, index) => (
            <div
             
              key={index}
              tabIndex={0}
              className={`div-perfil-passo3 ${end === icon.url ? 'selected' : ''}`}
              onClick={() => setEnd(icon.url)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setEnd(icon.url);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <img  src={icon.url} alt={`Icon ${index}`} />
            </div>
          ))}
        </div>
        <button className='bnt-passo3' onClick={handleSaveProfile} >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default React.memo(Passo3);
