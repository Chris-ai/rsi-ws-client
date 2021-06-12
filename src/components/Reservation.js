import React, { useState, useEffect, useRef } from "react";
import ApiService from "../services/ApiService";
import { Switch, Route, Link } from "react-router-dom";
import '@fortawesome/fontawesome-free'
import '@fortawesome/react-fontawesome'

const Reservation = (props) => {
    const [res, setRes] = useState([]);
    const resRef = useRef();

    const initialState = {
        time: 0
    };

    const [state, setState] = useState(initialState);

    resRef.current = res;

    useEffect(() => {
        retrieveRes();
    }, [])

    const retrieveRes = () => {
        ApiService.getReservations()
            .then((response) => {
                setRes(response.data)
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const rentCar = rowIndex => {
        const id = resRef.current[rowIndex].reservationId;
        const carId = resRef.current[rowIndex].carId;
        let status = 0;
        var data = {
            reservationId: id,
            rentTime: state.time,
            carInfo: resRef.current[rowIndex].carInfo
        }
        
        ApiService.getCarById(carId)
            .then(response => {
                console.log(response.data);
                status = response.data.status;
                if(state.time <= 0 || status != 1)
                    alert("Czas musi wynosić więcej niż 0 lub samochód jest już wynajęty.");
                else {
                    ApiService.createRent(data)
                        .then(response => {
                            console.log(response.data);
                            props.history.push("/rents");
                        })
                        .catch(e => {
                        console.log(e);
                    });
            }  
            })
            .catch(e => {
                console.log(e);
            });
              
    }

    const deleteReservation = (rowIndex) => {
        const id = resRef.current[rowIndex].reservationId;
        ApiService.removeReservation(id)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
          window.location.reload();
      };

    
    const handleInputChange = event => {
        const {name, value} = event.target;
        setState({...state, [name]: value})
    };

    return(
        <div>
            <label htmlFor="carBrand">Czas wynajęcia (min)</label>
            <input
                type="number"
                className="form-control"
                id="time"
                value={state.time}
                onChange={handleInputChange}
                name="time"
            />
          <div className="container">
                    <br></br>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th style={{textAlign: 'center'}}>Lp</th>
                                        <th style={{textAlign: 'center'}}>Id rezerwacji</th>
                                        <th style={{textAlign: 'center'}}>Samochód</th>
                                        <th style={{textAlign: 'center', margin: 0}}>#===#</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        res.map(
                                            (r, index) =>
                                                <tr key={index} style={{textAlign:'center'}}>
                                                    <td>{index+1}</td>
                                                    <td>{r.reservationId}</td>
                                                    <td>{r.carInfo}</td>
                                                    <td style={{fontWeight: 'bold'}}>
                                                        {/* Button delete */}
                                                     <span onClick={() => { if (window.confirm('Czy chcesz usunąć tą rezerwację?')) deleteReservation(index) }} style = {{color:"red", background: "transparent",cursor:"pointer", border: 'none',marginRight: '10px' ,color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-trash-o" aria-hidden="true" style={{ marginRight: "5px" }} /> 
                                                     </span> 
                                                        {/* Button reserve */}
                                                     <span onClick={() => {if (window.confirm('Czy chcesz wypożyczyć ten samochód?')) rentCar(index)}} style = {{color:"red",cursor:"pointer" ,background: "transparent", border: 'none',marginRight: '10px' ,color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-check" aria-hidden="true" style={{ marginRight: "5px" }} /> 
                                                     </span> 
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    </div>
    );

}

export default Reservation;