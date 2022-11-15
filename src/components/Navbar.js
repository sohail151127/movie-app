import axios from "axios";
import React, { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MovieContext } from "../context/MoviesContext";
import { logout } from "../firebase";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate =useNavigate();
  const [search, setSearch] = useState("");
  const {movies, setMovies} = useContext(MovieContext)

  //below is the base url
const baseUrl = "https://api.themoviedb.org/3"

//at the end of the ulr we can add "end points"
//for example if i want to search for "movies", i will write in this way by reading docs about "search movies"
const searchUrl = `${baseUrl}/search/movie?api_key=${process.env.REACT_APP_Movie_API_KEY}&query=`

  const searchHandler=async( )=>{
    const res = await axios.get(`${searchUrl}${search}`);
    // console.log("res:",res)
    setMovies(res.data.results)
    // console.log("res.data.results:",res.data.results)
  }
  //oper hmy zada kuch krna ni pra ku k server khud hi hmy return kr rha movies jo query sy match kr ri, last project ki tra mjy filter method ni lgana para

  const logoutHandler=()=>{
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#070707" }}>

      <div className="container-fluid">

        <Link to="/" className="navbar-brand"> <h4 className="text-danger">React Movie App</h4> </Link>

        <div className="d-flex align-items-center">
          {currentUser?( 
                <>
                <form className="d-flex">
                  <input value={search} onChange={(e)=>setSearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search"/>
                  <button className="btn btn-outline-success" type="button" onClick={(moviesUrl)=>searchHandler(moviesUrl)}>Search</button>
                </form>
                <h4 className="text-capitalize d-inline-block text-warning mx-2">{currentUser?.displayName}</h4>
                <button type="button"
                className="ms-2 btn btn-outline-light" onClick={logoutHandler} >Logout</button>
                </>
          ):(
                <>
                <button type="button" 
                onClick={()=>navigate("/Login")} 
                className="ms-2 btn btn-outline-light">Login</button>

                <button type="button"
                onClick={()=>navigate("/Register")} 
                className="ms-2 btn btn-outline-light">Register</button>
                </>
          )}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
