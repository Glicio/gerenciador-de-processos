const mongoose = require("mongoose");
const UserSchema = require("../schemas/UserSchema");
const User = mongoose.model("User", UserSchema);
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


