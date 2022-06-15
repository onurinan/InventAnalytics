import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import "./app.css";
import MovieDetail from "./MovieDetail/MovieDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/:imdbID" element={<MovieDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
