import React, { useContext, useEffect, useState } from "react";
import api from "../Api";
import getData from "../utils/GetData";
import { AppContext } from "../App";
import "./static/Processos.css";
import { ReactComponent as Adicionar } from "./static/add.svg";
import { ReactComponent as Editar } from "./static/edit.svg";
import { ReactComponent as Deletar } from "./static/trash.svg";
import { ReactComponent as Info } from "./static/info.svg";
import CreateProcesso from "./forms/CreateProcesso";
import EditarProcesso from "./forms/EditProcesso";
import ProcessoInfo from "./ProcessoInfo";
import formatCurrency from "../utils/FormatCurrency";

const SearchForm = ({ query, setQuery }) => {
  const appContext = useContext(AppContext);
  const [statusList, setStatusList] = useState("");
  const getStatus = () => {
    api
      .post("/status/get", { descricao: "" })
      .then((result) => {
        setStatusList(result.data);
      })
      .catch((err) => {
        appContext.toast("Erro ao obter lista de status", { type: "error" });
      });
  };
  useEffect(() => {
    getStatus();
    // eslint-disable-next-line
  }, []);
  return (
    <form
      action=""
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={{
        flexDirection: "row",
        margin: "0",
        width: "100%",
        animation: "none",
      }}
    >
      <div className="form-item" style={{ margin: "0 .2rem" }}>
        <label htmlFor="search">Procurar</label>
        <input
          type="text"
          name="search"
          id="search"
          value={query.search}
          style={{ padding: "0" }}
          onChange={(e) => {
            setQuery((old) => {
              let result = { ...old, search: e.target.value };
              return result;
            });
          }}
        />
      </div>
      <div className="form-item" style={{ margin: "0 .2rem" }}>
        <label htmlFor="data">Data</label>
        <input type="date" name="data" id="data" value={query.data} style={{height: "1.2rem"}} onChange={(e) => {setQuery(old => {return {...old,data: e.target.value}})}}/>
      </div>
      <div className="form-item" style={{ margin: "0 .2rem" }}>
        <label htmlFor="status">Estado</label>
        <select
          name="status"
          id="status"
          value={query.status}
          onChange={(e) => {
            setQuery((old) => {
              return { ...old, status: e.target.value };
            });
          }}
        >
          <option value="">Selecionar</option>
          {statusList &&
            statusList.map((curr, index) => {
              return (
                <option key={index} value={curr.descricao}>
                  {curr.descricao}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-item" style={{ margin: "0 .2rem" }}>
        <label htmlFor="tipo">Tipo</label>
        <select
          name="tipo"
          id="tipo"
          value={query.tipo}
          onChange={(e) => {
            setQuery((old) => {
              return { ...old, tipo: e.target.value };
            });
          }}
        >
          <option value="">Selecionar</option>
          <option value="ordinario">Ordinário</option>
          <option value="estimativo">Estimativo</option>
          <option value="global">Global</option>
        </select>
      </div>
      <button
        style={{ height: "1.2rem", marginTop: "1.3rem" }}
        onClick={() => {
          query.getProcessos(query);
        }}
      >
        Filtrar
      </button>
    </form>
  );
};

export default function Processo({ togglers }) {
  const [processos, setProcessos] = useState();
  const [showCreateProcesso, setShowCreateProcesso] = useState(false);
  const [toDelete, setToDelete] = useState();
  const [toEdit, setToEdit] = useState();
  const [processoInfo, setProcessoInfo] = useState();

  const appContext = useContext(AppContext);

  const toggleProcesso = () => {
    setShowCreateProcesso((old) => {
      return !old;
    });
  };

  const getProcessos = (query) => {
    query = query ? query : { search: "" };
    console.log(query);
    api
      .post("/processo/get", { query })
      .then((result) => {
        setProcessos(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [query, setQuery] = useState({
    search: "",
    status: "",
    tipo: "",
    data: "",
    getProcessos: getProcessos,
  });
  const deleteProcesso = (id) => {
    api
      .post("/processo/delete", { id: id })
      .then((result) => {
        appContext.toast("Processo Deletado com Sucesso", { type: "success" });
        getProcessos(query);
        setToDelete(undefined);
      })
      .catch((err) => {
        appContext.toast("Processo Deletado com Sucesso", { type: "error" });
        console.log(err);
      });
  };



  const getTipo = (tipo) => {
    switch (tipo) {
      case "ordinario":
        return "Ordinário";
      case "global":
        return "Global";
      case "estimativo":
        return "Estimativo";
      default:
        return "Ordinário";
    }
  };

  useEffect(() => {
    getProcessos(query);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(toDelete);
  }, [toDelete]);

  useEffect(() => {
    getProcessos(query);
    // eslint-disable-next-line
  }, [query.status, query.tipo]);

  return (
    <div>
      {toDelete && (
        <div
          className="modal-container"
          onMouseDown={(e) => {
            e.target.className === "modal-container" && setToDelete(undefined);
          }}
        >
          <div className="ask-delete">
            <span>
              Deletar processo do credor {toDelete.credor?.nome}, criado em{" "}
              {getData(toDelete.dataEmpenho)}
            </span>
            <div className="delete-opt">
              <button
                className="btn"
                onClick={() => {
                  deleteProcesso(toDelete._id);
                }}
              >
                Sim
              </button>
              <button className="btn" onClick={() => setToDelete(undefined)}>
                não
              </button>
            </div>
          </div>
        </div>
      )}
      {toEdit && (
        <EditarProcesso
          toggleSelf={() => {
            setToEdit(undefined);
          }}
          processoToEdit={toEdit}
        />
      )}
      {showCreateProcesso && (
        <CreateProcesso toggleSelf={toggleProcesso} refresh={getProcessos} />
      )}
      {processoInfo && (
        <ProcessoInfo setProcesso={setProcessoInfo} processo={processoInfo} />
      )}
      <div
        className="table-container"
        style={{ width: "fit-content", marginTop: "1rem" }}
      >
        <SearchForm query={query} setQuery={setQuery} />
        <div
          className="titulo"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 style={{ padding: "0", margin: "0" }}>Processos</h3>
          <button
            className="svg-btn anim"
            style={{
              position: "absolute",
              right: "1rem",
              top: "0.5rem",
              height: "1rem",
            }}
            onClick={() => {
              toggleProcesso();
            }}
          >
            <Adicionar width="1rem" height="1rem" fill={"white"} />
          </button>
        </div>
        <table className="processos-table">
          <thead>
            <tr>
              <th>Credor</th>
              <th>Tipo</th>
              <th>Descricao</th>
              <th>Data</th>
              <th>Valor do Empenho</th>
              <th>Valor Liquido</th>
              <th>Valor Pago</th>
              <th>Valor a Pagar</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processos &&
              processos.map((curr, index) => {

                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#bababa" : "#9c9c9c",
                    }}
                  >
                    <td>{curr.credor?.nome}</td>
                    <td>{getTipo(curr.tipo)}</td>
                    <td style={{maxWidth: "15rem"}}>{curr.descricao}</td>
                    <td>{getData(curr.dataEmpenho)}</td>
                    <td>{formatCurrency(curr.valorEmpenho)}</td>
                    <td>
                      {curr.valorLiquido
                        ? formatCurrency(curr.valorLiquido)
                        : "---"}
                    </td>
                    <td>
                      {curr.valorPago
                        ? formatCurrency(curr.valorPago)
                        : "---"}
                    </td>
                    <td>
                      {curr.valorLiquido
                        ? formatCurrency(curr.valorLiquido - (curr.valorPago ? curr.valorPago : 0))
                        : "---"}
                    </td>
                    <td>{curr.status}</td>
                    <td
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <button
                        className="svg-btn"
                        onClick={() => {
                          setProcessoInfo(curr);
                        }}
                      >
                        <Info width="1rem" />
                      </button>
                      <button
                        className="svg-btn"
                        onClick={() => {
                          setToEdit(curr);
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
  );
}
