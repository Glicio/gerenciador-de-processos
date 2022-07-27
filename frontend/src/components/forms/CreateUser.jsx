import React, { useContext, useState } from "react";
import InputMask from 'react-input-mask'
import { AppContext } from "../../App";


export default function CreateUser(){
    const appContext = useContext(AppContext)
    const [cpf, setCpf] = useState("")
    const [senha, setSenha] = useState("")
    return <div className="form">
        <div className="form-item">
            <label htmlFor="">CPF</label>
            <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => {setCpf(e.target.value)}}/>
        </div>
        <div className="form-item">
            <label htmlFor="pass">Senha</label>
            <input type="password" name="pass" id="pass" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
        </div>
        <button className="btn" style={{marginTop: "0.5rem", width: "5rem", alignSelf:"flex-end"}} onClick={() => {appContext.toast(":D")}}>Salvar</button>
    </div>
}