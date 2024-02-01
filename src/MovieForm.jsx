import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function MovieForm() {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('sharedData'));
        if (storedData) {
            setData(storedData);
        } else {
            navigate('/');
        }
        console.log(storedData);
    }, []);

    function handleSubmit(e){
        e.preventDefault();
    }

    function handleBack(){
        navigate(-1);
    }

    return (
        <>
            <div className="container-md bg-body min-vh-100 px-5">
                <h1 className="text-center">Book Movie</h1>
                <h1 className="mx-2">{data.name}</h1>
                <h5 className="mx-2 text-primary">{data.lang}</h5>

                <form className="row col-lg-6 col-md-10 col-12 mt-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" required/>
                    </div>
                    <div className="mb-3">
                        <label for="phone" className="form-label">Mobile Number</label>
                        <input type="number" className="form-control" id="phone" required/>
                    </div>
                    <div className="mb-3 w-50 d-block">
                        <label for="seats" className="form-label">Seats</label>
                        <input type="number" className="form-control" id="seats" required/>
                    </div>
                    <div className="w-100">
                        <button type="submit" className="btn btn-primary mx-auto" style={{width:"100px"}}>Submit</button>

                    </div>
                </form>
                <button onClick={handleBack} className="my-2 bg-body border-0 fs-5">{`⬅Back`}</button>
            </div>
        </>
    )
}
