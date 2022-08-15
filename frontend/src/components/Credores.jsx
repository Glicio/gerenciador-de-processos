import React, { useContext, useEffect, useState } from "react";
import api from "../Api";
import { AppContext } from "../App";
import { ReactComponent as Editar } from "./static/edit.svg";
import { ReactComponent as Deletar } from "./static/trash.svg";
import CreateCredor from "./forms/CreateCredor";
import "./static/Credores.css";

const DeleteModal = ({credor, toggleSelf, refresh}) => {
    const appContext = useContext(AppContext)
    const deleteCredor = (id) => {
        api.post("/credor/delete", {id: id}).then((result) => {
            appContext.setLoading(false);
            appContext.toast(
                "Credor deletado com sucesso!",
                {type: "success"}
              );
              refresh()
              toggleSelf()
          })
          .catch((err) => {
            appContext.setLoading(false);
            appContext.toast(
              "Erro ao deletar credor, confira o console!",
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
        <p>Tem certeza que deseja deletar o credor {credor.nome}?</p>
        <div className="delete-opt">
            <button onClick={() => {toggleSelf()}}>Não</button>
            <button onClick={() => {deleteCredor(credor._id)}}>Sim</button>
        </div>
      </div>
    </div>
  );
};

export default function Credores({ toggleSelf }) {
  const [credorList, setCredorList] = useState();
  const [showCreateCredor, setShowCreateCredor] = useState(false);
  const [toDelete, setToDelete] = useState();
  const [toEdit, setToEdit] = useState();
  const appContext = useContext(AppContext);

  const getAllCredores = () => {
    appContext.setLoading(true);
    api
      .get("/credor/get/all")
      .then((result) => {
        setCredorList(result.data);
        appContext.setLoading(false);
      })
      .catch((err) => {
        appContext.setLoading(false);
        appContext.toast(
          "Erro ao carregar lista de Credores, confira o console!"
        );
        console.error(err);
      });
  };

  useEffect(() => {
    getAllCredores();
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
          refresh={getAllCredores}
          toggleSelf={() => {
            setToDelete(undefined);
          }}
        />
      )}
      {showCreateCredor && (
        <CreateCredor
          refresh={getAllCredores}
          toEdit={toEdit}
          toggleSelf={() => {
            setShowCreateCredor((old) => {
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
            }}
          >
            Credores
          </h2>
          <div className="divisor" style={{ margin: "0.5rem auto" }}></div>
          <button
            className="btn side-menu-button"
            onClick={() => {
              setShowCreateCredor(true);
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
                  <th>Razão Social</th>
                  <th>Tipo</th>
                  <th>CNPJ/CPF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {credorList &&
                  credorList.map((curr, index) => {
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
                        <td>{curr.tipo === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}</td>
                        <td style={{textAlign: "center"}}>{curr.tipo === "pf" ? curr.cpf : curr.cnpj}</td>
                        <td>
                          <button
                            className="svg-btn"
                            onClick={() => {
                              setToEdit(curr);
                              setShowCreateCredor(true);
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
