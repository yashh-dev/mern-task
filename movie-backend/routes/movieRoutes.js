const Movie = require("../models/movie.js");
const express = require("express");

const router = express.Router();

router.route("/movies").get(async (req, res) => {
	const movies = await Movie.find({});
	const movies_reduced = movies.map((m) => {
		return { id: m._id, title: m.title, thumbnail: m.thumbnail };
	});
	res.status(200).json({ data: movies_reduced, status: "success" });
});

router.route("/movies/:id").get(async (req, res) => {
	try {
		const { id } = req.params;
		const movie = await Movie.findById(id);
		res.status(200).json({ data: JSON.stringify(movie), status: "success" });
	} catch (e) {
		res.status(200).json({ status: "not found" });
	}
});

module.exports = router;
