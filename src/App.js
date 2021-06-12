import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import CarComponent from "./components/Car";
import AddCar from "./components/AddCar";
import EditCar from './components/EditCar'

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Car Rental
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/cars"} className="nav-link">
              Samochody
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/reservations"} className="nav-link">
              Rezerwacje
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/rents"} className="nav-link">
              Wypożyczenia
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/cars"]} component = {CarComponent}/>
          <Route path={"/cars/add"} component={AddCar}/>
          <Route path={"/cars/:id"} component={EditCar}/>
          <Route exact path="/reservations"/>
          <Route exact path="/rents"/>
        </Switch>
      </div>
    </div>
  );
}

export default App;