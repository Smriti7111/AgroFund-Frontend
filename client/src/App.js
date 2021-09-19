import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import { walletContext } from "./Context/WalletContext";

import "./App.css";
import DashboardFarmer from "./pages/dashboard/farmer/dashboard";
import DashboardInvestor from "./pages/dashboard/investor/dashboard";
import DashboardAdmin from "./pages/dashboard/admin/dashboard";

import Login from "./pages/login";
import SignUpFarmer from "./pages/signup/farmer";
import SignUpInvestor from "./pages/signup/investor";
import CreateProject from "./components/CreateProject";
import { useCookies } from "react-cookie";
import My404Component from "./components/My404Component";
import VerificationForm from "./components/VerificationForm";
const axios = require("axios");

const App = () => {
  const [data, setData] = useState(null);
  const [walletAddress, setWalletAddress] = useContext(walletContext);

  if (window.ethereum !== undefined && window.ethereum.isConnected()) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setWalletAddress(accounts[0]);
      // TODO
      // Logout logic or function should go here
      console.log("Account Changed");
    });
  }

  const [farmerData, setFarmerData] = useState([]);
  const [investorData, setInvestorData] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    // getAllFarmers();
    // getAllInvestors();
  }, []);

  // const getAllFarmers = async () => {
  //   try {
  //     const res = await axios({
  //       method: "GET",
  //       url: "/api/farmer",
  //     });
  //     let resData = res.data.data;
  //     setFarmerData(resData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getAllInvestors = async () => {
  //   try {
  //     const res = await axios({
  //       method: "GET",
  //       url: "/api/investor",
  //     });
  //     let resData = res.data.data;
  //     setInvestorData(resData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const PrivateRoute = ({ location, ...rest }) => {
    let session = sessionStorage.getItem("token");
    let pathname = location.pathname;
    let state = location.state;
    const showAlert = state ? state.showAlert : "false";

    if (session == null) {
      return <Login location={location} />;
    }
    if (state && pathname == "/createProject" && state.usertype == 1) {
      return <CreateProject />;
    }
    if (state && pathname == "/dashboard") {
      switch (state.usertype) {
        case 0:
          return <DashboardAdmin showAlert={showAlert} />;
        case 1:
          return <DashboardFarmer showAlert={showAlert} />;
        case 2:
          return <DashboardInvestor showAlert={showAlert} />;
      }
    }
    return <Login location={location} />;
  };

  // state = { web3: null, accounts: null, contract: null };

  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/login" />
            <Route exact path="/signup-farmer" component={SignUpFarmer}></Route>
            <Route
              exact
              path="/verificationForm"
              component={VerificationForm}
            ></Route>
            <Route
              exact
              path="/signup-investor"
              component={SignUpInvestor}
            ></Route>
            <PrivateRoute exact path="/createProject" />
            <PrivateRoute exact path="/dashboard" />
            <Route path="*" exact component={My404Component} />
          </Switch>

          {/* <p>{!data ? "Loading..." : data}</p> */}
          {/* <p>
            Try changing the value stored on <strong>line 42</strong> of App.js.
          </p>
          <div>The stored value is: {this.state.storageValue}</div> */}
        </div>
      </Router>
    </>
  );
};

export default App;
