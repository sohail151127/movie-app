import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard/MovieCard'
import { MovieContext } from '../context/MoviesContext'

//below is the base url
const baseUrl = "https://api.themoviedb.org/3"

//at the end of the ulr we can add "end points"
//for example if i want to search for "movies", i will write in this way by reading docs
const moviesUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_Movie_API_KEY}`

const Home = () => {

  const {movies, setMovies} = useContext(MovieContext)

  //function to make request for movies
  const fetchMovies =async(url)=>{

    const res = await axios.get(url);
    // console.log("res:",res)
    setMovies(res.data.results)
    console.log("res.data.results:",res.data.results)
  }

//useEffect will render only when the home page will refresh thats why we called "fetchMovies" inside it to avoid infinite loop
  useEffect(() => {
    fetchMovies(moviesUrl);
  }, [])



  return (
    <div 
    className='d-flex justify-content-center flex-wrap' 
    style={{
      "marginTop":"60px",
      background: "#555"
    }}>
      {
        movies?.map((movie,i)=> <MovieCard key={movie.id} movie={movie}/> )}
    </div>
  )
}

export default Home