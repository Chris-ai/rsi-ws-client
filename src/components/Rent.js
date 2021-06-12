import React, { useState, useEffect, useRef } from "react";
import ApiService from "../services/ApiService";
import { Switch, Route, Link } from "react-router-dom";
import '@fortawesome/fontawesome-free'
import '@fortawesome/react-fontawesome'


const Rent = (props) => {
    const [rent, setRent] = useState([]);
    const rentRef = useRef();
   
    rentRef.current = rent;
    
    useEffect(() => {
        retrieveRent();
    }, [])

   

    const retrieveRent = () => {
        ApiService.getRents()
            .then((response) => {
                setRent(response.data)
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const deleteRent = (rowIndex) => {
        const id = rentRef.current[rowIndex].rentId;
        ApiService.removeRent(id)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
          window.location.reload();
      };

    return(
        <div>
          <div className="container">
                    <br></br>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th style={{textAlign: 'center'}}>Lp</th>
                                        <th style={{textAlign: 'center'}}>Id wypożyczenia</th>
                                        <th style={{textAlign: 'center'}}>Id rezerwacji</th>
                                        <th style={{textAlign: 'center'}}>Data rozpoczęcia</th>
                                        <th style={{textAlign: 'center'}}>Samochód</th>
                                        <th style={{textAlign: 'center'}}>Czas wynajmu (min)</th>
                                        <th style={{textAlign: 'center', margin: 0}}>#===#</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        rent.map(
                                            (r, index) =>
                                                <tr key={index} style={{textAlign:'center'}}>
                                                    <td>{index+1}</td>
                                                    <td>{r.rentId}</td>
                                                    <td>{r.reservationId}</td>
                                                    <td>{r.startDate}</td>
                                                    <td>{r.carInfo}</td>
                                                    <td>{r.rentTime}</td>
                                                    <td style={{fontWeight: 'bold'}}>
                                                        {/* Button delete */}
                                                     <span onClick={() => { if (window.confirm('Czy chcesz usunąć tą rezerwację?')) deleteRent(index) }} style = {{color:"red", background: "transparent",cursor:"pointer", border: 'none',marginRight: '10px' ,color:'gray', fontSize: '20px'}}>
                                                            <i className="fa fa-trash-o" aria-hidden="true" style={{ marginRight: "5px" }} /> 
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

export default Rent;