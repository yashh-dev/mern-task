import React, { useDebugValue } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import thunk from "redux-thunk";
const listReducer = (state = [], action) => {
	switch (action.type) {
		case "FETCH_LIST":
			console.log("fetchin movies");
			return action.payload;
		default:
			return state;
	}
};

const myMiddleware = (store) => {
	return (next) => {
		return async (action) => {
			const search = action.payload.search;
			const movies = action.payload.movies;
			console.log(movies);
			if (action.type === "FETCH_MOVIE") {
				const movie = movies.find((movie) => movie._id === search);
				if (movie) {
					next({ type: "FETCH_MOVIE", payload: movies });
				} else {
					const res = await axios.get(
						`http://localhost:8000/api/v1/movies/${search}`,
						{
							headers: { AccessControlAllowOrigin: "*" },
						}
					);
					const parsed = JSON.parse(res.data.data);
					movies.push(parsed);
					next({ type: "FETCH_MOVIE", payload: movies });
				}
			} else {
				next(action);
			}
		};
	};
};

const detailsReducer = (state = { genre: [] }, action) => {
	switch (action.type) {
		case "GOT_ONE":
			return action.payload;
		default:
			return state;
	}
};
const moviesReducer = (state = [], action) => {
	switch (action.type) {
		case "MOVIES_UPDATE":
			return action.payload;
		default:
			return state;
	}
};
const rootReducer = combineReducers({
	list: listReducer,
	movie: detailsReducer,
	movies: moviesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
