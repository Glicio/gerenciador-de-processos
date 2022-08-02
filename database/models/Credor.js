const mongoose = require("mongoose");
const CredorSchema = require("../schemas/CredorSchema");
const Credor = mongoose.model("Credor", CredorSchema);

const createCredor = async (credor) => {
  const credorToCreate =
    credor.tipo === "pf"
      ? Credor({ tipo: credor.tipo, cpf: credor.cpf, nome: credor.nome })
      : Credor({ tipo: credor.tipo, cnpj: credor.cnpj, nome: credor.nome });
  const check =
    credor.tipo === "pf"
      ? await Credor.findOne({ cpf: credor.cpf })
      : await Credor.findOne({ cnpj: credor.cnpj });
  if (check) return;
  return await credorToCreate.save();
};

const getCredores = async (search) => {
  const credores = await Credor.find({
    $or: [
      { nome: new RegExp(search, "i") },
      { cnpj: new RegExp(search, "i") },
      { cpf: new RegExp(search, "i") },
      { tipo: new RegExp(search, "i") },
    ],
  }).limit(5);
  return credores;
};

const getAllCredores = async () => {
  const credores = await Credor.find();
  return credores;
};

const updateCredor = async (credor) => {
  const update = await Credor.updateOne({ _id: credor._id }, { ...credor });
  return update;
};

const deleteCredor = async (id) => {
  const credorToDelete = await Credor.deleteOne({ _id: id });
  return credorToDelete;
};

module.exports = {deleteCredor, updateCredor, deleteCredor, getAllCredores, getCredores, createCredor}