const mongoose = require("mongoose");

const ciudadesSchema = new mongoose.Schema({
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  descripcion: { type: String, required: true },
  img: { type: String, required: true },
});
const Ciudades = new mongoose.model("ciudades", ciudadesSchema);
module.exports = Ciudades;
