import * as React from 'react';
import { MovieModel } from '../../models/movieModel';
import MainService from '../../services/mainService';
import Spinner from '../../common/components/spinner/spinner';
import Growl from '../../common/components/growl/growl';
import MoviePopup from "./moviePopupComponent";
import AuthService from '../../services/authService';
import MovieAddEditDialog from './movieAddEditComponent';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

interface IProps {
    history?: any;
    location?: any;
}

interface IState {
    movies: Array<MovieModel>;
    isLoading: boolean;
    selectedMovie: MovieModel;
    showPopup: boolean;
    openAddEdit: boolean;
    selectedMovieId: number;
}

class MovieListComponent extends React.Component<IProps, IState>{
    mainService = new MainService();
    authService = new AuthService();
    growl: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            movies: new Array<MovieModel>(),
            isLoading: false,
            selectedMovie: new MovieModel(),
            showPopup: false,
            openAddEdit: false,
            selectedMovieId: 0
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
                    movies: data.movies
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

    edit = (movie: MovieModel) => {
        this.setState({
            showPopup: false,
            selectedMovie: new MovieModel(),
            selectedMovieId: movie.movieId,
            openAddEdit: true
        })
    }

    delete = (id: number) => {
        this.setState({ isLoading: true });
        this.mainService.deleteMovie(id).then(
            (data: any) => {
                this.setState({
                    isLoading: false,
                    showPopup: false
                }, () => this.getAllMovies())
            }
        )
            .catch(error => {
                this.setState({
                    isLoading: false
                }, () => this.growl.show({ severity: 'error', summary: error.message }));
            });
    }

    closeAddEdit = (update: boolean) => {
        this.setState({
            openAddEdit: false,
            selectedMovieId: 0
        }, () => update ? this.getAllMovies() : null)
    }

    addMovie = () => {
        this.setState({
            openAddEdit: true,
            selectedMovieId: 0
        })
    }

    render() {
        const { movies, isLoading, selectedMovie, showPopup, openAddEdit, selectedMovieId } = this.state;
        return (
            <div className="app-content">
                <Growl ref={(el) => this.growl = el} />
                {isLoading ? <Spinner /> : null}
                {this.authService.getProfile() !== null && this.authService.getProfile().isAdmin ?
                    <Button variant="contained" color="primary" onClick={this.addMovie} style={{ marginBottom: 10 }}>
                        <Add />
                    </Button>
                    : null}
                {movies && movies.length > 0 ?
                    <div className="movies-list-container">
                        {movies.map(movie => {
                            return (
                                <div key={movie.movieId} className="movie-item" onClick={() => this.openMovie(movie)}>
                                    <img src={movie.imgSrc} height="250" width="150" className="movie-image" alt={movie.title} />
                                    <div className="movie-title">{movie.title}</div>
                                    <div className="release-date">{movie.releaseDate}</div>
                                </div>)
                        })}
                    </div>
                    : null}
                <MoviePopup movie={selectedMovie}
                    dialogOpen={showPopup}
                    closeDialog={this.closeDialog}
                    isAdmin={this.authService.getProfile() && this.authService.getProfile().isAdmin}
                    edit={this.edit}
                    delete={this.delete} />
                {openAddEdit ?
                    <MovieAddEditDialog
                        selectedMovieId={selectedMovieId}
                        dialogOpen={openAddEdit}
                        closeDialog={this.closeAddEdit}
                    />
                    : null}
            </div>);
    }
}

export default MovieListComponent;
