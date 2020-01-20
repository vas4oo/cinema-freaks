import * as React from 'react';
import { MovieModel } from '../../models/movieModel';
import Dialog from "@material-ui/core/Dialog";
import * as Modal from '../../common/components/dialog/modal';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const MoviePopup = (props) => {
    let movie: MovieModel = props.movie;

    return (
        <Dialog
            open={props.dialogOpen}
            onClose={props.closeDialog}
            aria-labelledby="form-dialog-title"
        >

            <Modal.DialogTitle onClose={props.closeDialog} />
            <Modal.DialogContent>
                <div className="movie-popup-container">
                    <div className="img-popup">
                        <img src={movie.imgSrc} height="400" width="250" alt={movie.title} />
                    </div>
                    <div className="movie-popup-content">
                        <h1>{movie.title}</h1>
                        <span>Director: {movie.director}</span><br />
                        <span>Release date: {movie.releaseDate}</span>
                        <p>{movie.desc}</p>
                        <a href={movie.imdbLink} target="_blank" rel="noopener noreferrer">IMDB link</a>
                    </div>
                </div>
                {props.isAdmin ?
                    <div className="movie-popup-buttons">
                        <IconButton aria-label="Delete" onClick={() => props.delete(movie.movieId)}>
                            <DeleteIcon color="secondary" />
                        </IconButton>
                        <IconButton aria-label="Edit" onClick={() => props.edit(movie)}>
                            <EditIcon color="primary" />
                        </IconButton>
                    </div>
                    : null}
            </Modal.DialogContent>
        </Dialog>
    )
}

export default MoviePopup;