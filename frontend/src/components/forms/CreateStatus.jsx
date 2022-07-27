import api from "../../Api";
import React, { useState } from "react";


export default function CreateStatus({toggleSelf}){
    const [descricao, setDescricao] = useState("")


    const salvarStatus = ( descricao ) => {
        api.post("/status/create",{descricao: descricao}).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    }


    return <div className="modal-container" onMouseDown={(e) => {e.target.className === "modal-container" && toggleSelf()}}>
        <form action="" className="form" onSubmit={(e) => {e.preventDefault()}}>
            <h3 style={{margin: "0", padding: "0", color: "white"}}>Adicionar Estado</h3>
            <div className="form-item">
                <label htmlFor="descricao">Descrição</label>
                <input type="text" value={descricao} onChange={(e) => {setDescricao(e.target.value)}}/>
            </div>
            <button onClick={() => {salvarStatus(descricao)}} style={{marginTop: "0.5rem"}}>Salvar</button>
        </form>
    </div>
}