import {GET_IMAGE, VIEW_IMAGE, LIKE, UNLIKE} from "../actions/actions";

let initialState = {
    imageList: [],
    imageCount: 0,
    image: {},
};
export const imageReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_IMAGE:
            return {...state, imageList: action.imageList, imageCount: action.imageCount};

        case VIEW_IMAGE:
            return {...state, index: action.index};

        case LIKE:
            return {...state, imageList: action.imageList};

        case UNLIKE:
            return {...state, imageList: action.imageList};

        default:
            return state;
    }
}
