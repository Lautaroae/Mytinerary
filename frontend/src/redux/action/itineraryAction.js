import axios from "axios";

const itineraryAction = {
  fetchearApiData: (id) => {
    { console.log(id) }
    return async (dispatch, getState) => {
      const res = await axios.get(
        `http://localhost:4000/api/allItinerary/${id}`
      );
      dispatch({
        type: "fetchItineraries",
        payload: res.data.response,
      });
    };
  },
  getItinerary: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(
        "http://localhost:4000/api/allItinerary/" + id
      );
      return res;
    };
  },
  likeDislike: (itineraryId) => {
    const token = localStorage.getItem("token");
    return async () => {
      try {
        let response = await axios.put(
          `http://localhost:4000/api/itinerary/like/${itineraryId}`, {}, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    };
  },
  getActivities: (itineraryId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/itinerary/activity/${itineraryId}`
        );
        if (res.data.success) {
          dispatch({ type: "GET_ACTIVITIES", payload: res.data.response });
          return { success: true, error: null };
        } else {
          throw new Error(res.data.error);
        }
      } catch (e) {
        return { success: false, error: e.message };
      }
    };
  },
  getAllActivities: () => {
    console.log("estoy en actividades");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/itinerary/activity`
        );
        if (res.data.success) {
          dispatch({ type: "GET_ACTIVITIES", payload: res.data.response });
          // return { success: true, error: null };
        } else {
          throw new Error(res.data.error);
        }
      } catch (e) {
        return { success: false, error: e.message };
      }
    };
  },
  addComment: (comment) => {
    console.log(comment);
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      const res = await axios.post('http://localhost:4000/api/allItinerary/comment', { comment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(res);
      dispatch({
        type: 'message',
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success
        }
      })
      return res
    }
  },
  modifyComment: (comment) => {

    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      const res = await axios.put(`http://localhost:4000/api/allItinerary/comment/${comment.commentID}`, { comment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch({
        type: 'message',
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success
        }
      })

      return res
    }
  },
  deleteComment: (id) => {

    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      const res = await axios.delete(`http://localhost:4000/api/allItinerary/comment/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      })
      dispatch({
        type: 'DELETE_COMMENT',
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success
        }
      })
      return res
    }
  },
};
export default itineraryAction;
