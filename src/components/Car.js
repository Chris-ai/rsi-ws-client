import React, { useState, useEffect, useRef } from "react";
import ApiService from "../services/ApiService";
import { Switch, Route, Link } from "react-router-dom";
import AddCar from "./AddCar";
import '@fortawesome/fontawesome-free'
import '@fortawesome/react-fontawesome'
import axios from "axios";
import Reservation from './Reservation'

const Car = (props) => {
    const [cars, setCars] = useState([]);
    const carsRef = useRef();
    carsRef.current = cars;

    useEffect(() => {
        retrieveCars();
    }, [])

    const retrieveCars = () => {
        ApiService.getCars()
            .then((response) => {
                setCars(response.data)
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const refreshList = () => {
        retrieveCars();
      };

    const reserveCar = rowIndex => {
        //REZERWACJA SAMOCHODU PRZEZ PRZYCISK "+"
        const id = carsRef.current[rowIndex].id;

        
        var data = {
            carId: id,
            carInfo: ""
        }

       let updatedCarStatus = {
            carId: "",
            carBrand: "",
            carModel: "",
            productionYear: "",
            price: 0,
            status: 0,
        }


        cars.forEach( (element) => {
            if(element.id == id){
                data.carInfo = element.carBrand + ' ' + element.carModel
                updatedCarStatus.id = id
                updatedCarStatus.carBrand = element.carBrand
                updatedCarStatus.carModel = element.carModel
                updatedCarStatus.productionYear = element.productionYear
                updatedCarStatus.price = element.price
                updatedCarStatus.status = 1
            }
        })

        // console.log(updatedCarStatus)
        ApiService.updateCar(id, updatedCarStatus)
        


        if(carsRef.current[rowIndex].status == 0){
            ApiService.createReservation(data)
          .then(response => {
            console.log(response.data);
            props.history.push("/reservations");
          })
          .catch(e => {
            console.log(e);
          });
        }
        else {
            alert("Samochód jest już zajęty!")
        }
    }  

    const editCar = rowIndex => {
        const id = carsRef.current[rowIndex].id;

        props.history.push(`/cars/` + id)
    }

    const deleteCar = (rowIndex) => {
        const id = carsRef.current[rowIndex].id;
        if(carsRef.current[rowIndex].status != 0){
            alert("Nie można usunąć samochodu. Jest zarezerwowany.");
        } else {
        ApiService.removeCar(id)
        .then(response => {
            console.log(response.data);
            props.history.push("/cars");
          })
        .catch(e => {
            console.log(e);
        });
        window.location.reload();
        }
        
      };

    const renderStatus = (status) => {
        if(status == 2)
            return <td>Wypożyczony</td>
        if(status == 1)
            return <td>Zarezerwowany</td>
        if(status == 0)
            return <td>Wolny</td>
    }

    return(
        <div>
          <button className='btn btn-create' style={{backgroundColor: '#4B62E9', color:"#fff"}}>
            <Link to={"/cars/add"} className="nav-link" style={{color:"#fff", fontWeight: 'bold'}}>
                Dodaj samochód
            </Link>
          </button>

          <div className="container">
                    <br></br>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th style={{textAlign: 'center'}}>Lp</th>
                                        <th style={{textAlign: 'center'}}>Marka</th>
                                        <th style={{textAlign: 'center'}}>Model</th>
                                        <th style={{textAlign: 'center'}}>Rok produkcji</th>
                                        <th style={{textAlign: 'center'}}>Cena (h)</th>
                                        <th style={{textAlign: 'center'}}>Status</th>
                                        <th style={{textAlign: 'center', margin: 0}}>#===#</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        cars.map(
                                            (car, index) =>
                                                <tr key={index} style={{textAlign:'center'}}>
                                                    <td>{index+1}</td>
                                                    <td>{car.carBrand}</td>
                                                    <td>{car.carModel}</td>
                                                    <td>{car.productionYear}</td>
                                                    <td>{car.price}</td>
                                                    {renderStatus(car.status)}
                                                    <td style={{fontWeight: 'bold'}}>
                                                        {/* Button edit */}
                                                     <span onClick={() => editCar(index)}  style = {{background: "transparent",cursor:"pointer",color:"green", marginRight: '10px' ,border: 'none', color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-edit" aria-hidden="true" style={{ marginRight: "5px" }} />
                                                     </span>
                                                        {/* Button delete */}
                                                     <span onClick={() => { if (window.confirm('Czy chcesz usunąć ten samochód?')) deleteCar(index) }} style = {{color:"red", background: "transparent",cursor:"pointer", border: 'none',marginRight: '10px' ,color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-trash-o" aria-hidden="true" style={{ marginRight: "5px" }} /> 
                                                     </span> 
                                                        {/* Button reserve */}
                                                     <span onClick={() => {if (window.confirm('Czy chcesz zarezerwować ten samochód?')) reserveCar(index)}} style = {{color:"red",cursor:"pointer" ,background: "transparent", border: 'none',marginRight: '10px' ,color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-plus" aria-hidden="true" style={{ marginRight: "5px" }} /> 
                                                     </span> 
                                                    </td>
                                                </tr>
                                        )
                                        //                 {this.state.currentUser.roles.includes('ROLE_ADMIN') &&
                                        //                     <button style={{ marginLeft: "10px" }} onClick={() => this.deleteContract(contract.id)} className="btn btn-danger">
                                        //                         <i className="fa fa-trash-o" aria-hidden="true" style={{ marginRight: "5px" }} /> Usuń
                                        //             </button>}
                                        // 
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    </div>
    );
}

export default Car;