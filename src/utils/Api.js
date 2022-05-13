const API_URL = "http://localhost:3030/api";

const getAllFilters = () => {
    return fetch(API_URL + "/filtro")
        .then(response => response.json())
        .catch(err => console.log(err))
}

const login = (email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(API_URL + "/usuario/login", requestOptions)
        .then(response => response.json())
        .catch(error => []);
}

const getAllComerces = () => {
    return fetch(API_URL + "/comercio")
        .then(response => response.json())
        .catch(err => console.log(err))
}

const getAllFotos = () => {
    return fetch(API_URL + "/fotos")
        .then(response => response.json())
        .catch(err => console.log(err))
}

const getFotosComercio = (id) => {
    return fetch(API_URL + "/fotos/" + id)
        .then(response => response.json())
        .catch(err => console.log(err))
}

const getUser = (idUser) => {
    return fetch(API_URL + '/usuario/' + idUser)
        .then(response => response.json())
        .catch(err => console.log(err))
}

const getAllUsers = () => {
    return fetch(API_URL + '/usuario')
        .then(response => response.json())
        .catch(err => console.log(err))
}

const getFollowers = (idUser) => {
    return fetch(API_URL + '/seguidores/' + idUser)
        .then(response => response.json())
        .catch(err => console.log(err))
}

const commerceFilterBy = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(API_URL + '/comercio/filtrar', requestOptions)
        .then(response => response.json())
        .catch(err => console.log(err))
}

const getFiltersOfCommerce = (id) => {

    return fetch(API_URL + '/comercio/filtrosComercio/' + id)
        .then(response => response.json())
        .catch(err => console.log(err))
}


export default {
    getAllFilters,
    login,
    getAllComerces,
    getAllFotos,
    getUser,
    getFollowers,
    getAllUsers,
    commerceFilterBy,
    getFotosComercio,
    getFiltersOfCommerce
};