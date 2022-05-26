const mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
  searchTitle: { type: String, index: true },
  count: { type: Number, default: 0 },
  date: {
    type: Date,
    index: true,
    default: new Date(Date.now()).setHours(0, 0, 0, 0),
  },
});
module.exports = mongoose.model("Record", recordSchema);
