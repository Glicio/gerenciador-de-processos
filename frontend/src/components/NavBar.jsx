import React from "react";
import "./static/NavBar.css";

export default function NavBar({togglers}) {
  return (
    <div className="nav-bar">
      <span>Gerenciador de Processos</span>
      <span className="drop-down-container" style={{marginRight: "1rem", cursor: "pointer", position: "relative"}}>
        Cadastros 
        <div className="drop-down">
            <button className="btn" onClick={() => {togglers.toggleCredor()}}>Credor</button>
            <button className="btn" onClick={() => {togglers.toggleStatus()}}>Status</button>
            <button className="btn" onClick={() => {togglers.toggleControladores()}}>Controlador</button>
        </div>
      </span>
    </div>
  );
}
