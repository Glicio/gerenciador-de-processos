import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../App";
import { deleteEstado, getAllEstados } from "../utils/Estado";
import DeleteButtom from "./buttons/DeleteButton";
import CreateStatus from "./forms/CreateStatus";

interface EstadoComponentInterface {
  toggleSelf(): void;
}

interface EstadoInterface {
  _id: string;
  descricao: string;
}

export default function Estados(props: EstadoComponentInterface) {
  const { toggleSelf } = props;
  const { toast } = useContext(AppContext);
  const [estadosList, setEstadosList] = useState<EstadoInterface[]>([]);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  const refresh = useCallback((): void => {
    getAllEstados()
      .then((result) => {
        setEstadosList(result);
      })
      .catch((err) => {
        toast("Erro ao obter lista de estados", {
          type: "error",
        });
      });
  }, [toast]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div
      className="modal-container"
      onMouseDown={(e) =>
        (e.target as Element).className === "modal-container" && toggleSelf()
      }
    >
      {showCreateForm && (
        <CreateStatus
          toggleSelf={() => setShowCreateForm(false)}
          refresh={refresh}
        />
      )}
      <div className="container pop-up-anim">
        <div className="side-menu">
          <h3
            style={{
              margin: "0",
              padding: "0",
              textAlign: "center",
              width: "100%",
              fontSize: "small",
            }}
          >
            Estados do processo
          </h3>
          <div className="divisor" style={{ margin: "0.5rem auto" }}></div>
          <button
            className="btn side-menu-button"
            onClick={() => {
              setShowCreateForm(true);
            }}
          >
            Adicionar
          </button>
        </div>
        <div className="content">
          <div className="credores-table-container overflow-y-scroll">
            <table className="credores-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {estadosList.length > 0 &&
                  estadosList.map((curr: EstadoInterface, index: number) => {
                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#b8b8b8" : "#8f8f8f",
                          color: "black",
                        }}
                      >
                        <td>{curr.descricao}</td>
                        <td>
                          <DeleteButtom
                            onClick={() => {
                              deleteEstado(curr._id)
                                .then(() => {
                                  refresh();
                                })
                                .catch((err) => {
                                  return toast("Erro ao excluir estado!", {
                                    type: "error",
                                  });
                                });
                            }}
                          />
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
