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

const ApiService = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    removeCar
};


export default ApiService;