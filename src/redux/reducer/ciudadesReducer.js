const initialState = {
  ciudades: [],
  filterApidata: [],
  auxiliar: [],
};
const ciudadesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetch":
      console.log(action.payload);
      return {
        ...state,
        ciudades: action.payload,
        filterApidata: action.payload,
      };
    case "get_all_cities":
      return {
        ...state,
        ciudades: action.payload,
      };
    case "add_city":
      return {
        ...state,
        ciudades: [...state.ciudades, action.payload],
      };
    case "remove_cities":
      return {
        ...state,
        ciudades: state.ciudades.filter(
          (ciudad) => ciudad._id !== action.payload
        ),
      };
    case "modify_city":
      const newCiudades = state.cities.map((ciudad) => {
        if (ciudad._id === action.payload._id) {
          return action.payload;
        }
        return ciudad;
      });
      return {
        ...state,
        ciudades: newCiudades,
      };

    case "filtroCiudad":
      const filtered = action.payload.ciudades.filter((data) =>
        data.ciudad
          .toString()
          .trim()
          .toLowerCase()
          .startsWith(action.payload.value.trim().toLowerCase())
      );
      return {
        ...state,
        filterApidata: filtered,
      };

    case "obtenerUnaCiudad":
      let unaCiudad = state.ciudades.find(
        (ciudad) => ciudad._id === action.payload
      );
      return {
        ...state,
        auxiliar: unaCiudad,
      };

    default:
      return state;
  }
};
export default ciudadesReducer;
