import * as React from 'react';
import { MovieModel } from '../../models/movieModel';
import MainService from '../../services/mainService';
import Spinner from '../../common/components/spinner/spinner';
import Growl from '../../common/components/growl/growl';
import MoviePopup from "./moviePopupComponent";

interface IProps {
    history?: any;
    location?: any;
}

interface IState {
    movies: Array<MovieModel>;
    isLoading: boolean;
    selectedMovie: MovieModel;
    showPopup: boolean;
}

class MovieListComponent extends React.Component<IProps, IState>{
    mainService = new MainService();
    growl: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            movies: new Array<MovieModel>(),
            isLoading: false,
            selectedMovie: new MovieModel(),
            showPopup: false
        }
    }

    componentDidMount() {
        this.getAllMovies();
    }

    getAllMovies() {
        this.setState({ isLoading: true });

        this.mainService.getAllMovies().then(
            (data: any) => {
                this.setState({
                    isLoading: false,
                    movies: data
                })
            }
        )
            .catch(error => {
                this.setState({
                    isLoading: false
                }, () => this.growl.show({ severity: 'error', summary: error.message }));
            });
    }

    openMovie = (movie: MovieModel) => {
        this.setState({
            showPopup: true,
            selectedMovie: movie
        })
    }

    closeDialog = () => {
        this.setState({
            showPopup: false,
            selectedMovie: new MovieModel()
        })
    }

    render() {
        const { movies, isLoading, selectedMovie, showPopup } = this.state;
        return (
            <div className="app-content">
                <Growl ref={(el) => this.growl = el} />
                {isLoading ? <Spinner /> : null}
                {movies && movies.length > 0 ?
                    <div className="movies-list-container">
                        {movies.map(movie => {
                            return (
                                <div key={movie.movieId} className="movie-item" onClick={() => this.openMovie(movie)}>
                                    <img src={movie.imgSrc} height="250" width="150" className="movie-image" />
                                    <div className="movie-title">{movie.title}</div>
                                    <div className="release-date">{movie.releaseDate}</div>
                                </div>)
                        })}
                    </div>
                    : null}
                <MoviePopup movie={selectedMovie} dialogOpen={showPopup} closeDialog={this.closeDialog} />
            </div>);
    }
}

export default MovieListComponent;
