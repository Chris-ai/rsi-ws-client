import http from '../auth.service';

const getCars = () => {
    return http.get('/cars/all', {
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const getCarById = (id) => {
    return http.get(`/cars/${id}`, {
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const createCar = (car) => {
    return http.post(`/cars/create`,car,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const updateCar = (id,car) => {
    return http.put(`/cars/update/${id}`,car,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const removeCar = (id) => {
    return http.delete(`/cars/delete/${id}`,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const getReservations = () => {
    return http.get('/reservations/all', {
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const createReservation = (res) => {
    return http.post(`/reservations/create`, res,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const removeReservation = (id) => {
    return http.delete(`/reservations/delete/${id}`,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const getRents = () => {
    return http.get('/rents/all', {
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const removeRent = (id) => {
    return http.delete(`/rents/delete/${id}`,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const createRent = (rent) => {
    return http.post(`/rents/create`, rent,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const updateCarStatus = (id, stat) => {
    return http.post(`/cars/updateStatus/${id}`,stat,{
        auth:{
        username: 'user',
        password: 'user'
    }})
}

const ApiService = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    removeCar,
    createReservation,
    getReservations,
    removeReservation,
    getRents,
    removeRent,
    createRent,
    updateCarStatus
};

export default ApiService;