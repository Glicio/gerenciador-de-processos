import React, { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../App";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { salvarProcesso } from "./EditProcesso";

const initialAndamento = {
  memorando: false,
  dotacao: false,
  contrato: false,
  protocolo: false,
  autorizacao: false,
  empenho: false,
  ordemDeFornecimento: false,
  notaFiscal: false,
  atesto: false,
  autuacao: false,
  dataAnalise: Date.now(),
  extras: [],
  controlador: {},
  certidoes: {
    estadual: Date.now(),
    fgts: Date.now(),
    trabalhista: Date.now(),
    receitaFederal: Date.now(),
    municipal: Date.now(),
  },
};

const andamentoReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MEMORANDO":
      return { ...state, memorando: !state.memorando };
    case "TOGGLE_DOTACAO":
      return { ...state, dotacao: !state.dotacao };
    case "TOGGLE_CONTRATO":
      return { ...state, contrato: !state.contrato };
    case "TOGGLE_PROTOCOLO":
      return { ...state, protocolo: !state.protocolo };
    case "TOGGLE_AUTORIZACAO":
      return { ...state, autorizacao: !state.autorizacao };
    case "TOGGLE_EMPENHO":
      return { ...state, empenho: !state.empenho };
    case "TOGGLE_ORDEM_DE_FORNECIMENTO":
      return { ...state, ordemDeFornecimento: !state.ordemDeFornecimento };
    case "TOGGLE_NOTA_FISCAL":
      return { ...state, notaFiscal: !state.notaFiscal };
    case "TOGGLE_ATESTO":
      return { ...state, atesto: !state.atesto };
    case "TOGGLE_AUTUACAO":
      return { ...state, autuacao: !state.autuacao };
    case "SET_DATA_ANALISE":
      return { ...state, dataAnalise: action.payload };
    case "SET_CONTROLADOR":
      return {
        ...state,
        controlador: { nome: action.payload.nome, id: action.payload.id },
      };
    case "SET_CERTIDAO_ESTADUAL":
      return {
        ...state,
        certidoes: { ...state.certidoes, estadual: action.payload },
      };
    case "SET_CERTIDAO_MUNICIPAL":
      return {
        ...state,
        certidoes: { ...state.certidoes, municipal: action.payload },
      };
    case "SET_CERTIDAO_FGTS":
      return {
        ...state,
        certidoes: { ...state.certidoes, fgts: action.payload },
      };
    case "SET_CERTIDAO_TRABALHISTA":
      return {
        ...state,
        certidoes: { ...state.certidoes, trabalhista: action.payload },
      };
    case "SET_CERTIDAO_RECEITA_FEDERAL":
      return {
        ...state,
        certidoes: { ...state.certidoes, receitaFederal: action.payload },
      };
    case "ADD_EXTRA":
      const extra = {
        descricao: action.payload.descricao,
        value: action.payload.value,
        id: crypto.randomUUID(),
      };
      return {
        ...state,
        extras: [...state.extras, extra],
      };
    case "REMOVE_EXTRA":
      return {
        ...state,
        extras: state.extras.filter((curr) => curr.id !== action.payload.id),
      };
    case "TOGGLE_EXTRA":
      return {
        ...state,
        extras: state.extras.map((curr) => {
          if (curr.id !== action.payload.id) return curr;
          return { ...curr, value: !curr.value };
        }),
      };
    default:
      return state
  }
};

const AddExtra = ({ adicionar, toggleSelf }) => {
  const [descricao, setDescricao] = useState("");
  const [value, setValue] = useState(false);
  return (
    <div
      className="modal-container sub-modal"
      onMouseDown={(e) =>
        e.target.className === "modal-container sub-modal" && toggleSelf()
      }
    >
      <form action="" className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-item">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="form-item side">
          <label htmlFor="descricao">Analizado: </label>
          <input
            type="checkbox"
            name="value"
            id="value"
            checked={value}
            onChange={(_) => setValue((old) => !old)}
          />
        </div>
        <button
          onClick={(_) => {
            adicionar({ type: "ADD_EXTRA", payload: { descricao, value } });
            toggleSelf();
          }}
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

const CertidaoInput = ({ nome, value, change }) => {
  const getColor = () => {
    try{
      const dateArr = value.split("-")
      const data = new Date(dateArr[0], dateArr[1], dateArr[2])
      if(data < Date.now()){
        return "#FF0000"
      }
      return "#000000"
    } catch {
      return "#000000"
    }

  }
  return (
    <div className="form-item side grid-spread">
      <label htmlFor="">{nome}</label>
      <input
        style={{color: getColor()}}
        type="date"
        name={nome}
        id={nome}
        value={value || "0000-00-00"}
        onChange={(e) => change(e)}
      />
    </div>
  );
};

export default function Andamento({ processo, toggleSelf, refresh }) {
  const [andamento, andamentoDispatcher] = useReducer(
    andamentoReducer,
    processo.andamento || initialAndamento
  );
  const [addExtra, setAddExtra] = useState(false);
  const [extras, setExtras] = useState(andamento.extras);
  const appContext = useContext(AppContext);

  const style = {
    width: "30rem",
  };

  useEffect(() => {
    setExtras(andamento.extras);
  }, [andamento.extras]);

  const saveAndamentoProcesso = (andamento, processo) => {
    const processoToSave = { ...processo, andamento: andamento };
    salvarProcesso(processoToSave)
      .then((result) => {
        appContext.toast("Andamento salvo com sucesso!", { type: "success" });
        refresh();
        toggleSelf();
      })
      .catch((err) => {
        appContext.toast("Erro ao salvar processo!", { type: "error" });
        console.error(err);
      });
  };

  return (
    <div
      className="modal-container"
      onMouseDown={(e) =>
        e.target.className === "modal-container" && toggleSelf()
      }
    >
      {addExtra && (
        <AddExtra
          adicionar={(action) => andamentoDispatcher(action)}
          toggleSelf={(_) => setAddExtra(false)}
        />
      )}
      <form
        action=""
        className="form"
        onSubmit={(e) => e.preventDefault()}
        style={style}
      >
        <h3 style={{ margin: "0", padding: "0", color: "white" }}>Andamento</h3>
        <div className="divisor"></div>
        <span>
          Itens analizados
          <button
            onClick={(_) => setAddExtra(true)}
            className="btn"
            style={{ background: "none", border: "none" }}
          >
            (adicionar)
          </button>
          :
        </span>
        <div className="itens-checklist" style={{ paddingLeft: "0.5rem" }}>
          <div className="form-item side">
            <label htmlFor="memorando">Memorando</label>
            <input
              type="checkbox"
              name="memorando"
              id="memorando"
              checked={andamento.memorando}
              onChange={(_) =>
                andamentoDispatcher({ type: "TOGGLE_MEMORANDO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="dotacao">Dotação</label>
            <input
              type="checkbox"
              name="dotacao"
              id="dotacao"
              checked={andamento.dotacao}
              onChange={(_) => andamentoDispatcher({ type: "TOGGLE_DOTACAO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="contrato">Contrato</label>
            <input
              type="checkbox"
              name="contrato"
              id="contrato"
              checked={andamento.contrato}
              onChange={(_) => andamentoDispatcher({ type: "TOGGLE_CONTRATO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="protocolo">Protocolo</label>
            <input
              type="checkbox"
              name="protocolo"
              id="protocolo"
              checked={andamento.protocolo}
              onChange={(_) =>
                andamentoDispatcher({ type: "TOGGLE_PROTOCOLO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="autorizacao">Autorização</label>
            <input
              type="checkbox"
              name="autorizacao"
              id="autorizacao"
              checked={andamento.autorizacao}
              onChange={(_) =>
                andamentoDispatcher({ type: "TOGGLE_AUTORIZACAO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="empenho">Empenho</label>
            <input
              type="checkbox"
              name="empenho"
              id="empenho"
              checked={andamento.empenho}
              onChange={(_) => andamentoDispatcher({ type: "TOGGLE_EMPENHO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="ordemDeFornecimento">Ordem de Fornecimento</label>
            <input
              type="checkbox"
              name="ordemDeFornecimento"
              id="ordemDeFornecimento"
              checked={andamento.ordemDeFornecimento}
              onChange={(_) =>
                andamentoDispatcher({ type: "TOGGLE_ORDEM_DE_FORNECIMENTO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="notaFiscal">Nota Fiscal</label>
            <input
              type="checkbox"
              name="notaFiscal"
              id="notaFiscal"
              checked={andamento.notaFiscal}
              onChange={(_) =>
                andamentoDispatcher({ type: "TOGGLE_NOTA_FISCAL" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="atesto">Atesto</label>
            <input
              type="checkbox"
              name="atesto"
              id="atesto"
              checked={andamento.atesto}
              onChange={(_) => andamentoDispatcher({ type: "TOGGLE_ATESTO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="autuacao">Autuação do Processo</label>
            <input
              type="checkbox"
              name="autuacao"
              id="autuacao"
              checked={andamento.autuacao}
              onChange={(_) => andamentoDispatcher({ type: "TOGGLE_AUTUACAO" })}
            />
          </div>
          <div className="extras">
            {extras.length > 0 &&
              extras.map((curr) => {
                return (
                  <div key={curr.id} className="form-item side">
                    <label
                      htmlFor={curr.descricao}
                      style={{
                        whiteSpace: "nowrap",
                        maxWidth: "15rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {curr.descricao}
                    </label>
                    <input
                      type="checkbox"
                      name={curr.descricao}
                      id={curr.descricao}
                      checked={curr.value}
                      onChange={(_) => {
                        andamentoDispatcher({
                          type: "TOGGLE_EXTRA",
                          payload: { id: curr.id },
                        });
                      }}
                    />
                    <button
                      onClick={(_) =>
                        andamentoDispatcher({
                          type: "REMOVE_EXTRA",
                          payload: { id: curr.id },
                        })
                      }
                      className="btn"
                      style={{ background: "none", border: "none" }}
                    >
                      (remover)
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="certidoes">
          <span>Certidões</span>
          <CertidaoInput
            value={
              andamento.certidoes?.municipal
                ? andamento.certidoes?.municipal
                : undefined
            }
            nome={"Municipal"}
            change={(e) =>
              andamentoDispatcher({
                type: "SET_CERTIDAO_MUNICIPAL",
                payload: e.target.value,
              })
            }
          />
          <CertidaoInput
            value={
              andamento.certidoes?.estadual
                ? andamento.certidoes.estadual
                : undefined
            }
            nome={"Estadual"}
            change={(e) =>
              andamentoDispatcher({
                type: "SET_CERTIDAO_ESTADUAL",
                payload: e.target.value,
              })
            }
          />
          <CertidaoInput
            value={andamento.certidoes?.fgts || undefined}
            nome={"FGTS"}
            change={(e) =>
              andamentoDispatcher({
                type: "SET_CERTIDAO_FGTS",
                payload: e.target.value,
              })
            }
          />
          <CertidaoInput
            value={andamento.certidoes?.receitaFederal || undefined}
            nome={"Receita Federal"}
            change={(e) =>
              andamentoDispatcher({
                type: "SET_CERTIDAO_RECEITA_FEDERAL",
                payload: e.target.value,
              })
            }
          />
          <CertidaoInput
            value={andamento.certidoes?.trabalhista || undefined}
            nome={"Trabalhista"}
            change={(e) =>
              andamentoDispatcher({
                type: "SET_CERTIDAO_TRABALHISTA",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button
          className="btn"
          onClick={(_) => saveAndamentoProcesso(andamento, processo)}
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
