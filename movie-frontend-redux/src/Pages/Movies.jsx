import axios from "axios";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOne } from "../action";
export default function Movies() {
	const list = useSelector((state) => state.list);
	const result = useSelector((state) => state.movie);
	const movies = useSelector((state) => state.movies);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	async function fetchLists() {
		const response = await axios.get("http://localhost:8000/api/v1/movies", {
			headers: { AccessControlAllowOrigin: "*" },
		});
		console.log(response.data.data);
		dispatch({ type: "FETCH_LIST", payload: response.data.data });
	}
	async function fetchMovie(search) {
		dispatch(fetchOne(search, movies));
	}
	useEffect(() => {
		fetchLists();
	}, []);

	return (
		<div className="container">
			<h1>Movies</h1>
			<div className="container row p-2">
				<div className="col d-flex justify-content-center">
					{list &&
						list.map((mov) => {
							return (
								<div
									className="card m-2 p-1"
									style={{ width: "150px", height: "250px" }}
								>
									<img style={{ height: "150px" }} src={mov.thumbnail} />
									<div className="mt-2">
										<h5>{mov.title}</h5>
										<a
											style={{ cursor: "pointer" }}
											className="link"
											onClick={() => fetchMovie(mov.id)}
										>
											more
										</a>
									</div>
								</div>
							);
						})}
				</div>
				<div className="col">
					{result && (
						<div className="container">
							<h1>{result.title}</h1>
							<img className="" src={result.thumbnail} />
							<p className="text-muted fs-3">{result.year}</p>
							<p>{result.genre.join("/")}</p>
							<p>
								<i>{result.director}</i>
							</p>
							<p>
								<strong>{result.summary}</strong>
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
