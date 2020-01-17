import * as actionTypes from '../actionTypes';

const initialState = {
    isUserLogged: false,
    isUserJustLogged: false,
    medicineSearchActiveIngredient: ''
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return {
                ...state,
                isUserLogged: true,
                isUserJustLogged: true
            }
        case actionTypes.SET_USER_JUST_LOGGED_TO_FALSE:
            return {
                ...state,
                isUserJustLogged: false
            }
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                isUserLogged: false
            }
    }

    return state;
}

export default commonReducer;