import api from "../../Api";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";


export default function CreateStatus({toggleSelf, refresh}){
    const [descricao, setDescricao] = useState("")
    const {toast} = useContext(AppContext)


    const salvarStatus = ( descricao ) => {
        api.post("/status/create",{descricao: descricao}).then((result) => {
            toast("Salvo com sucesso!", {type: "success"})
            toggleSelf()
            refresh()
        }).catch((err) => {
            console.log(err)
            toast("Erro ao salvar estado!", {type: "error"})
        })
    }


    return <div className="modal-container sub-modal" onMouseDown={(e) => {e.target.className === "modal-container sub-modal" && toggleSelf()}}>
        <form action="" className="form" onSubmit={(e) => {e.preventDefault()}}>
            <h3 style={{margin: "0", padding: "0", color: "white"}}>Adicionar Estado</h3>
            <div className="form-item">
                <label htmlFor="descricao">Descrição</label>
                <input type="text" value={descricao} onChange={(e) => {setDescricao(e.target.value)}}/>
            </div>
            <button className="btn" onClick={() => {salvarStatus(descricao)}} style={{marginTop: "0.5rem"}}>Salvar</button>
        </form>
    </div>
}