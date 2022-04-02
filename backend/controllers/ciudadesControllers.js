const Ciudades = require("../models/ciudades");

const ciudadesController = {
  obtenerCiudades: async (req, res) => {
    let ciudades;
    let error = null;

    try {
      ciudades = await Ciudades.find();
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { ciudades },
      success: error ? false : true,
      error: error,
    });
  },

  cargarCiudad: async (req, res) => {
    console.log(req, body);
    const { ciudad, pais, descripcion, img } = req.body.dataImput;
    new Ciudades({
      ciudad: ciudad,
      pais: pais,
      // img:img,
      descripcion: descripcion,
    })
      .save()
      .then((respuesta) => respuesta.json({ respuesta }));
  },
  borrarCiudad: async (req, res) => {
    const id = req.params.id;

    await Ciudades.findOneAndDelete({ _id: id });
  },
  obtenerCiudad: async (req, res) => {
    const id = req.params.id;
    let ciudad;
    let error = null;
    try {
      ciudad = await Ciudades.findOne({ _id: id });
    } catch (err) {
      error = err;
      console.log(error);
    }

    res.json({
      response: error ? "error" : { ciudad },
      success: error ? false : true,
      error: error,
    });
  },

  modificarCiudad: async (req, res) => {
    const id = req.params.id;
    const ciudad = req.body.dataImput;

    let ciudaddb = await Ciudades.findOneAndUpdate({ _id: id }, ciudad);
    console.log(ciudaddb);
  },
};

module.exports = ciudadesController;
