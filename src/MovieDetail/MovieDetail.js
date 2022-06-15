import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./moviedetail.css";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const { imdbID } = useParams();

  const handleFetch = async () => {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL +
        process.env.REACT_APP_API_KEY +
        `&i=${imdbID}`
    );

    setMovieDetail(res.data);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-wrapper">
        <img
          src={movieDetail.Poster}
          alt="poster"
          className="movie-detail-img"
        />
        <div className="section">
          <div className="section-header">
            <h1 className="section-header-title">{movieDetail.Title}</h1>
            <div className="section-header-rating-wrapper">
              <span className="section-header-rating">
                {movieDetail.imdbRating}
              </span>
              <i className="bi bi-star-fill star"></i>
            </div>
          </div>
          <p className="section-article">{movieDetail.Plot}</p>
          <p className="section-article">Director : {movieDetail.Director}</p>
          <p className="section-article">Released : {movieDetail.Released}</p>
          <p className="section-article">Runtime : {movieDetail.Runtime}</p>
          <p className="section-article">Type : {movieDetail.Type}</p>
          <p className="section-article">Genre : {movieDetail.Genre}</p>
          <div className="cast">
            <h3 className="cast-title">Cast</h3>
            {movieDetail.Actors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
