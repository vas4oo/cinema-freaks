import axios from 'axios';
import * as HelperFunctions from '../common/functions/helperFunctions';

class MainService {
    constructor() {
        axios.defaults.baseURL = "http://localhost:3001/";
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
}

export default MainService;