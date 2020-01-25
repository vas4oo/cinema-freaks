import * as React from 'react';
import { MovieModel } from '../../models/movieModel';
import Dialog from "@material-ui/core/Dialog";
import * as Modal from '../../common/components/dialog/modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextArea from '@material-ui/core/TextareaAutosize'
import Spinner from '../../common/components/spinner/spinner';
import Growl from '../../common/components/growl/growl';
import MainService from '../../services/mainService';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

interface IProps {
    dialogOpen: boolean;
    closeDialog: any;
    selectedMovieId: number;
}

interface IState {
    movie: MovieModel;
    isLoading: boolean;
    title: string;
}

class MovieAddEditPopup extends React.Component<IProps, IState> {
    mainService = new MainService();
    growl: any;
    constructor(props) {
        super(props);
        this.state = {
            movie: new MovieModel(),
            isLoading: false,
            title: 'Add new movie'
        }
    }

    componentDidMount() {
        if (this.props.selectedMovieId) {
            this.setState({ isLoading: true, title: 'Edit movie' });
            this.mainService.getMovie(this.props.selectedMovieId).then(
                (data: any) => {
                    this.setState({
                        isLoading: false,
                        movie: data.movie
                    })
                }
            )
                .catch(error => {
                    this.setState({
                        isLoading: false
                    }, () => this.growl.show({ severity: 'error', summary: error.message }));
                });
        }
    }

    handleChange = (key, value) => {
        const movie = { ...this.state.movie };
        movie[key] = value;
        this.setState({ movie: { ...movie } })
    }

    saveMovie = () => {
        this.setState({ isLoading: true });
        if (this.props.selectedMovieId) {
            this.mainService.updateMovie(this.state.movie).then(
                (data: any) => {
                    this.setState({
                        isLoading: false,
                    }, () => this.props.closeDialog(true))
                })
                .catch(error => {
                    this.setState({
                        isLoading: false
                    }, () => this.growl.show({ severity: 'error', summary: error.message }));
                });
        }
        else {
            this.mainService.createMovie(this.state.movie).then(
                (data: any) => {
                    this.setState({
                        isLoading: false,
                    }, () => this.props.closeDialog(true))
                })
                .catch(error => {
                    this.setState({
                        isLoading: false
                    }, () => this.growl.show({ severity: 'error', summary: error.message }));
                });
        }
    }

    handleDateChange = (date) => {
        const movie = { ...this.state.movie };
        movie.releaseDate = date;
        this.setState({ movie: { ...movie } })
    };

    render() {
        const { movie, isLoading, title } = this.state;
        return (
            <Dialog
                open={this.props.dialogOpen}
                onClose={() => this.props.closeDialog(false)}
                aria-labelledby="form-dialog-title"
            >

                <Modal.DialogTitle onClose={() => this.props.closeDialog(false)}>{title}</Modal.DialogTitle>
                <Modal.DialogContent>
                    <div style={{ width: 400, minHeight: 500 }}>
                        <Growl ref={(el) => this.growl = el} />
                        {isLoading ? <Spinner /> : null}
                        <div className="movie-add-edit-container">
                            <TextField
                                autoComplete="off"
                                label="Title"
                                type="text"
                                style={{ width: '100%', paddingBottom: 15 }}
                                value={movie.title || ''}
                                onChange={(e) => this.handleChange('title', e.target['value'])}></TextField>
                            <TextField
                                autoComplete="off"
                                label="Director"
                                type="text"
                                style={{ width: '100%', paddingBottom: 15 }}
                                value={movie.director || ''}
                                onChange={(e) => this.handleChange('director', e.target['value'])}></TextField>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    format="dd/MM/yyyy"
                                    disableFuture
                                    label="Release dade"
                                    value={movie.releaseDate ? new Date(movie.releaseDate) : new Date()}
                                    onChange={this.handleDateChange}
                                />
                                {/* <TextField
                                    autoComplete="off"
                                    label="Release date"
                                    type="text"
                                    style={{ width: '100%', paddingBottom: 15 }}
                                    value={movie.releaseDate || ''}
                                    onChange={(e) => this.handleChange('releaseDate', e.target['value'])}></TextField> */}
                            </MuiPickersUtilsProvider>
                            <TextField
                                autoComplete="off"
                                label="Imdb Link"
                                type="text"
                                style={{ width: '100%', paddingBottom: 15 }}
                                value={movie.imdbLink || ''}
                                onChange={(e) => this.handleChange('imdbLink', e.target['value'])}></TextField>
                            <TextField
                                autoComplete="off"
                                label="Image path"
                                type="text"
                                style={{ width: '100%', paddingBottom: 15 }}
                                value={movie.imgSrc || ''}
                                onChange={(e) => this.handleChange('imgSrc', e.target['value'])}></TextField>
                            <div>
                                <label>Description</label>
                                <div>
                                    <TextArea
                                        rows={5}
                                        value={movie.desc || ''}
                                        style={{ width: '100%' }}
                                        onChange={(e) => this.handleChange('desc', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.DialogContent>
                <Modal.DialogActions>
                    <div>
                        <Button variant="contained" size="small" onClick={() => this.props.closeDialog(false)} style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button variant="contained" size="small" color="primary" onClick={this.saveMovie}
                            disabled={!movie.releaseDate || !movie.desc || !movie.director || !movie.title || !movie.imgSrc || !movie.imdbLink}>
                            Save
                        </Button>
                    </div>
                </Modal.DialogActions>
            </Dialog>
        )
    }
}

export default MovieAddEditPopup;