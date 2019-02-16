import React from "react";
import Movie from "./Movie";

const api_key = "6156345e952a1ea8f63f83962610e7c9";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      error: null,
      isLoaded: false,
      total_pages: 0,
      current_page: 0,
      isLoading: false,
      lastpage: 0,
      hasLoadedAll: false
    };
  }

  componentDidMount() {
    console.log("this.state.movies");
    console.log(this.state);
    document.addEventListener("scroll", this.trackScrolling);
  }

  // lazy loading
  trackScrolling = () => {
    if (this.state.hasLoadedAll) {
      console.log("end");
      return false;
    }

    if (window.pageYOffset + window.innerHeight > document.body.clientHeight) {
      console.log("header bottom reached");

      this.setState({ isLoading: true });
      setTimeout(() => {
        this.getMoviesSinglePage(this.state.current_page + 1);
      }, 2000);
      //document.removeEventListener("scroll", this.trackScrolling);
    }
  };
  addDetailsToMovie = (movie, callback) => {
    return new Promise((resolve, reject) => {
      // console.log(movie);
      const url = `https://api.themoviedb.org/3/movie/${
        movie.id
      }?api_key=${api_key}`;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(
          result => {
            console.log(result);
            movie.details = result;
            this.setState(prevState => {
              movies: [...prevState.movies, movie];
            });
            callback(movie);
            resolve();
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
            reject();
          }
        );
    });
  };
  sortMoviesByReleaseDate = () => {
    let movies = this.state.movies;

    movies.sort(function(a, b) {
      return a.release_date < b.release_date ? -1 : 1;
    });
    this.setState({ movies });
    // release_date
  };
  removeLowPopularityMovies = () => {
    let movies = this.state.movies;
    var i;
    for (i = 0; i < movies.length; i++) {
      if (movies[i].popularity < 10) {
        movies.pop(i);
      }
    }
    this.setState({ movies });
  };
  hasLowPopularityMovie = () => {
    var i;
    for (i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].popularity < 10) {
        return true;
      }
    }
    return false;
  };

  getMoviesSinglePage = page_num => {
    const year = new Date().getFullYear();
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=6156345e952a1ea8f63f83962610e7c9&language=en-US&sort_by=popularity.desc&include_video=false&page=${page_num}&primary_release_year=${year}`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          console.log("result.page");
          console.log(result.page);

          this.setState(prevState => ({
            isLoaded: true,
            movies: [...prevState.movies, ...result.results],
            total_pages: result.total_pages,
            current_page: result.page
          }));
          console.log(this.hasLowPopularityMovie());
          if (
            page_num >= this.state.total_pages ||
            this.hasLowPopularityMovie()
          ) {
            // console.log("lastpage");
            // console.log(page_num);
            this.setState({ hasLoadedAll: true });
            this.removeLowPopularityMovies();
            this.sortMoviesByReleaseDate();
            console.log(this.state);
            return false;
          } else {
            console.log(this.state);

            return false;
            // this.getMoviesByPage(page_num + 1);
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  getMoviesByPage = page_num => {
    const year = new Date().getFullYear();
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=6156345e952a1ea8f63f83962610e7c9&language=en-US&sort_by=popularity.desc&include_video=false&page=${page_num}&primary_release_year=${year}`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          // console.log(result);

          this.setState(prevState => ({
            isLoaded: true,
            movies: [...prevState.movies, ...result.results],
            total_pages: result.total_pages
          }));
          console.log(this.hasLowPopularityMovie());
          if (
            page_num >= this.state.total_pages ||
            this.hasLowPopularityMovie()
          ) {
            this.removeLowPopularityMovies();
            this.sortMoviesByReleaseDate();
            console.log(this.state.movies);
            return false;
          } else {
            this.getMoviesByPage(page_num + 1);
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  componentWillMount() {
    // document.removeEventListener("scroll", this.trackScrolling);

    // this.getMoviesByPage(1);

    //--for single record test purpose--

    const movies = [
      {
        vote_count: 0,
        id: 501121,
        video: false,
        vote_average: 0,
        title: "The Queen of Spades",
        popularity: 11.305,
        poster_path: "/6Q9HloaX7PQN6tkqFpAv5qE3fkP.jpg",
        original_language: "ru",
        original_title: "La dame de pique",
        genre_ids: [10402],
        backdrop_path: null,
        adult: false,
        overview:
          "The dark world of Tchaikovsky’s penultimate operatic masterpiece Queen of Spades hinges on obsession, greed, and a secret in winning at cards… In 2005, the Opéra Bastille mounted a compelling production featuring Vladimir Galouzine as the mad lover Hermann, Hasmik Papian as the doomed Lisa, and Irina Bogatcheva as the mysterious Comtesse.",
        release_date: "2019-01-22"
      },
      {
        vote_count: 0,
        id: 440472,
        video: false,
        vote_average: 0,
        title: "The Queen of Spades 2",
        popularity: 10.305,
        poster_path: "/6Q9HloaX7PQN6tkqFpAv5qE3fkP.jpg",
        original_language: "ru",
        original_title: "La dame de pique",
        genre_ids: [10402],
        backdrop_path: null,
        adult: false,
        overview:
          "The dark world of Tchaikovsky’s penultimate operatic masterpiece Queen of Spades hinges on obsession, greed, and a secret in winning at cards… In 2005, the Opéra Bastille mounted a compelling production featuring Vladimir Galouzine as the mad lover Hermann, Hasmik Papian as the doomed Lisa, and Irina Bogatcheva as the mysterious Comtesse.",
        release_date: "2019-03-22"
      }
    ];

    // this.setState({ movies });
    this.getMoviesSinglePage(1);
    console.log(this.state.movies);
  }

  handleOpenModal = movie => {
    console.log(movie);
  };
  render() {
    const { isLoading, hasLoadedAll } = this.state;
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <div className="mv-container mv-align-center">
          {this.state.movies.map(movie => {
            return (
              <div>
                <Movie movie={movie} key={movie.id} />
              </div>
            );
          })}
        </div>

        {isLoading && !hasLoadedAll ? (
          <div>
            <i class="fas fa-spinner fa-3x fa-spin" />{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
