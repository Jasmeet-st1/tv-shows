import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './Home';
import MovieDetail from './MovieDetail';
import MovieForm from './MovieForm';

function App() {
  return (
    <>
      <nav className="navbar bg-body-tertiary py-3">
        <div className="container-fluid">
          <Link to="/">
            <h1 className="d-inline-block mx-5 navbar-brand mb-0 fs-2">Movies App</h1>
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/movies/:id' element={<MovieDetail />} />
        <Route path='/movies/book/' element={<MovieForm />} />
      </Routes>
    </>
  );
}

export default App;
