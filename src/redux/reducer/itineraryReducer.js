const initialState = {
  itinerariesData: [],
  auxiliar: [],
  activities: [],
};

const itineraryReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "fetchItineraries":
      return {
        ...state,
        itinerariesData: action.payload,
        auxiliar: action.payload,
      };

    case "GET_ACTIVITIES":
      console.log(action.payload);
      return {
        ...state,
        activities: action.payload,
      };


    default:
      return state;
  }
};

export default itineraryReducer;
