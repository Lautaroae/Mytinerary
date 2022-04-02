import axios from "axios";

const commentAction = {
  addComment: (comment) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      const res = await axios.post(
        "https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allItinerary/comment",
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "message",
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success,
        },
      });
      return res;
    };
  },
  modifyComment: (comment) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      const res = await axios.put(
        "https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allItinerary/comment",
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "message",
        payload: {
          view: true,
          message: res.data.message,
          success: res.dara.success,
        },
      });
      return res;
    };
  },
  deleteComment: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      const res = await axios.post(
        `https://mytinerary-aimonetti-lautaro.herokuapp.com/api/allItinerary/comment/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "message",
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success,
        },
      });
      return res;
    };
  },
};

export default commentAction;
