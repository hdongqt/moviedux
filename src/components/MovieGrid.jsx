import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
export default function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  useEffect(() => {
    fetch("movies.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  const matchesGenre = (movie) => {
    return (
      selectedGenre === "all" ||
      movie.genre.toLowerCase() === selectedGenre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie) => {
    switch (selectedRating) {
      case "all":
        return true;
      case "good":
        return movie.rating >= 8;
      case "ok":
        return movie.rating >= 5 && movie.rating < 8;
      case "bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      matchesGenre(movie) && matchesSearchTerm(movie) && matchesRating(movie)
    );
  });

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="all">All</option>
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <labe>Rating</labe>
          <select
            className="filter-dropdown"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <option value="all">All</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
            <option value="bad">Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies &&
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}
