import api from "../../Api";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

export default function CreateProcesso({ toggleSelf, refresh }) {
  const appContext = useContext(AppContext);
  const [credorSarch, setCredorSearch] = useState("");
  const [credorSarchDebouncer, setCredorSearchDebouncer] = useState("");
  const [credor, setCredor] = useState("");
  const [credorList, setCredorList] = useState();
  const [tipoEmpenho, setTipoEmpenho] = useState("ordinario");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [obs, setObs] = useState("");
  const [statusList, setStatusList] = useState();
  const [status, setStatus] = useState("Para ser empenhado");

  const getCredores = () => {
    api
      .post("/credor/get", { search: credorSarch })
      .then((result) => {
        setCredorList(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const createProcesso = (processo) => {
    if (!processo.credor) {
      appContext.toast("Selecione um credor", { type: "error" });
      return;
    }
    api
      .post("/processo/create", { processoToCreate: processo })
      .then(() => {
        appContext.toast("Processo criado com sucesso", { type: "success" });
        setCredor(undefined);
        setTipoEmpenho("");
        setValor("");
        setDescricao("");
        setData("");
        setObs("");
        setStatus("");
        toggleSelf();
        refresh();
      })
      .catch((err) => {
        console.log(err);
        appContext.toast("Erro ao criar processo!", { type: "error" });
      });
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (credorSarchDebouncer === "" || credorSarchDebouncer.length < 3) return;
    const timer = setTimeout(() => setCredorSearch(credorSarchDebouncer), 300);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [credorSarchDebouncer]);

  useEffect(() => {
    if (credorSarch === "" || credorSarchDebouncer.length < 3) return;
    getCredores(credorSarch);
    // eslint-disable-next-line
  }, [credorSarch]);

  return (
    <div
      className="modal-container"
      onMouseDown={(e) => {
        e.target.className === "modal-container" && toggleSelf();
      }}
    >
      <div className="p-1 bg-primary pop-up-anim">
        <h3 style={{ color: "white" }}>Adicionar Processo</h3>
        <form
          action=""
          className="grid grid-cols-2 gap-1"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{ width: "50vw" }}
        >
          {/*Select Credor*/}
          {credor ? (
            <div className="form-item">
              <label htmlFor="credor">Credor</label>
              <input
                type="text"
                name="credor"
                id="credor "
                disabled
                value={credor.nome}
              />
              <button
                className="btn my-1"
                onClick={() => {
                  setCredor(undefined);
                }}
              >
                Trocar
              </button>
            </div>
          ) : (
            <div className="form-item">
              <label htmlFor="">Credor</label>
              <input
                type="text"
                name="credor"
                id="credor"
                required
                value={credorSarchDebouncer}
                onBlur={() => {
                  setTimeout(() => {
                    setCredorList(undefined);
                  }, 300);
                }}
                onChange={(e) => {
                  setCredorSearchDebouncer(e.target.value);
                }}
              />
              <div
                className="select-credor "
                style={{ position: "relative", overflow: "visible" }}
              >
                {credorList && credorList.length > 0 && (
                  <div
                    className="select-credor-list w-full bg-zinc-700 p-1"
                    style={{ position: "absolute" }}
                  >
                    {credorList.map((curr, index) => {
                      return (
                        <button
                          key={index}
                          className={"btn w-full z-10 my-1"}
                          onClick={() => {
                            setCredor(curr);
                            setCredorList(undefined);
                            setCredorSearchDebouncer("");
                          }}
                          style={{
                            height: "1.5rem",
                            whiteSpace: "nowrap",
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {curr.nome}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
          {/*fim Select credor*/}
          <div className="form-item">
            <label htmlFor="tipo">Tipo</label>
            <select
              name="tipo"
              id="tipo"
              value={tipoEmpenho}
              onChange={(e) => {
                setTipoEmpenho(e.target.value);
              }}
            >
              <option value="ordinario">Ordinário</option>
              <option value="estimativo">Estimativo</option>
              <option value="global">Global</option>
            </select>
          </div>
          {/*Valor do empenho*/}
          <div className="form-item">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              name="descricao"
              id="descricao"
              value={descricao}
              onChange={(e) => {
                setDescricao(e.target.value);
              }}
            />
          </div>
          {tipoEmpenho === "ordinario" ? (
            <div className="form-item">
              <label htmlFor="valorLiquido">Valor Liquido:</label>
              <input
                type="number"
                name="valorLiquido"
                id="valorLiquido"
                required
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          ) : (
            <div className="form-item">
              <label htmlFor="valorLiquido">Valor do Empenho:</label>
              <input
                type="number"
                name="valorEmpenho"
                id="valorEmpenho"
                required
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          )}
          {/*Fim valor empenho */}
          <div className="form-item">
            <label htmlFor="data">Data do empenho</label>
            <input
              type="date"
              name="data"
              id="data"
              value={data}
              required
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="status">Estado</label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {statusList &&
                statusList.map((curr, index) => {
                  return (
                    <option value={curr.descricao} key={index}>
                      {curr.descricao}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-item col-span-2">
            <label htmlFor="obs">Observações</label>
            <textarea
              name="obs"
              id="obs"
              cols="30"
              rows="10"
              style={{ resize: "none" }}
              value={obs}
              onChange={(e) => {
                setObs(e.target.value);
              }}
            ></textarea>
          </div>
        </form>
        <button
          type="submit"
          className="btn mt-1"
          onClick={() => {
            const processo = {
              credor: credor,
              valor: valor,
              tipo: tipoEmpenho,
              descricao: descricao,
              dataEmpenho: data,
              status: status,
              obs: obs,
            };
            createProcesso(processo);
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
