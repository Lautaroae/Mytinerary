import axios from "axios";

const userActions = {
  signUp: (userData) => {
    console.log(userData);

    return async (dispatch, getState) => {
      const res = await axios.post("https://mytinerary-aimonetti-lautaro.herokuapp.com/api/auth/signUp", {
        userData,
      });
      console.log(res.data);
      dispatch({
        type: "message",
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success,
        },
      });
    };
  },
  signIn: (logedUser) => {
    return async (dispatch, getState) => {
      const user = await axios.post("https://mytinerary-aimonetti-lautaro.herokuapp.com/api/auth/signIn", {
        logedUser,
      });
      if (user.data.success) {
        localStorage.setItem("token", user.data.response.token);
        dispatch({ type: "user", payload: user.data.response.userData });
      }
      dispatch({
        type: "message",
        payload: {
          view: true,
          message: user.data.message,
          success: user.data.success,
        },
      });
    };
  },
  signOut: (closeuser) => {
    return async (dispatch, getState) => {
      const user = axios.post("https://mytinerary-aimonetti-lautaro.herokuapp.com/api/auth/signOut", {
        closeuser,
      });
      localStorage.removeItem("token")
      dispatch({ type: "user", payload: null });
    };
  },
  verifyToken: (token) => {
    return async (dispatch, getState) => {
      console.log(token);
      const user = await axios.get(
        "https://mytinerary-aimonetti-lautaro.herokuapp.com/api/auth/signInToken",
        { headers: { Authorization: "Bearer " + token } }
        //al lado Bearer va espacio sino no funciona lpm :)
      );
      console.log(user);

      if (user.data.success) {
        dispatch({ type: "user", payload: user.data.response });
        dispatch({
          view: true,
          message: user.data.message,
          success: user.data.success,
        });
      } else {
        localStorage.removeItem("token");
      }
    };
  },
};
export default userActions;
