import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Home from "./pages/HOME/Home";
import NotFound from "./pages/404";
import Movies from "./pages/MOVIES/Movies";
import Series from "./pages/SERIES/Series";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="series" element={<Series />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
