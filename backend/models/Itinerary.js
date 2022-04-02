const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  author: {
    name: { type: String, required: true },
    photo: { type: String, required: true },
  },
  title: { type: String, required: true },
  photos: { type: String, required: true },
  descripcion: { type: String, required: true },
  price: { type: Number, required: true, min: 1, max: 5 },
  duration: { type: Number, required: true, min: 0 },
  hashtags: [{ type: String, required: true }],
  likes: { type: Array, required: true, default: [] },
  cityId: { type: mongoose.Types.ObjectId, ref: "ciudades", required: true },
  comments: [
    {
      comment: { type: String },
      userID: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    },
  ],
});
const Itinerary = new mongoose.model("itinerarios", itinerarySchema);
module.exports = Itinerary;
