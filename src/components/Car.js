import React, { useState, useEffect, useRef } from "react";
import ApiService from "../services/ApiService";
import { Switch, Route, Link } from "react-router-dom";
import AddCar from "./AddCar";
import '@fortawesome/fontawesome-free'
import '@fortawesome/react-fontawesome'

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
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const refreshList = () => {
        retrieveCars();
      };

    const reserveCar = rowIndex => {
        //TU TRZEBA ZEDYTOWAĆ SAMOCHÓD I ODWOŁAĆ SIĘ DO ID :)
    }  

    const editCar = rowIndex => {
        const id = carsRef.current[rowIndex].id;

        props.history.push(`/cars/` + id)
    }

    const deleteCar = (rowIndex) => {
        const id = carsRef.current[rowIndex].id;
        ApiService.removeCar(id)
          .then(response => {
            console.log(response.data);
            props.history.push("/cars");
          })
          .catch(e => {
            console.log(e);
          });
      };

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
                                                    <td>{car.status}</td>
                                                    <td style={{fontWeight: 'bold'}}>
                                                        {/* Button edit */}
                                                     <span onClick={() => editCar(index)}  style = {{background: "transparent",cursor:"pointer",color:"green", marginRight: '10px' ,border: 'none', color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-edit" aria-hidden="true" style={{ marginRight: "5px" }} />
                                                     </span>
                                                        {/* Button delete */}
                                                     <span onClick={() => deleteCar(index)} style = {{color:"red", background: "transparent",cursor:"pointer", border: 'none',marginRight: '10px' ,color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-trash-o" aria-hidden="true" style={{ marginRight: "5px" }} /> 
                                                     </span> 
                                                        {/* Button reserve */}
                                                     <span onClick={() => reserveCar(index)} style = {{color:"red",cursor:"pointer" ,background: "transparent", border: 'none',marginRight: '10px' ,color:'gray', fontSize: '20px'}}>
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