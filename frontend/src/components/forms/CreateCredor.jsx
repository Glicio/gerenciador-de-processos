import api from "../../Api";
import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import consultarCNPJ from "../../utils/ConsultarCNPJ";
import { AppContext } from "../../App";

export default function CreateCredor({ toggleSelf, toEdit, refresh }) {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const appContext = useContext(AppContext);
  const credorTemplate = {
    nome: "",
    tipo: "pj",
    cnpj: "",
    cpf: "",
  };
  const [credor, setCredor] = useState(toEdit || credorTemplate);

  const salvarCredor = (credor) => {
    if(!credor.nome) {
      appContext.toast("Informe a razão social do credor!",{type: "error"})
      return
    }
    if(credor.tipo === "pf" && !credor.cpf) {
      appContext.toast("Informe o CPF do credor!",{type: "error"})
      return
    }
    if(credor.tipo === "pj" && !credor.cnpj) {
      appContext.toast("Informe o CNPJ do credor!",{type: "error"})
      return
    }


    api
      .post("/credor/create", { credorToCreate: { ...credor } })
      .then((result) => {
        appContext.toast("Credor cadastrado com sucesso!", { type: "success" });
        toggleSelf();
        refresh();
      })
      .catch((err) => {
        console.log(err);
          appContext.toast(err.response.data.message, {
            type: "error"})
          return;
        }
      );
  };

  const salvarEdicao = (id, credor) => {
    api
      .post("/credor/update", { credor: { _id: id, nome: credor.nome,tipo: credor.tipo, cnpj: credor.cnpj, cpf: credor.cpf} })
      .then((result) => {
        appContext.toast("Credor editado com sucesso!", { type: "success" });
        toggleSelf();
        refresh();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message.keyPattern.cnpj === 1) {
          appContext.toast("Erro ao editar credor: CNPJ já cadastrado!", {
            type: "error",
          });
          return;
        }
        appContext.toast("Erro ao cadastrar credor", { type: "error" });
      });
  };

  useEffect(() => {
    if (toEdit) return;
    const regex = /([_./-])/g;
    let formattedCnpj = credor.cnpj.replace(regex, "");
    if (formattedCnpj.length < 14) return;
    consultarCNPJ(credor.cnpj, appContext.setLoading)
      .then((result) => {
        setCredor(old => {return {...old, nome: result.data.razao_social}});
      })
      .catch((err) => {
        appContext.toast(
          "Erro ao obter informações do credor, verifique o cnpj ou tente novamente dentro de 1 minuto",
          { type: "error" }
        );
      });
  }, [credor.cnpj]);

  return (
    <div
      className="modal-container sub-modal"
      onMouseDown={(e) => {
        e.target.className === "modal-container sub-modal" && toggleSelf();
      }}
    >
      <form
        action=""
        className="form"
        style={{width: "30rem"}}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3 style={{ margin: "0", padding: "0", color: "white" }}>
          {toEdit ? "Editar Credor" : "Incluir Credor"}
        </h3>
        <div className="form-item">
          <label htmlFor="tipo">Tipo</label>
          <select
            name="tipo"
            id="tipo"
            value={credor.tipo}
            disabled={toEdit ? true : false}
            onChange={(e) =>
              setCredor((old) => {
                return { ...old, tipo: e.target.value };
              })
            }
          >
            <option value="pf">Pessoa Física</option>
            <option value="pj">Pessoa Jurídica</option>
          </select>
        </div>
        <div className="form-item">
          {credor.tipo === "pf" ? (
            <>
              <label htmlFor="cpf">CPF:</label>
              <InputMask
                mask={"999.999.999-99"}
                value={credor.cpf}
                onChange={(e) =>
                  setCredor((old) => {
                    return { ...old, cpf: e.target.value };
                  })
                }
                disabled={toEdit ? true : false}
              />
            </>
          ) : (
            <>
              <label htmlFor="CNPJ">CNPJ</label>
              <InputMask
                disabled={toEdit ? true : false}
                mask={"99.999.999/9999-99"}
                value={credor.cnpj}
                onChange={(e) =>
                  setCredor((old) => {
                    return { ...old, cnpj: e.target.value };
                  })
                }
              />
            </>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="nome">Razão Social</label>
          <input type="text" value={credor.nome} onChange={e => setCredor(old => {return {...old, nome: e.target.value}})}/>
        </div>
      <button className="btn" style={{marginTop: "0.5rem"}} onClick={_ => {
        if(toEdit) {
          salvarEdicao(toEdit._id, credor)
          return
        }
        salvarCredor(credor)
        return
      }}>Salvar</button>
      </form>
    </div>
  );
}
