import Rotas from './rotas'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
 <div>
  <ToastContainer autoClose={3000}/>
  <Rotas/>
 </div>
     
  );
}

export default App;
