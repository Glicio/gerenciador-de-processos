const CredorSchema = require("./schemas/CredorSchema");
const ProcessoSchema = require("./schemas/ProcessoSchema");
const StatusSchema = require("./schemas/StatusSchema");

const mongoose = require("mongoose");
const UserSchema = require("./schemas/UserSchema");
const User = mongoose.model("User", UserSchema);
const Processo = mongoose.model("Processo", ProcessoSchema);
const Credor = mongoose.model("Credor", CredorSchema);
const Status = mongoose.model("Status", StatusSchema);
const bcrypt = require("bcrypt");

const createUser = async (cpf, password, secretarias) => {
  const salt = await bcrypt.genSalt(10);
  const userToCreate = new User({
    cpf,
    passwordHash: await bcrypt.hash(password, salt),
    secretarias: secretarias,
  });
  return userToCreate.save();
};
//processo
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
  if (query.status && query.status !== ""){
    staticFilters.push({ status: new RegExp(query.status, "i") });
  }
  if(query.data && query.data !== ""){
    staticFilters.push({ dataEmpenho: new RegExp(query.data, "i") });
  }
  if(query.aPagar){
    staticFilters.push({ $where: function() {
      if(isNaN(this.valorLiquido)) return false
      if(!isNaN(this.valorPago) && (this.valorLiquido > this.valorPago)) return true
      if(!isNaN(this.valorLiquido) && isNaN(this.valorPago)) return true
    } });
  }

  if (staticFilters.length > 0) {
    var filter = {      
      $or: [
        { "credor.nome": search },
        { "credor.cnpj": search },
        { "credor.cpf": search},
        { obs: search },
      ],
      $and: [
        ...staticFilters
      ]

    };
  } else {
    var filter = {
      $or: [
        { "credor.nome": search },
        { "credor.cnpj": search },
        { "credor.cpf" : search},
        { obs: search },
      ],
    };
  }
  const result = await Processo.find(filter);
  return result;
};

const deletProcesso = async (id) => {
  return Processo.deleteOne({_id: id})
}

const updateProcesso = async (processo) => {
  const update = await Processo.updateOne({_id: processo._id}, processo)

  return update
}
//end processo
//Credor
const createCredor = async (credor) => {
  const credorToCreate = credor.tipo === "pf" ? Credor({ tipo: credor.tipo, cpf: credor.cpf, nome: credor.nome }) : Credor({ tipo: credor.tipo, cnpj: credor.cnpj, nome: credor.nome })
  const check = credor.tipo === "pf" ? await Credor.findOne({cpf: credor.cpf}) : await Credor.findOne({cnpj: credor.cnpj})
  if (check) return
  return await credorToCreate.save();
};

const getCredores = async (search) => {
  const credores = await Credor.find({
    $or: [{ nome: new RegExp(search, "i") }, { cnpj: new RegExp(search, "i") }, {cpf: new RegExp(search, "i")}, {tipo: new RegExp(search, "i")}],
  }).limit(5);
  return credores;
};

const getAllCredores = async () => {
  const credores = await Credor.find()
  return credores
}

const updateCredor = async (credor) => {
  const update = await Credor.updateOne({_id: credor._id},{...credor})
  return update
}

const deleteCredor = async (id) => {
  const credorToDelete = await Credor.deleteOne({_id: id})
  return credorToDelete
}

//end credor
const createStatus = async (descricao) => {
  const statusToCreate = Status({ descricao: descricao });
  return statusToCreate.save();
};

const getStatus = async (descricao) => {
  const status = await Status.find({
    descricao: new RegExp(descricao, "i"),
  }).limit(10);
  return status;
};

module.exports.createCredor = createCredor;
module.exports.getCredores = getCredores;
module.exports.createProcesso = createProcesso;
module.exports.getProcessos = getProcessos;
module.exports.createUser = createUser;
module.exports.getStatus = getStatus;
module.exports.createStatus = createStatus;
module.exports.getAllCredores = getAllCredores;
module.exports.deletProcesso = deletProcesso;
module.exports.deleteCredor = deleteCredor;
module.exports.updateCredor = updateCredor;
module.exports.updateProcesso = updateProcesso;