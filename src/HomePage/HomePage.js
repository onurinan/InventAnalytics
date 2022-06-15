import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import "./homepage.css";

const HomePage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("pokemon");
  const [searchYear, setSearchYear] = useState("");
  const [searchType, setSearchType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let { totalResults } = data;

  const handleFetch = useRef(() => {});

  handleFetch.current = async () => {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL +
        process.env.REACT_APP_API_KEY +
        `&s=${searchKey}&y=${searchYear}&type=${searchType}&page=${currentPage}`
    );

    setData(res.data);

    setLoading(false);
  };

  useEffect(() => {
    handleFetch.current();
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const handleYear = (e) => {
    setSearchYear(e.target.value);
  };

  const handleType = (e) => {
    setSearchType(e.target.value);
  };

  const handleNextPage = async () => {
    setCurrentPage(currentPage + 1);
    setLoading(true);

    handleFetch.current();
  };

  const handlePreviousPage = async () => {
    setCurrentPage(currentPage - 1);
    setLoading(true);

    handleFetch.current();
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="header">
        <input
          className="header-input"
          type="text"
          placeholder="search"
          onInput={handleSearch}
          defaultValue={searchKey}
        />
        <input
          className="header-input"
          type="text"
          maxLength="4"
          placeholder="year"
          onInput={handleYear}
          defaultValue={searchYear}
        />
        <select
          className="header-input"
          name="types"
          id="types"
          onChange={handleType}
        >
          <option value="">-- Type --</option>
          <option value="movie">movie</option>
          <option value="series">series</option>
          <option value="episode">episode</option>
        </select>
        <button onClick={handleFetch.current}>Ara</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Type</th>
            <th>Year</th>
            <th>imdbID</th>
          </tr>
        </thead>
        <tbody>
          {data.Search
            ? data.Search.map((item, index) => (
                <tr key={index}>
                  <td className="poster-cell">
                    <img src={item.Poster} alt="Poster" className="poster" />
                  </td>
                  <td>
                    <Link to={item.imdbID} className="title">
                      {item.Title}
                    </Link>
                  </td>
                  <td>{item.Type}</td>
                  <td>{item.Year}</td>
                  <td>{item.imdbID}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        totalResults={totalResults}
      />
    </>
  );
};

export default HomePage;
