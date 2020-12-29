export const GET_IMAGE = "GET_IMAGE";
export const LOGIN = "LOGIN";
export const LIKE = "LIKE";
export const UNLIKE = "UNLIKE";
export const VIEW_IMAGE = "VIEW_IMAGE";

export const getImage = (imageList, imageCount) => {
    return {
        type: GET_IMAGE,
        imageList,
        imageCount,
    }
}

export const login = (code) => {
    return {
        type: LOGIN,
        code
    }
}

export const like = (imageList) => {
    return {
        type: LIKE,
        imageList,
    }
}

export const unlike = (imageList) => {
    return {
        type: UNLIKE,
        imageList,
    }
}

export const viewImage = (index) => {
    return {
        type: VIEW_IMAGE,
        index
    }
}
