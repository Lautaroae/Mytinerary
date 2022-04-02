import axios from "axios";

const citiesActions = {
  fetchApiData: () => {
    return async (dispatch, getState) => {
      const response = await axios.get("https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allcities");
      dispatch({ type: "fetch", payload: response.data.response.ciudades });
      console.log(response);
    };
  },

  cargarCiudades: (ciudad, pais, descripcion, img) => {
    return async (dispatch, getState) => {
      const response = await axios.post("https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allcities", {
        ciudad,
        pais,
        descripcion,
        img,
      });
      dispatch({
        type: "add_city",
        payload: response.data.response.ciudades,
      });
    };
  },

  borrarCiudad: (id) => {
    return async (dispatch, getState) => {
      const response = await axios.post("https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allcities");
      dispatch({
        type: "remove_cities",
        payload: response.data.response.ciudades,
      });
    };
  },

  modificarCiudad: (id, ciudad, pais, descripcion, img) => {
    return async (dispatch, getState) => {
      const response = await axios.put("https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allcities", {
        ciudad,
        pais,
        descripcion,
        img,
        id,
      });
      dispatch({
        type: "modify_city",
        payload: response.data.ciudades,
      });
    };
  },
  obtenerUnaCiudad: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allcities/${id}`);
      return res.data.response;
    };
  },

  filtroCiudad: (ciudades, value) => {
    return (dispatch, getState) => {
      dispatch({ type: "filtroCiudad", payload: { ciudades, value } });
    };
  },
};
export default citiesActions;
