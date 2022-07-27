import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateUser from "./components/forms/CreateUser";
import { createContext, useEffect, useState } from "react";
import CreateCredor from "./components/forms/CreateCredor";
import Processo from "./components/Processos";
import CreateProcesso from "./components/forms/CreateProcesso";
import CreateStatus from "./components/forms/CreateStatus";
import NavBar from "./components/NavBar";
import Credores from "./components/Credores";
import Loading from "./components/Loading";

export const AppContext = createContext();




function App() {
  const [showCredor, setShowCredor] = useState(false)
  const [showCreateStatus, setShowCreateStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  
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

  }
  return (
    <div className="App">
      <AppContext.Provider value={utils}>
        {loading && <Loading />}
        <NavBar togglers={togglers}/>
        <Processo togglers={togglers}/>
        
        {showCreateStatus && <CreateStatus toggleSelf={togglers.toggleStatus}/>}
        
        {showCredor && <Credores toggleSelf={() => {setShowCredor(old => {return !old})}}/>}
        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
