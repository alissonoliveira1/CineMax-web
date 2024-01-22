import { BrowserRouter,Routes,Route } from "react-router-dom";
import Filme from "./page/filme";
import Home from "./page/home";
import Header from "./components/header";
import Erro from "./page/erro";
import Favoritos from "./page/favoritos";


function Rotas(){
    return(
       
        <BrowserRouter>
        <Header/>
      
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/filme/:id" element={ <Filme/> }/>
            <Route path="*" element={<Erro/>}/>
            <Route path="/favoritos" element={<Favoritos/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Rotas;