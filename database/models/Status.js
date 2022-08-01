const mongoose = require("mongoose");
const StatusSchema = require("../schemas/StatusSchema");
const Status = mongoose.model("Status", StatusSchema);

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

module.exports = {getStatus, createStatus}