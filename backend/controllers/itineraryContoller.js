const Itinerary = require("../models/itinerary");

const itineraryController = {
  getAllItinerary: async (req, res) => {
    let itinerary;
    let error = null;

    try {
      itinerary = await Itinerary.find();
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { itinerary },
      success: error ? false : true,
      error: error,
    });
  },
  getItineraryId: async (req, res) => {
    let itinerary;
    let error = null;
    try {
      itinerary = await findOne({ _id: req.params.id });
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { itinerary },
      success: error ? false : true,
      error: error,
    });
  },
  getItinerarCityId: async (req, res) => {
    let itinerary;
    let error = null;
    let id = req.params.id

    try {
      itinerary = await Itinerary.find({ cityId: id }).populate("comments.userID");
    } catch (err) {
      error = err;
      console.log(error);
    }

    res.json({
      response: error ? "ERROR" : { itinerary },
      success: error ? false : true,
      error: error,
    });
  },
  addItinerary: async (req, res) => {

    const {
      author,
      title,
      photos,
      descripcion,
      price,
      duration,
      hashtags,
      cityId,
      likes,
    } = req.body;
    new Itinerary({
      author: author,
      title: title,
      photos: photos,
      descripcion: descripcion,
      price: price,
      duration: duration,
      hashtags: hashtags,
      cityId: cityId,
      likes: likes,
    })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },
  deteleItinerary: async (req, res) => {
    const id = req.params.id;

    await Ciudades.findOneAndDelete({ _id: id });
  },

  modifyItinerary: async (req, res) => {
    const id = req.params.id;
    const itinerary = req.body.dataImput;

    let itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary);

  },
  addComment: async (req, res) => {
    const { itinerary, comment } = req.body.comment;
    const user = req.user._id;
    try {
      const newComment = await Itinerary.findOneAndUpdate(
        { _id: itinerary },
        { $push: { comments: { comment: comment, userID: user } } },
        { new: true }
      ).populate("comments.userID");

      res.json({
        success: true,
        response: newComment,
        message: "Thanks you for let us your comment",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  modifyComment: async (req, res) => {
    const { commentID, comment } = req.body.comment;
    console.log(req.body);
    const user = req.user._id;
    try {
      const newComment = await Itinerary.findOneAndUpdate(
        { "comments._id": commentID },
        { $set: { "comments.$.comment": comment } },
        { new: true }
      );

      res.json({
        success: true,
        response: { newComment },
        message: "your comment has been modified",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: true,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  deleteComment: async (req, res) => {
    const id = req.params.id;
    const user = req.user._id;
    console.log(id + "id de delete");

    try {
      const deleteComment = await Itinerary.findOneAndUpdate(
        { "comments._id": id },
        { $pull: { comments: { _id: id } } },
        { new: true }
      );

      res.json({
        success: true,
        response: { deleteComment },
        message: "you deleted the comment",
      });
    } catch (error) {
      console.log(error);
      res.json({
        succes: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  likeDislike: async (req, res) => {
    const id = req.params.id;
    const user = (req.user._id).toString()

    let itinerary;
    let error = null;
    let allItineraries;

    try {
      itinerary = await Itinerary.findOne({ _id: id })
      let city = itinerary.cityId

      if (itinerary.likes.includes(user)) {
        await Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })
        allItineraries = await Itinerary.find({ cityId: city })
        res.json({ success: true, response: allItineraries })
      } else {
        await Itinerary.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })
        allItineraries = await Itinerary.find({ cityId: city })
        res.json({ success: true, response: allItineraries })
      }
    } catch (err) {
      error = err
      res.json({ success: false, response: error })
    }
  },
};

module.exports = itineraryController;
