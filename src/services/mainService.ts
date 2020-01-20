import axios from 'axios';
import * as HelperFunctions from '../common/functions/helperFunctions';
import { MovieModel } from '../models/movieModel';

class MainService {
    constructor() {
        axios.defaults.baseURL = "http://localhost:8000/";
        axios.defaults.headers = {
            "Content-Type": "application/json; charset=utf-8",
            Pragma: 'no-cache'
        }
    }

    getAllMovies() {
        return axios({
            url: `movies`,
            method: 'get',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(res => res.data)
            .catch(error => Promise.reject(HelperFunctions.getErrorMessage(error)));
    }

    getMovie(id: number) {
        return axios({
            url: `movies/${id}`,
            method: 'get',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(res => res.data)
            .catch(error => Promise.reject(HelperFunctions.getErrorMessage(error)));
    }

    createMovie(movie: MovieModel) {
        return axios({
            url: `movies`,
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: movie
        })
            .then(res => res.data)
            .catch(error => Promise.reject(HelperFunctions.getErrorMessage(error)));
    }

    updateMovie(movie: MovieModel) {
        return axios({
            url: `movies`,
            method: 'put',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: movie
        })
            .then(res => res.data)
            .catch(error => Promise.reject(HelperFunctions.getErrorMessage(error)));
    }


    deleteMovie(id: number) {
        return axios({
            url: `movies/${id}`,
            method: 'delete',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(res => res.data)
            .catch(error => Promise.reject(HelperFunctions.getErrorMessage(error)));
    }
}

export default MainService;