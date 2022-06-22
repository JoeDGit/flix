import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Movies from "./Movies";
import Randomiser from "./Randomiser";
import TvShows from "./TvShows";

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/randomiser" element={<Randomiser />} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/tv" element={<TvShows />} />
    </Routes>
  </Router>
);

export default App;