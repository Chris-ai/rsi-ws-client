import React, { useState } from "react";
import ApiService from "../services/ApiService";

const AddCar = () => {
    const initialCarState = {
        carBrand: "",
        carModel: "",
        price: 0,
        productionYear: 0,
        status: 0,
    };

    const [car, setCar] = useState(initialCarState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log(value)
        setCar({...car, [name]: value})
    };

    const saveCar = () => {
        var data = {
            carBrand: car.carBrand,
            carModel: car.carModel,
            price: car.price,
            productionYear: car.productionYear,
            status: 0,
        }

        ApiService.createCar(data)
            .then(response => {
                setCar({
                    carBrand: response.data.carBrand,
                    carModel: response.data.carModel,
                    price: response.data.price,
                    productionYear: response.data.productionYear,
                    status: response.data.status
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const newCar = () => {
        setCar(initialCarState);
        setSubmitted(false);
        console.log('elo')
    };

    return(
            <div className="submit-form">
                {submitted ? (
                    <div>
                    <h4>Samochód dodany poprawnie!</h4>
                    <button className="btn btn-success" onClick={newCar}>
                        Dodaj nowy
                    </button>
                    </div>
                ) : (
                    <div>
                    <div className="form-group">
                        <label htmlFor="carBrand">Marka samochodu</label>
                        <input
                        type="text"
                        className="form-control"
                        id="carBrand"
                        required
                        value={car.carBrand}
                        onChange={handleInputChange}
                        name="carBrand"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="carModel">Model</label>
                        <input
                        type="text"
                        className="form-control"
                        id="carModel"
                        required
                        value={car.carModel}
                        onChange={handleInputChange}
                        name="carModel"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productionYear">Rok produkcji</label>
                        <input
                        type="number"
                        className="form-control"
                        id="productionYear"
                        required
                        value={car.productionYear}
                        onChange={handleInputChange}
                        name="productionYear"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Cena</label>
                        <input
                        type="number"
                        className="form-control"
                        id="price"
                        required
                        value={car.price}
                        onChange={handleInputChange}
                        name="price"
                        />
                    </div>


                    <button onClick={saveCar} className="btn btn-success">
                        Utwórz
                    </button>
                    </div>
                )}

    </div> 
    )

}

export default AddCar;