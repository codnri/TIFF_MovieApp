import React from "react";

const Movie = props => {
  return (
    <div>
      <div>{props.movie.title}</div>
      <div>{props.movie.overview}</div>
      <div>{props.movie.genre_ids}</div>
      <div>{props.movie.id}</div>
      escription, genres, tag line (if any), and runtime
    </div>
  );
};

export default Movie;
