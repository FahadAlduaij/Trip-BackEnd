const { model, Schema } = require("mongoose");

const UserSchema = Schema(
  {
    username: { type: String, require: true, unique: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
