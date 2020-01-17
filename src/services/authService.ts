import axios from 'axios';
import * as HelperFunctions from '../common/functions/helperFunctions';
import jwtDecode from 'jwt-decode';

class AuthService {

    // constructor() {
    //   axios.defaults.baseURL = `${Constants.tokenUrl}`;
    // }

    login(user) {
        return this.getUser(user)
            .then(
                data => {
                    if (data.access_token) {
                        this.setToken(data)
                        return true;
                    }
                    return false;
                })
            .catch(error =>
                Promise.reject(HelperFunctions.getErrorMessage(error))
            );
    }

    getUser(user) {
        return axios({
            url: `http://localhost:8000/auth/login`,
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: user
        })
            .then(res => res.data)
            .catch(error =>
                Promise.reject(error)
            )
    }

    logout() {
        // Clear access token and ID token from local storage    
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_at');
        // navigate to the home route
        //history.replace('/feed');
        //window.location.reload();
    }

    isAuthenticated() {
        try {
            let token = this.getToken();
            let expiresAt = window.localStorage['expires_at'] ? JSON.parse(window.localStorage['expires_at']) : undefined;

            if (token && token !== "undefined" && expiresAt) {

                if (new Date().getTime() < expiresAt) {
                    return true;
                }

                return false;
            }

            return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(authResult) {
        // Saves user token to localStorage    
        window.localStorage.setItem('id_token', authResult.access_token);
        let expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
        window.localStorage.setItem('expires_at', expiresAt);
    }

    getToken() {
        // Retrieves the user token from localStorage    
        return window.localStorage.getItem('id_token')
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        const token = this.getToken();
        if (token && token !== "undefined") {
            return jwtDecode(token);
        } else {
            return null;
        }
    }

    getUserName() {
        let profile = this.getProfile();
        return profile && profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?
            profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : ''
    }

    getLoginName() {
        let profile = this.getProfile();
        return profile && profile['loginName'] ? profile['loginName'] : ''
    }

    getUserId() {
        let profile = this.getProfile();
        return profile && profile['id'] ? profile['id'] : undefined
    }

}

export default AuthService;