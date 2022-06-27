import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Movies from "./Movies/Movies";
import Randomiser from "./Randomiser/Randomiser";
import TvShows from "./TvShows/TvShows";
import Nav from "./Home/Nav";

const App = () => (
  <Router>
    <Nav />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/randomiser" element={<Randomiser />} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/tv" element={<TvShows />} />
    </Routes>
  </Router>
);

export default App;
