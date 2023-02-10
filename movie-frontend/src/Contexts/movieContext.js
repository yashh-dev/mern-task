import React, { useContext } from "react";

import axios from "axios";
const movieContext = React.createContext();

export function useMovies() {
	return useContext(movieContext);
}

export function ContextProvider({ children }) {
	const movies = [];

	async function getMovie(search) {
		const movie = movies.find((movie) => movie._id === search);
		if (movie) {
			return movie;
		} else {
			const result = await axios.get(
				`http://localhost:8000/api/v1/movies/${search}`,
				{
					headers: { AccessControlAllowOrigin: "*" },
				}
			);
			const parsed = JSON.parse(result.data.data);
			movies.push(parsed);
			return parsed;
		}
	}

	const value = { getMovie };
	return (
		<movieContext.Provider value={value}>{children}</movieContext.Provider>
	);
}
