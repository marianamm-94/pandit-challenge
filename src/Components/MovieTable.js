import React from "react";
import Axios from "axios";
import { useState } from "react";
import '../App.css';
import MovieDetails from "./MovieDetails";
import InfiniteScroll from "react-infinite-scroller";

function MovieTable() {
  const [movies, setMovies] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [top10Revenue, setTop10Revenue] = useState(false);
  const [top10RevenueYear, setTop10RevenueYear] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const PAGE_SIZE = 30;
  const currentYear = new Date().getFullYear();
  const startYear = 2006;
  const years = [];
  const [selectedYear, setSelectedYear] = useState(0);

  for (let i = currentYear; i >= startYear; i--) {
    years.push(i);
  }
  const fetchMovies = () => {
    if (isFetching || top10Revenue || top10RevenueYear) return;
    setIsFetching(true);
    Axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies`, {
      params: { page: page, size: PAGE_SIZE },
    })
      .then((res) => {
        setMovies([...movies, ...res.data.content]);

        setHasMore(!res.data.last);
        setPage(page + 1);
        setIsFetching(false);
      })
      .catch((err) => setIsFetching(false));
  };

  const showMovieDetails = async (movieId) => {
    await Axios.get(
      `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movieId}`
    )
      .then((response) => {
        if (response.status === 200) {
          setModalShow(true);
          setMovieDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const topRevenue = async (year) => {
    setMovies([]);
    year && setSelectedYear(year);
    year ? setTop10Revenue(false) : setTop10RevenueYear(false);
    setIsFetching(true);
    await Axios.get(
      "http://movie-challenge-api-xpand.azurewebsites.net/api/movies",
      { params: { start: year, end: year } }
    )
      .then((response) => {
        if (response.status === 200) {
          let top10Movies = response.data.content;
          top10Movies.sort(function (a, b) {
            if (a.revenue > b.revenue) return -1;
            if (a.revenue < b.revenue) return 1;
            return 0;
          });
          top10Movies = top10Movies.slice(0, 10);
          setMovies(top10Movies);
          year ? setTop10RevenueYear(true) : setTop10Revenue(true);
          setIsFetching(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  };

  const resetMovieList = () => {
    setMovies([]);
    setTop10Revenue(false);
    setTop10RevenueYear(false);
    setSelectedYear(0);
    setPage(0);
    setHasMore(true);
  };

  return (
    <>
      <div className="row revenue-buttons">
        <button
          type="button"
          className={
            top10Revenue
              ? 'revenue-button-selected revenue-button'
              : 'revenue-button'
          }
          onClick={() => topRevenue()}
        >
          Top 10 Revenue
        </button>
      
        <button
          type="button"
          className={
            top10RevenueYear
              ? 'revenue-button-selected revenue-button ms-3'
              : 'revenue-button ms-3'
          }
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {top10RevenueYear ? `Top 10 Revenue ${selectedYear}` : "Top 10 Revenue per Year"}
        </button>
        
        <ul className="dropdown-menu menu-years">
          <p className="dropdown-title">Select a year</p>
          {years.map((year) => (
            <li key={year}>
              <button
                className="dropdown-item"
                onClick={() => topRevenue(year)}
              >
                {year}
              </button>
            </li>
          ))}
        </ul>
    
        {top10Revenue || top10RevenueYear ? (
          <button className="icon-button" onClick={() => resetMovieList()}>
            <img src="/reload.svg" alt="reload icon" />
          </button>
        ) : null}
      </div>
      <div className="container movie-list mb-4">
        <div className="row movie-list-header ">
          <div className="col-1">RANKING</div>
          <div className="col-6">TITLE</div>
          <div className="col-2">YEAR</div>
          <div className="col-2">REVENUE</div>
          <div className="col-1"></div>
        </div>
        <InfiniteScroll
          loadMore={fetchMovies}
          hasMore={hasMore && !isFetching && !top10Revenue && !top10RevenueYear}
        >
          {movies &&
            movies.map((movie) => (
              <div className="row movie-list-row" key={movie.id}>
                <div
                  className="col-1 movie-list-content"
                  style={{ textAlign: 'center' }}
                >
                  {movie.rank}
                </div>
                <div className="col-6 movie-list-content">{movie.title}</div>
                <div className="col-2 movie-list-content">{movie.year}</div>
                <div className="col-2 movie-list-content">
                  {movie.revenue !== null ? `$ ${movie.revenue}M` : "-"}
                </div>
                <div className="col-1 movie-list-content">
                  <button
                    className="icon-button"
                    onClick={() => showMovieDetails(movie.id)}
                  >
                    <img src="/eyeicon.svg" alt="eye icon" />
                  </button>
                </div>
              </div>
            ))}
        </InfiniteScroll>  
      </div>
      {modalShow && (
        <MovieDetails
          movieDetails={movieDetails}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}
export default MovieTable;
