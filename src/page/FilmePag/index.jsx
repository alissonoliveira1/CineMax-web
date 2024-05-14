import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from '../../services'
import './style.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as Left } from "./icon/left.svg";
import { ReactComponent as Right } from "./icon/right.svg";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";

function FilmePag(){
const [desc,setdesc] = useState([])
const [acao, setacao] = useState([])
const [slide, setslide] = useState([])
const [load, setload] = useState(true)
const [horror,sethorror] = useState([])
const [comedia,setcomedia] = useState([])
const [animation,setanimation] = useState([])
const [fantasia,setfantasia] = useState([])
const [romance,setromance] = useState([])
const apiKey = '9f4ef628222f7685f32fc1a8eecaae0b'
const ac_av = [12,28]
const ro_su = [10749,18]
const fc_fn = [14,878]
const tr_su = [9648,27]
let dataAtual = new Date();
let ano = dataAtual.getFullYear().toString();
let mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2); 
let dia = ('0' + dataAtual.getDate()).slice(-2); 
let dataCompleta = `${ano}-${mes}-${dia}`;

useEffect(()=>{
    const data = async () =>{
        try{
            const dados = await api.get('discover/movie',{
                params:{
                  api_key:apiKey,
                  with_genres: 16,
                  'primary_release_date.lte': dataCompleta,
                  language: 'pt-br',
                  page:1
                }
            })
            setdesc(dados.data.results)
           
            const dados2 = await api.get('discover/movie',{
                params:{
                    api_key:apiKey,
                    'primary_release_date.lte': dataCompleta,
                    with_genres:ac_av.join(','),
                    language: 'pt-br',
                    page:1,
                }
            })
            
            setacao(dados2.data.results)

            const dados3 = await api.get('discover/movie',{
                params:{
                    api_key:apiKey,
                    language: 'pt-br',
                    'primary_release_date.lte': dataCompleta,
                    sort_by: "popularity.desc",
                    page:Math.floor(Math.random() * 100) + 1,
                }
            })
            const {results} = dados3.data
            if(results && results.length > 0){
                const FilmeSlide = results[0]
                setslide(FilmeSlide)
            }else{
                console.log("nenhum filme encontrado")
            }

            const dados4 = await api.get('discover/movie',{
                params:{
                    api_key:apiKey,
                    with_genres:tr_su.join(','),
                    'primary_release_date.lte': dataCompleta,
                    language: 'pt-br',
                    page:1,
                }
            })
            setload(false);
            sethorror(dados4.data.results)

            const dados5 = await api.get('discover/movie',{
                params:{
                    api_key:apiKey,
                    with_genres:fc_fn.join(','),
                    'primary_release_date.lte': dataCompleta,
                    language: 'pt-br',
                    page:1,
                }
            })
            setfantasia(dados5.data.results)

            const dados6 = await api.get('discover/movie',{
                params:{
                    api_key:apiKey,
                    'primary_release_date.lte': dataCompleta,
                    with_genres:35,
                    language: 'pt-br',
                    page:1,
                }
            })
            setcomedia(dados6.data.results)

            const dados7 = await api.get('discover/movie',{
                params:{
                    api_key:apiKey,
                    with_genres:16, 
                    'primary_release_date.lte': dataCompleta,
                    language: 'pt-br',
                    page:1,
                }
            })
            setanimation(dados7.data.results)
            
            const dados8 = await api.get('discover/movie',{
                params:{
                    api_key:apiKey,
                    with_genres:ro_su.join(','),
                    'primary_release_date.lte': dataCompleta,
                    language: 'pt-br',
                    page:1,
                }
            })
            setromance(dados8.data.results)
        }catch(erro){
          console.log(erro + "filme não encontrado")
        }
    }
    data()
},[])

if (load) {
    return(
        <div className="load">
        <div className="loadd"></div>
      </div>
    ) 
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  function CustomPrevArrow({ onClick }) {
    return (
      <button className="custom-prev-arrow" onClick={onClick}>
        {<Left className="setas" />}
      </button>
    );
  }

  function CustomNextArrow({ onClick }) {
    return (
      <button className="custom-next-arrow" onClick={onClick}>
        {<Right className="setas" />}
      </button>
    );
  }

    return(

        <div className="container2">
            <Header/>
             <div className="slide">
        <div className="ConjuntoSlide">
          <div className="textoConjuntoSlide">
            <div className="tituloSlide">
              <div>{slide.title}</div>
            </div>
            <div className="resumoSlide">{slide.overview}</div>
            <div className="botoesSlide">
                <div><a href={`https://superflixapi.top/filme/${slide.id}`}><button className="assistirSlide">Assisir</button></a></div><div><Link to={`/filme/${slide.id}`}><button className="verSlide">Ver Mais</button></Link></div>
            </div>
            </div>
            <div className="imgSlideDiv">
            
              <img
              alt="capa-filme"
                className="imgSlide"
                src={`https://image.tmdb.org/t/p//original/${slide.backdrop_path}`}
              />
              <div className="sombra"></div>
            </div>
          </div>
        
      </div>
               <div className="tituloCat"><span>Filmes</span></div>

            <div className="tituloCat"><span>Descubra seu novo filme favorito</span></div>
            <Slider className="slides1" {...settings}>
        {desc.map((e)=>{
            return(
                <div key={e.id}>

               <Link to={`/filme/${e.id}`}><div ><img className="imagem" alt="filme-capa" src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}/></div></Link>
                </div>
            )
        })}
        </Slider>
        <div className="tituloCat"><span>Filmes de ficção científica e fantasia</span></div>
        <Slider className="slides1" {...settings}>
         {fantasia.map((e)=>{
             return(
                 <div key={e.id}>
 
                <Link to={`/filme/${e.id}`}><div ><img className="imagem" alt="capa-filme" src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}/></div></Link>
                 </div>
             )
         })}
       </Slider>
        <div className="tituloCat"><span>Filmes de Ação e Aventura</span></div>
        <Slider className="slides1" {...settings}>
         {acao.map((e)=>{
             return(
                 <div key={e.id}>
 
                <Link to={`/filme/${e.id}`}><div ><img className="imagem" alt="capa-filme" src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}/></div></Link>
                 </div>
             )
         })}
     </Slider>
         <div className="tituloCat"><span>Animação</span></div>
         <Slider className="slides1" {...settings}>
         {animation.map((e)=>{
             return(
                 <div key={e.id}>
 
                <Link to={`/filme/${e.id}`}><div ><img className="imagem" alt="capa-filme" src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}/></div></Link>
                 </div>
             )
         })}
        </Slider>
         <div className="tituloCat"><span>Filmes de comedia</span></div>
         <Slider className="slides1" {...settings}>
         {comedia.map((e)=>{
             return(
                 <div key={e.id}>
 
                <Link to={`/filme/${e.id}`}><div ><img className="imagem" alt="capa-filme" src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}/></div></Link>
                 </div>
             )
         })}
         </Slider>
         <div className="tituloCat"><span>romance</span></div>
         <Slider className="slides1" {...settings}>
         {romance.map((e)=>{
             return(
                 <div key={e.id}>
 
                <Link to={`/filme/${e.id}`}><div ><img className="imagem" alt="capa-filme" src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}/></div></Link>
                 </div>
             )
         })}
        </Slider>
         <div className="tituloCat"><span>Filmes de Suspense e terror</span></div>

         <Slider className="slides1" {...settings}>
        {horror.map((e)=>{
            return(
                <div key={e.id}>

               <Link to={`/filme/${e.id}`}><div ><img className="imagem" alt="capa-filme" src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}/></div></Link>
                </div>
            )
        })}
        </Slider>
        <MenuMobile/>
         </div>
         
    )
}
export default FilmePag