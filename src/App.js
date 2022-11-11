// import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetails";
import Login from "./pages/logIn/Login";
import Register from "./pages/register/Register";


import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState("")
  return (
    <div>
      <Navbar />
      
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MovieDetail/:id" element={<MovieDetail />} />
    </Routes>

    </div>
  );
}

export default App;
