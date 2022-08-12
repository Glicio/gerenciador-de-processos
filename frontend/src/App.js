import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import Processo from "./components/Processos";
import Controladores from "./components/Controladores"
import NavBar from "./components/NavBar";
import Credores from "./components/Credores";
import Loading from "./components/Loading";
import Estados from "./components/Estados.tsx";

export const AppContext = createContext();




function App() {
  const [showCredor, setShowCredor] = useState(false)
  const [showStatus, setShowCreateStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showControlador, setShowControlador] = useState(false)
  
  const utils = {
    toast,
    setLoading
  }
  const togglers = {
    toggleCredor: () => {
      setShowCredor(old => {return !old})
    },
    toggleStatus: () => {
      setShowCreateStatus(old => {return !old})
    },
    toggleControladores: () => {
      setShowControlador(old => !old)
    }

  }
  return (
    <div className="App">
      <AppContext.Provider value={utils}>
        {loading && <Loading />}
        <NavBar togglers={togglers}/>
        <Processo togglers={togglers}/>
        
        {showStatus && <Estados toggleSelf={togglers.toggleStatus} />}
        {showControlador && <Controladores toggleSelf={togglers.toggleControladores}/>}
        {showCredor && <Credores toggleSelf={() => {setShowCredor(old => {return !old})}}/>}
        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
}

export default App;