import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import './App.css'

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate=useNavigate();


    useEffect(() => {
        const fetchMovie = async () => {
            try {

                let data = await fetch(`https://api.tvmaze.com/shows/${id}`);
                data = await data.json();

                setMovie(data);
                const name = data.name;
                const lang = data.language
                localStorage.setItem('sharedData', JSON.stringify({ name, lang }))
            } catch (err) {
                console.log(err);
            }
        }
        fetchMovie();
    }, [])

    function handleBack(){
        navigate('/');
    }

    return (
        (movie) ?

            (
                <div className="container-md bg-body py-3" style={{ minHeight: "89vh" }}>
                    <button onClick={handleBack} className="my-2 bg-body border-0 fs-5">{`⬅Back`}</button>
                    <div className="row ">
                        <div className="col-8 col-md-4 col-lg-3 mx-4">
                            <img src={(movie.image) ? (movie.image.original) : "/not_available.jpg"} alt="" className="w-100 " />
                        </div>
                        <div className="col-lg-6 col-md-7">
                            <h1 className="">{movie.name}</h1>
                            <p dangerouslySetInnerHTML={{ __html: movie.summary }} className="summary"></p>

                            {
                                movie.officialSite ?
                                    <div className="my-5 d-inline-block me-4">
                                        <a href={movie.officialSite} target="blank" className="bg-info bg-opacity-10 border border-success p-3 fs-5 text-decoration-none text-success rounded">▶Watch Now</a>
                                    </div>
                                    : <></>
                            }

                            <div className="my-5 d-inline-block">
                                <Link to={'/movies/book'} className="bg-primary bg-opacity-10 border border-primary p-3 fs-5 text-decoration-none text-primary rounded">Book Movie</Link>
                            </div>

                            <div className="bg-light p-2 px-4 mt-5">
                                <h3>Show Info</h3>

                                <p><b>Language</b>: {movie.language}</p>
                                <p><b>Status</b>: {movie.status}</p>

                                {
                                    movie.status !== "In Development" ?
                                        (<p><b>Average Runtime</b>: {movie.averageRuntime} minutes</p>)
                                        : <></>
                                }


                                <p><b>Schedule</b>: {(movie.schedule.time !== "") ? `${movie.schedule.time} on (${movie.schedule.days.join(',')})` : "Not available"}</p>

                                <p><b>Genres</b>: {movie.genres.join(' | ')}</p>

                                {
                                    movie.network ?
                                        <p><b>Network</b>: <a href={movie.network.officialSite}>{movie.network.name} </a> {(movie.network.country) ? `(${movie.network.country.code})` : ""}</p>
                                        : <></>
                                }

                                {
                                    movie.webChannel ?
                                        <p><b>Web channel</b>: <a href={movie.webChannel.officialSite}>{movie.webChannel.name} </a>{(movie.webChannel.country) ? `(${movie.webChannel.country.code})` : ""}</p>
                                        : <></>
                                }

                                <p className="fs-5"><img src='/star.png' alt="Rating" style={{ width: "25px", height: '25px', verticalAlign: "text-bottom" }} />: {(movie.rating.average) ? `${movie.rating.average}/10` : "Not available"}</p>

                                
                            </div>
                        </div>
                    </div>

                </div>
            ) : <></>

    )
}