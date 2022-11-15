// import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetails";
import Login from "./pages/logIn/Login";
import Register from "./pages/register/Register";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { userObserver } from "./firebase";
import { MovieContext } from "./context/MoviesContext";

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    userObserver(setCurrentUser)
  }, [])

  // console.log("process.env.REACT_APP_apiKey:",process.env.REACT_APP_apiKey)
  
  return (
    <AuthContext.Provider value={{currentUser}}>
      <MovieContext.Provider value={{movies, setMovies}}>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/MovieDetail/:id" element={<MovieDetail />} />
          </Routes>
      </MovieContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
