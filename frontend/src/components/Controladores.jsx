import React, { useContext, useEffect, useState } from "react";
import api from "../Api";
import { AppContext } from "../App";
import { ReactComponent as Editar } from "./static/edit.svg";
import { ReactComponent as Deletar } from "./static/trash.svg";
import "./static/Credores.css";
import CreateControlador from "./forms/CreateControlador";

const DeleteModal = ({controlador, toggleSelf, refresh}) => {
    const appContext = useContext(AppContext)
    const deleteControlador = (id) => {
        api.post("/controlador/delete", {id: id}).then((result) => {
            appContext.setLoading(false);
            appContext.toast(
                "Controlador deletado com sucesso!",
                {type: "success"}
              );
              refresh()
              toggleSelf()
          })
          .catch((err) => {
            appContext.setLoading(false);
            appContext.toast(
              "Erro ao deletar Controlador, confira o console!",
              {type: "error"}
            );
            console.error(err);
          });
    }
  return (
    <div
      className="modal-container sub-modal"
      onMouseDown={(e) => {
        e.target.className === "modal-container sub-modal" && toggleSelf();
      }}
    >
      <div className="prompt">
        <p>Tem certeza que deseja deletar o credor {controlador.nome}?</p>
        <div className="delete-opt">
            <button onClick={() => {toggleSelf()}}>Não</button>
            <button onClick={() => {deleteControlador(controlador._id)}}>Sim</button>
        </div>
      </div>
    </div>
  );
};

export default function Controladores({ toggleSelf }) {
  const [controladorList, setControladorList] = useState();
  const [showCreateControlador, setShowCreateControlador] = useState(false);
  const [toDelete, setToDelete] = useState();
  const [toEdit, setToEdit] = useState();
  const appContext = useContext(AppContext);

  const getAllControladores = () => {
    appContext.setLoading(true);
    api
      .get("/controlador/get/")
      .then((result) => {
        setControladorList(result.data);
        appContext.setLoading(false);
      })
      .catch((err) => {
        appContext.setLoading(false);
        appContext.toast(
          "Erro ao carregar lista de Controladores, confira o console!"
        );
        console.error(err);
      });
  };

  useEffect(() => {
    getAllControladores();
  }, []);

  return (
    <div
      className="modal-container"
      onMouseDown={(e) => {
        e.target.className === "modal-container" && toggleSelf();
      }}
    >
      {toDelete && (
        <DeleteModal
          credor={toDelete}
          refresh={getAllControladores}
          toggleSelf={() => {
            setToDelete(undefined);
          }}
        />
      )}
      {showCreateControlador && (
        <CreateControlador
          refresh={getAllControladores}
          controladorToEdit={toEdit}
          toggleSelf={() => {
            setShowCreateControlador((old) => {
              return !old;
            });
            setToEdit(undefined);
          }}
        />
      )}
      <div className="container pop-up-anim">
        <div className="side-menu">
          <h2
            style={{
              margin: "0",
              padding: "0",
              textAlign: "center",
              width: "100%",
              fontSize: "20px"
            }}
          >
            Controladores
          </h2>
          <div className="divisor" style={{ margin: "0.5rem auto" }}></div>
          <button
            className="side-menu-button"
            onClick={() => {
              setShowCreateControlador(true);
            }}
          >
            Adicionar
          </button>
        </div>
        <div className="content">
          <div className="credores-table-container">
            <table className="credores-table">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CPF</th>
                  <th>CARGO</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {controladorList &&
                  controladorList.map((curr, index) => {
                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#b8b8b8" : "#8f8f8f",
                          color: "black",
                        }}
                      >
                        <td>{curr.nome}</td>
                        <td style={{textAlign: "center"}}>{curr.cpf}</td>
                        <td>{curr.cargo}</td>
                        <td style={{display: "flex", justifyContent: "space-evenly", width: "5rem"}}>
                          <button
                            className="svg-btn"
                            onClick={() => {
                              setToEdit(curr);
                              setShowCreateControlador(true);
                            }}
                          >
                            <Editar width="1rem" />
                          </button>
                          <button
                            className="svg-btn"
                            onClick={() => {
                              setToDelete(curr);
                            }}
                          >
                            <Deletar width="1rem" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}