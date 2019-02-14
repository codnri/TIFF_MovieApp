import React from "react";
import ReactModal from "react-modal";
const api_key = "6156345e952a1ea8f63f83962610e7c9";

ReactModal.setAppElement("#root");

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      movie: this.props.movie
    };
  }

  addDetailsToMovie = movie => {
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
            this.setState({ movie });
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

  onClickDetailButton = () => {
    console.log("this.state.movie.details");
    console.log(this.state.movie.details);
    if (!this.state.movie.details) {
      this.addDetailsToMovie(this.state.movie).then(
        this.setState({ showModal: true })
      );
    } else {
      console.log("existing");
      this.setState({ showModal: true });
    }
    // this.props.handleOpenModal(this.props.movie);
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <div>
        <ul>
          <li>title: {this.state.movie.title}</li>
          <li>popularity: {this.state.movie.popularity}</li>
          <li>release date: {this.state.movie.release_date}</li>
          {/*<li>{this.state.movie.overview}</li>
          <li>{this.state.movie.genre_ids}</li>
          <li>{this.state.movie.id}</li>*/}
        </ul>
        <button onClick={this.onClickDetailButton}>Detail</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Details"
          className="Modal"
          overlayClassName="Overlay"
          onRequestClose={this.props.handleCloseModal}
        >
          {this.state.movie.details && (
            <div>
              Details of {this.state.movie.title}
              <ul>
                <li>runtime: {this.state.movie.details.runtime}</li>
                <li>tagline: {this.state.movie.details.tagline}</li>
                <li>overview: {this.state.movie.details.overview}</li>
                <li>
                  genres:
                  {this.state.movie.details.genres &&
                    this.state.movie.details.genres.map(
                      genre => genre.name + " "
                    )}
                </li>
              </ul>
              <button onClick={this.handleCloseModal}>Close Modal</button>
            </div>
          )}
        </ReactModal>
      </div>
    );
  }
}

export default Movie;
