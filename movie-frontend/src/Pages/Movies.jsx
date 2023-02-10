import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useMovies } from "../Contexts/movieContext";
export default function Movies() {
	const [list, setList] = useState([]);
	const [movie, setMovie] = useState();
	const [show, setShow] = useState(false);
	const { getMovie } = useMovies();
	async function fetchLists() {
		const response = await axios.get("http://localhost:8000/api/v1/movies", {
			headers: { AccessControlAllowOrigin: "*" },
		});
		setList(response.data.data);
	}
	async function fetchMovie(search) {
		console.log(search);
		const result = await getMovie(search);
		console.log(result);
		setMovie(result);
		setShow(true);
	}
	useEffect(() => {
		fetchLists();
	}, []);
	return (
		<div className="container">
			<h1>Movies</h1>
			<div className="container row p-2">
				{list &&
					list.map((mov) => {
						return (
							<div className="card m-2 p-1" style={{ width: "150px" }}>
								<img style={{ height: "150px" }} src={mov.thumbnail} />
								<div className="mt-2">
									<h5>{mov.title}</h5>
									<a
										style={{
											cursor: "pointer",
										}}
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
			{movie && (
				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title id="example-custom-modal-styling-title">
							{movie.title}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex justify-content-center flex-column align-items-center">
							<img className="" src={movie.thumbnail} />
							<p className="text-muted fs-3">
								<strong>year:</strong> {movie.year}
							</p>
							<p>{movie.genre.join("/")}</p>
							<p>
								<i>{movie.director}</i>
							</p>
							<p>
								<strong>{movie.summary}</strong>
							</p>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}
