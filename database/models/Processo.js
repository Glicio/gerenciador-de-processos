const mongoose = require("mongoose");
const ProcessoSchema = require("../schemas/ProcessoSchema");
const Processo = mongoose.model("Processo", ProcessoSchema);

const createProcesso = async (processoToCreate) => {
  if (processoToCreate.tipo === "ordinario") {
    var newProcess = {
      credor: processoToCreate.credor,
      dataEmpenho: processoToCreate.dataEmpenho,
      tipo: processoToCreate.tipo,
      descricao: processoToCreate.descricao,
      valorLiquido: processoToCreate.valor,
      valorEmpenho: processoToCreate.valor,
      status: processoToCreate.status,
      obs: processoToCreate.obs,
    };
  } else {
    var newProcess = {
      credor: processoToCreate.credor,
      dataEmpenho: processoToCreate.dataEmpenho,
      tipo: processoToCreate.tipo,
      descricao: processoToCreate.descricao,
      valorEmpenho: processoToCreate.valor,
      status: processoToCreate.status,
      obs: processoToCreate.obs,
    };
  }
  const saveProcesso = new Processo(newProcess);
  return saveProcesso.save();
};

const getProcessos = async (query, page, limit) => {
  page = page ? page : 1;
  limit = limit ? limit : 20;
  let staticFilters = [];
  const search = new RegExp(query.search, "i");
  if (query.tipo && query.tipo !== "") {
    staticFilters.push({ tipo: new RegExp(query.tipo, "i") });
  }
  if (query.status && query.status !== "") {
    staticFilters.push({ status: new RegExp(query.status, "i") });
  }
  if (query.data && query.data !== "") {
    staticFilters.push({ dataEmpenho: new RegExp(query.data, "i") });
  }
  if (staticFilters.length > 0) {
    var filter = {
      $or: [
        { "credor.nome": search },
        { "credor.cnpj": search },
        { "credor.cpf": search },
        { obs: search },
      ],
      $and: [...staticFilters],
    };
  } else {
    var filter = {
      $or: [
        { "credor.nome": search },
        { "credor.cnpj": search },
        { "credor.cpf": search },
        { obs: search },
      ],
    };
  }
  const result = await Processo.find(filter);
  return result;
};

const deletProcesso = async (id) => {
  return Processo.deleteOne({ _id: id });
};

module.exports = {createProcesso, getProcessos, deletProcesso}
