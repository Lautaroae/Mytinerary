const Router = require("express").Router();

const {
  obtenerCiudades,
  cargarCiudad,
  borrarCiudad,
  modificarCiudad,
  obtenerCiudad,
} = require("../controllers/ciudadesControllers");

const validator = require("../config/validator");

const userController = require("../controllers/userController");

const { signUp, signIn, signOut, verifyEmail, verifyToken } = userController;

const passport = require("../config/passport");

const {
  getAllItinerary,
  getItineraryId,
  getItinerarCityId,
  addItinerary,
  deteleItinerary,
  modifyItinerary,
  deleteComment,
  modifyComment,
  addComment,
  likeDislike,
} = require("../controllers/itineraryContoller");

const {
  getActivitiesByItineraryId,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
} = require("../controllers/activityController");

// ciudades

Router.route("/allcities").get(obtenerCiudades).post(cargarCiudad);

Router.route("/allcities/:id")
  .delete(borrarCiudad)
  .put(modificarCiudad)
  .get(obtenerCiudad);
// itinerarios
Router.route("/allItinerary")
  .get(getAllItinerary)
  .post(addItinerary)
  .get(getItineraryId);

Router.route("/allItinerary/:id")
  .get(getItinerarCityId)
  .delete(deteleItinerary)
  .put(modifyItinerary);

// sign up sign in
Router.route("/auth/signUp").post(validator, signUp);

Router.route("/auth/signIn").post(signIn);

Router.route("/auth/signOut").post(signOut);

Router.route("/verify/:uniqueString").get(verifyEmail);

Router.route("/auth/signInToken").get(
  passport.authenticate("jwt", { session: false }),
  verifyToken
);
// actividades
Router.route("/itinerary/activity/:itineraryId") //
  .get(getActivitiesByItineraryId)
  .post(addActivity);

Router.route("/activity/:id")
  .get(getActivityById)
  .put(updateActivity)
  .delete(deleteActivity);

Router.route("/itinerary/activity").get(getAllActivities);

// likes

Router.route("/itinerary/like/:id")
  .put(passport.authenticate("jwt", { session: false }),
    likeDislike
  );

// comentarios

Router.route("/allItinerary/comment/:id")
  .delete(passport.authenticate("jwt", { session: false }), deleteComment)
  .put(passport.authenticate("jwt", { session: false }), modifyComment)

Router.route("/allItinerary/comment")
  .post(passport.authenticate("jwt", { session: false }), addComment);

module.exports = Router;
