const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: String,
	thumbnail: String,
	year: Number,
	genre: [String],
	summary: String,
	director: String,
});

module.exports = mongoose.model("Movie", movieSchema);
