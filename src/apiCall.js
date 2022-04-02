import axios from "axios";

export const getAllCities = async () => {
  try {
    let data = await axios.get("");
    return data;
  } catch (error) {
    throw error;
  }
};
export const cargarDatos = async (dataInputs) => {
  console.log(dataInputs);
  try {
    let data = await axios.post("");
    return data;
  } catch (error) {
    throw error;
  }
};

export const eliminarCiudad = async (id) => {
  console.log(id);
  try {
    let data = await axios.delete("");
    return data;
  } catch (error) {
    throw error;
  }
};

export const modificarCiudad = async (id, dataInputs) => {
  console.log(id, dataInputs);
  try {
    let data = await axios.put("");
    return data;
  } catch (error) {
    throw error;
  }
};
