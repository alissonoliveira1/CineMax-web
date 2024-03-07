
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.css'
import { ReactComponent as Lupa  } from './search.svg';
import { toast } from 'react-toastify'

    function Pesquisas() {
      const [valorPesquisa, setValorPesquisa] = useState('');
      const [dados, setDados] = useState([]);
      const navigate = useNavigate();
    
      const keyApi = '9f4ef628222f7685f32fc1a8eecaae0b';
    
      const fetchData = async () => {
        const pesquisa = valorPesquisa.split(' ').join('+');
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${pesquisa}&api_key=${keyApi}&language=pt-br`
          );
    
          if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
          }
    
          const data = await response.json();
          setDados(data.results);
          navigate('/pesquisa', { state: { resultados: data.results } }); // Redireciona para a página de pesquisa
    
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };
    
      const handleSubmit = async (event) => {
        if(valorPesquisa === ''){
          toast.warn("Digite o nome do Filme")
        }else{
           event.preventDefault();
           await fetchData();
        }
        event.preventDefault();
       
      };
    return(
        <div >
  <form className='pesquisa' onSubmit={handleSubmit}>
       <div> <input
        className='input-pesquisa'
          type="text"
          value={valorPesquisa}
          onChange={(event) => setValorPesquisa(event.target.value)}
          placeholder="Digite sua pesquisa..."
        /></div>
        <div><button className='botao-pesquisa' type="submit"><Lupa className='lupa'/></button></div>
      </form>
      </div>
    )
}
export default Pesquisas