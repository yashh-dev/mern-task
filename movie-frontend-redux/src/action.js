import axios from "axios";

export const fetchOne = (search, movies) => {
	return async (dispatch, getState) => {
		console.log(movies);
		const movie = movies.find((movie) => movie._id === search);
		if (movie) {
			console.log("not fetched");
			dispatch({ type: "GOT_ONE", payload: movie });
		} else {
			console.log("fetched");
			const res = await axios.get(
				`http://localhost:8000/api/v1/movies/${search}`,
				{
					headers: { AccessControlAllowOrigin: "*" },
				}
			);
			const parsed = JSON.parse(res.data.data);
			movies.push(parsed);
			dispatch({ type: "GOT_ONE", payload: parsed });
			dispatch({ type: "MOVIES_UPDATE", payload: movies });
		}
	};
};
