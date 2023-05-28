const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  words: [
    {
      id: String,
      en: String,
      kr: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
