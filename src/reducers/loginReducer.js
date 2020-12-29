import {LOGIN} from "../actions/actions";

function setItem(name, array) {
    localStorage.setItem(name, JSON.stringify(array));
}

let initialState = JSON.parse(localStorage.getItem('state')) || {
    auth: false,
    code: '',
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            setItem('state', {auth: true, code: action.code});
            return {auth: true, code: action.code};

        default:
            return state;
    }
}
