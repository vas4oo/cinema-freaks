import * as React from 'react';
import { MovieModel } from '../../models/movieModel';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const MoviePopup = (props) => {
    let movie: MovieModel = props.movie;

    return (
        <Dialog
            open={props.dialogOpen}
            onClose={() => props.closeDialog()}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <div>
                    <img src={movie.imgSrc} height="400" width="250" />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MoviePopup;