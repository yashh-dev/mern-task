const express = require("express");
const mongoose = require("mongoose");
//MONGO CONNECTION
const connectRetry = function () {
	mongoose.set({ strictQuery: true });
	mongoose
		.connect("mongodb://localhost:27017/movies")
		.then(() => {
			console.log("Succesfull Connected to Database");
		})
		.catch((e) => {
			console.log("Problem with mongoose");
			console.log(e);
			setTimeout(connectRetry, 1000);
		});
};
connectRetry();
const Movie = require("./models/movie");
const movies = [
	{
		title: "Ready Player One",
		year: 2018,
		genre: ["Science Fiction", "Action"],
		thumbnail:
			"https://yts.unblockit.bio/imgp/assets/images/movies/ready_player_one_2018/medium-cover.jpg",
		summary:
			"In the year 2045, the real world is a harsh place. The only time Wade Watts (Tye Sheridan) truly feels alive is when he escapes to the OASIS, an immersive virtual universe where most of humanity spends their days. In the OASIS, you can go anywhere, do anything, be anyone--the only limits are your own imagination. The OASIS was created by the brilliant and eccentric James Halliday (Mark Rylance), who left his immense fortune and total control of the Oasis to the winner of a three-part contest he designed to find a worthy heir. When Wade conquers the first challenge of the reality-bending treasure hunt, he and his friends--The High Five--are hurled into a fantastical universe of discovery and danger to save the OASIS.—Warner Bros.",
		director: "Steven Spielberg",
	},
	{
		title: "Tron Legacy",
		year: 2010,
		thumbnail:
			"https://yts.unblockit.bio/imgp/assets/images/movies/TRON_Legacy_2010/medium-cover.jpg",
		genre: ["Action ", " Adventure ", " Fantasy ", " Sci-Fi"],
		summary:
			"In the year 2045, the real world is a harsh place. The only time Wade Watts (Tye Sheridan) truly feels alive is when he escapes to the OASIS, an immersive virtual universe where most of humanity spends their days. In the OASIS, you can go anywhere, do anything, be anyone--the only limits are your own imagination. The OASIS was created by the brilliant and eccentric James Halliday (Mark Rylance), who left his immense fortune and total control of the Oasis to the winner of a three-part contest he designed to find a worthy heir. When Wade conquers the first challenge of the reality-bending treasure hunt, he and his friends--The High Five--are hurled into a fantastical universe of discovery and danger to save the OASIS.—Warner Bros.",
		director: "Steven Spielberg",
	},
];
Movie.deleteMany({});
movies.forEach((m) => {
	const movie = Movie.create(m);
});
