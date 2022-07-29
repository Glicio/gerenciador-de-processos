import React, { useReducer } from 'react'


export default function CreateControlador({controladorToEdit, toggleSelf}) {

    const initialControlador = {
        nome: "",
        cargo: "Controlador Interno"
    }

    const controladorReducer = (state, action) => {
        switch(action.type) {
            case "SET_NOME":
                return {...state, nome: action.payload}
            case "SET_CARGO":
                return {...state, cargo: action.payload}
            default:
                return 0
        }
    }


    const [controlador, controladorDispatcher] = useReducer(controladorReducer, controladorToEdit || initialControlador)

    return <div className="modal-container">
        <form action="" className="form" onSubmit={e => {e.preventDefault()}}>
            <div className="form-item">
                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" id="nome" value={controlador.nome} onChange={e => controladorDispatcher({type: "SET_NOME", payload: e.target.value})}/>
            </div>
            <div className="form-item">
                <label htmlFor="cargo">Cargo:</label>
                <input type="text" name="cargo" id="cargo" value={controlador.cargo} onChange={e => controladorDispatcher({type: "SET_CARGO", payload: e.target.value})}/>
            </div>
        </form>
    </div>    
}