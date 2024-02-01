import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './App.css'


export default function Home() {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {

                let data = await fetch("https://api.tvmaze.com/search/shows?q=all");
                data = await data.json();

                setMovies(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="container-md bg-body">
                <ol className="movie-list row">

                    {movies.map((movie) => {
                        return (
                            <Link to={`movies/${movie.show.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="col-12 col-lg-6 my-2">
                                <div className="container border px-3 w-100 h-100" key={movie.show.id}>
                                    <li>
                                        <div className="container row gx-5 py-2 ">
                                            <div className="col-12 col-md-5">
                                                <img src={(movie.show.image) ? (movie.show.image.original) : "/not_available.jpg"} alt="" className="img-thumbnail rounded" />
                                            </div>
                                            <div className="col">
                                                <h2 className="fs-2"><u>{movie.show.name}</u></h2>
                                                <span className="badge bg-primary fs-6 my-2">{movie.show.language}</span>
                                                <p className="">
                                                    <span className="fs-6">Genres:</span>
                                                    {movie.show.genres.map(item =>
                                                        <span className="badge bg-info mx-1">{item}</span>
                                                    )}
                                                </p>

                                                <p className="fs-5">Rating<img src="./star.png" style={{ width: "25px", height: '25px', verticalAlign: "text-bottom" }} />: {(movie.show.rating.average) ? `${movie.show.rating.average}/10` : "Not available"}</p>

                                                
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </Link>
                        )
                    })}
                </ol>
            </div>
        </>
    )
}