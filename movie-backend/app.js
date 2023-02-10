const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movieRouter = require("./routes/movieRoutes");
const cors = require("cors");
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

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	req.session.user = null;
	console.log(req.session);
	res.send("Home");
});

//ROUTES
app.use("/api/v1/", movieRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
