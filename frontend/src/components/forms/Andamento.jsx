import React, { useEffect, useReducer, useState } from "react";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

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
        extras: [...state.extras, extra]
      };
    case "REMOVE_EXTRA":
      return {
        ...state,
        extras: state.extras.filter((curr) => curr.id !== action.payload),
      };
    case "TOGGLE_EXTRA":
      return {
        ...state,
        extras: state.extras.map((curr) => {
          if (curr.id !== action.payload.id) return curr;
          return { ...curr, value: !curr.value };
        }),
      };
  }
};

const AddExtra = ({ adicionar, toggleSelf }) => {
  const [descricao, setDescricao] = useState("");
  const [value, setValue] = useState(false);
  return (
    <div className="modal-container sub-modal">
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

export default function Andamento({ processo }) {
  const [andamento, andamnetoDispatcher] = useReducer(
    andamentoReducer,
    processo.andamento || initialAndamento
  );
  const [addExtra, setAddExtra] = useState(false);
  const [extras, setExtras] = useState(andamento.extras);

  useEffect(() => {
    setExtras(andamento.extras);
    console.log(andamento.extras);
  }, [andamento]);

  return (
    <div className="modal-container">
      {addExtra && (
        <AddExtra
          adicionar={(action) => andamnetoDispatcher(action)}
          toggleSelf={(_) => setAddExtra(false)}
        />
      )}
      <form action="" className="form" onSubmit={(e) => e.preventDefault()}>
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
              value={andamento.memorando}
              onChange={(_) =>
                andamnetoDispatcher({ type: "TOGGLE_MEMORANDO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="dotacao">Dotação</label>
            <input
              type="checkbox"
              name="dotacao"
              id="dotacao"
              value={andamento.dotacao}
              onChange={(_) => andamnetoDispatcher({ type: "TOGGLE_DOTACAO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="contrato">Contrato</label>
            <input
              type="checkbox"
              name="contrato"
              id="contrato"
              value={andamento.contrato}
              onChange={(_) => andamnetoDispatcher({ type: "TOGGLE_CONTRATO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="protocolo">Protocolo</label>
            <input
              type="checkbox"
              name="protocolo"
              id="protocolo"
              value={andamento.protocolo}
              onChange={(_) =>
                andamnetoDispatcher({ type: "TOGGLE_PROTOCOLO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="autorizacao">Autorização</label>
            <input
              type="checkbox"
              name="autorizacao"
              id="autorizacao"
              value={andamento.autorizacao}
              onChange={(_) =>
                andamnetoDispatcher({ type: "TOGGLE_AUTORIZACAO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="empenho">Empenho</label>
            <input
              type="checkbox"
              name="empenho"
              id="empenho"
              value={andamento.empenho}
              onChange={(_) => andamnetoDispatcher({ type: "TOGGLE_EMPENHO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="ordemDeFornecimento">Ordem de Fornecimento</label>
            <input
              type="checkbox"
              name="ordemDeFornecimento"
              id="ordemDeFornecimento"
              value={andamento.ordemDeFornecimento}
              onChange={(_) =>
                andamnetoDispatcher({ type: "TOGGLE_ORDEM_DE_FORNECIMENTO" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="notaFiscal">Nota Fiscal</label>
            <input
              type="checkbox"
              name="notaFiscal"
              id="notaFiscal"
              value={andamento.notaFiscal}
              onChange={(_) =>
                andamnetoDispatcher({ type: "TOGGLE_NOTA_FISCAL" })
              }
            />
          </div>
          <div className="form-item side">
            <label htmlFor="atesto">Atesto</label>
            <input
              type="checkbox"
              name="atesto"
              id="atesto"
              value={andamento.atesto}
              onChange={(_) => andamnetoDispatcher({ type: "TOGGLE_ATESTO" })}
            />
          </div>
          <div className="form-item side">
            <label htmlFor="autuacao">Autuação do Processo</label>
            <input
              type="checkbox"
              name="autuacao"
              id="autuacao"
              value={andamento.autuacao}
              onChange={(_) => andamnetoDispatcher({ type: "TOGGLE_AUTUACAO" })}
            />
          </div>
          <div className="extras">
            {extras.length > 0 &&
              extras.map((curr) => {
                return (
                  <div key={curr.id} className="form-item side">
                    <label htmlFor={curr.descricao}>{curr.descricao}</label>
                    <input
                      type="checkbox"
                      name={curr.descricao}
                      id={curr.descricao}
                      checked={curr.value}
                      onChange={(_) => {
                        andamnetoDispatcher({
                          type: "TOGGLE_EXTRA",
                          payload: {id: curr.id},
                        });
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </form>
    </div>
  );
}
