import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const EditCar = props => {
    
    const initialCarState = {
        carBrand: "",
        carModel: "",
        price: 0,
        productionYear: 0,
        status: 0,
    };

  const [currentCar, setCurrentCar] = useState(initialCarState);
  const [message, setMessage] = useState("");

  const getCar = id => {
    ApiService.getCarById(id)
      .then(response => {
        setCurrentCar(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCar(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCar({ ...currentCar, [name]: value });
  };

//   const updateCurrentCar = () => {
//     var data = {
//         id: currentCar.id,
//         carBrand: currentCar.carBrand,
//         carModel: currentCar.carModel,
//         price: currentCar.price,
//         productionYear: currentCar.productionYear,
//         status: currentCar.status,
//     };

//     ApiService.updateCar(currentCar.id, data)
//       .then(response => {
//         setCurrentCar({ ...currentCar});
//         console.log(response.data);
//         setMessage("The status was updated successfully!");
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

  const updateCar = () => {
    ApiService.updateCar(currentCar.id, currentCar)
      .then(response => {
        console.log(response.data);
        setMessage("Samochód został poprawnie zedytowany!");
        props.history.push("/cars");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCar = () => {
    ApiService.removeCar(currentCar.id)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
        <div className="edit-form">
          <form>
          <div className="form-group">
                        <label htmlFor="carBrand">Marka samochodu</label>
                        <input
                        type="text"
                        className="form-control"
                        id="carBrand"
                        required
                        value={currentCar.carBrand}
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
                        value={currentCar.carModel}
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
                        value={currentCar.productionYear}
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
                        value={currentCar.price}
                        onChange={handleInputChange}
                        name="price"
                        />
                    </div>
          </form>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCar}
          >
            Update
          </button>
        </div>
    </div>
  );
};

export default EditCar;