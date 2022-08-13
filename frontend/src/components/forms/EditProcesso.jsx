import React, { useCallback, useContext, useEffect, useState } from "react";
import api from "../../Api";
import { AppContext } from "../../App";

export const salvarProcesso = (processo) => {
  let salvar = new Promise((succ, error) => {
    api
      .post("/processo/update", { processo })
      .then((result) => {
        succ(result);
      })
      .catch((err) => {
        error(err);
      });
  });
  return salvar;
};

export default function EditarProcesso({
  toggleSelf,
  processoToEdit,
  refresh,
}) {
  const [processo, setProcesso] = useState(processoToEdit);
  const [statusList, setStatusList] = useState();
  const appContext = useContext(AppContext);

  const getStatus = useCallback(() => {
    api
      .post("/status/get", { descricao: "" })
      .then((result) => {
        setStatusList(result.data);
      })
      .catch((err) => {
        appContext.toast("Erro ao obter lista de status", { type: "error" });
      });
  }, [appContext]);

  useEffect(() => {
    getStatus();
  }, [processo, getStatus]);

  return (
    <div
      className="modal-container"
      onMouseDown={(e) => {
        e.target.className === "modal-container" && toggleSelf();
      }}
    >
      <form
        action=""
        className="form"
        onSubmit={(e) => e.preventDefault()}
        style={{ width: "30rem", height: "90vh" }}
      >
        <div>
          <h3
            className=""
            style={{ color: "white", margin: "0", position: "" }}
          >
            Editar Processo
          </h3>
          <div className="divisor"></div>
        </div>
        <div className="inputs overflow-y-scroll">
          <div className="form-item">
            <label htmlFor="credor">Credor:</label>
            <input type="text" disabled value={processo.credor.nome} />
          </div>
          <div className="form-item">
            <label htmlFor="tipo">Tipo</label>
            <select
              name=""
              id=""
              value={processo.tipo}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, tipo: e.target.value };
                });
              }}
            >
              <option value="ordinario">Ordinário</option>
              <option value="global">Global</option>
              <option value="estimativo">Estimativo</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="data">Data</label>
            <input
              type="date"
              name="data"
              id="data"
              value={processo.dataEmpenho}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, data: e.target.value };
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              name="descricao"
              id="descricao"
              value={processo.descricao}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, descricao: e.target.value };
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="valorEmpenho">Valor do Empenho</label>
            <input
              type="text"
              name="valorEmpenho"
              id="valorEmpenho"
              value={processo.valorEmpenho}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, valorEmpenho: e.target.value };
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="valorLiquido">Valor Liquido</label>
            <input
              type="text"
              name="valorLiquido"
              id="valorLiquido"
              value={processo.valorLiquido ? processo.valorLiquido : ""}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, valorLiquido: e.target.value };
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="valorPago">Valor Pago</label>
            <input
              type="text"
              name="valorPago"
              id="valorPago"
              value={processo.valorPago ? processo.valorPago : ""}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, valorPago: e.target.value };
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="satus">Estado do Processo</label>
            <select
              name="status"
              id="status"
              value={processo.status}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, status: e.target.value };
                });
              }}
            >
              {statusList?.map((curr, index) => {
                return (
                  <option key={index} value={curr.descricao}>
                    {curr.descricao}
                  </option>
                );
              })}
            </select>
          </div>
          {processo.tipo === "global" && (
            <div className="form-item">
              <label htmlFor="ultimomes">Ultimo Mês Pago</label>
              <input
                type="month"
                name="umm"
                id="umm"
                value={processo.ultimoMesPago ? processo.ultimoMesPago : ""}
                onChange={(e) => {
                  setProcesso((old) => {
                    return { ...old, ultimoMesPago: e.target.value };
                  });
                }}
              />
            </div>
          )}
          <div className="form-item">
            <label htmlFor="obs">Observações </label>
            <textarea
              style={{ resize: "none", width: "100%" }}
              name="obs"
              id="obs"
              cols="obs"
              rows="10"
              value={processo.obs}
              onChange={(e) => {
                setProcesso((old) => {
                  return { ...old, obs: e.target.value };
                });
              }}
            ></textarea>
          </div>
          <button
            className="btn"
            style={{ marginTop: "0.5rem" }}
            onClick={(_) => {
              salvarProcesso(processo)
                .then(() => {
                  appContext.toast("Processo salvo com sucesso!", {
                    type: "success",
                  });
                  refresh();
                  toggleSelf();
                })
                .catch((err) => {
                  appContext.toast("Erro ao salvar", { type: "error" });
                  console.error(err);
                });
            }}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
