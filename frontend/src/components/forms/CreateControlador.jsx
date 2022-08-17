import React, { useContext, useReducer } from "react";
import InputMask from "react-input-mask";
import api from "../../Api";
import { AppContext } from "../../App";

export default function CreateControlador({
  controladorToEdit,
  toggleSelf,
  refresh,
}) {
  const appContext = useContext(AppContext);

  const initialControlador = {
    nome: "",
    cpf: "",
    cargo: "Controlador Interno",
  };

  const controladorReducer = (state, action) => {
    switch (action.type) {
      case "SET_NOME":
        return { ...state, nome: action.payload };
      case "SET_CARGO":
        return { ...state, cargo: action.payload };
      case "SET_CPF":
        return { ...state, cpf: action.payload };
      default:
        return 0;
    }
  };

  const createControlador = (nome, cpf, cargo) => {
    appContext.setLoading(true);
    api
      .post("/controlador/create/", { controlador: { nome, cpf, cargo } })
      .then((result) => {
        appContext.setLoading(false);
        appContext.toast("Controlador incluido com sucesso!", {
          type: "success",
        });
        toggleSelf();
        refresh();
      })
      .catch((err) => {
        appContext.setLoading(false);
        appContext.toast("Erro ao incluir controlador!", { type: "error" });
        console.error(err);
      });
  };

  const editControlador = (id, nome, cpf, cargo) => {
    api
      .post("/controlador/update/", { controlador: { id, nome, cpf, cargo } })
      .then((result) => {
        appContext.setLoading(false);
        appContext.toast("Controlador editado com sucesso!", {
          type: "success",
        });
        toggleSelf();
        refresh();
      })
      .catch((err) => {
        appContext.setLoading(false);
        appContext.toast("Erro ao editar controlador!", { type: "error" });
        console.error(err);
      });
  };

  const [controlador, controladorDispatcher] = useReducer(
    controladorReducer,
    controladorToEdit || initialControlador
  );

  return (
    <div
      className="modal-container sub-modal"
      onMouseDown={(e) =>
        e.target.className === "modal-container sub-modal" && toggleSelf()
      }
    >
      <form
        action=""
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-item">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={controlador.nome}
            onChange={(e) =>
              controladorDispatcher({
                type: "SET_NOME",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="cpf">CPF:</label>
          <InputMask
            mask="999.999.999-99"
            value={controlador.cpf}
            onChange={(e) =>
              controladorDispatcher({
                type: "SET_CPF",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="cargo">Cargo:</label>
          <input
            type="text"
            name="cargo"
            id="cargo"
            value={controlador.cargo}
            onChange={(e) =>
              controladorDispatcher({
                type: "SET_CARGO",
                payload: e.target.value,
              })
            }
          />
        </div>
        <input
          type="submit"
          value="Salvar"
          className="btn"
          style={{ margin: "0.2rem 0" }}
          onClick={(_) => {
            if (!controlador._id) {
              createControlador(
                controlador.nome,
                controlador.cpf,
                controlador.cargo
              );
              return;
            }
            editControlador(
              controlador._id,
              controlador.nome,
              controlador.cpf,
              controlador.cargo
            );
          }}
        />
      </form>
    </div>
  );
}
