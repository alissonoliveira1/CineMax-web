import { BrowserRouter,Routes,Route } from "react-router-dom";
import Filme from "./page/filme";
import Home from "./page/home";
import Header from "./components/header";
import Erro from "./page/erro";
import Favoritos from "./page/favoritos";
import Pesquisa from "./page/Pesquisa";
import Pesquisas from "./components/Pesquisas";
import Serie from "./page/Serie"
import SeriePage from "./page/SeriePage";
import FilmePag from "./page/FilmePag";
function Rotas(){
    return(
       
        <BrowserRouter>
        <Header/>
     
        <Routes>
         
            <Route path="/" element={ <Home/> }/>   
            <Route path="/Serie" element={<Serie/>}/>
            <Route path="/SeriePage/:id" element={<SeriePage/>}/>
            <Route path="/filme/:id" element={ <Filme/> }/>
            <Route path="/FilmePag/" element={ <FilmePag/> }/>
            <Route path="/Pesquisa" element={<Pesquisa/>}/>
            <Route path="/favoritos" element={<Favoritos/>}/>
            <Route path="/pesquisas" element={<Pesquisas />} />
           <Route path="/pesquisa" element={<Pesquisa />} /> 
            <Route path="*" element={<Erro/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Rotas;