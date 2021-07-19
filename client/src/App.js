import React, { useContext, useState } from "react";
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
<<<<<<< HEAD

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
=======
import CreateProject from "./components/CreateProject";
import { useCookies } from "react-cookie";
import My404Component from "./components/My404Component";
const axios = require("axios");

const App = () => {
  const [farmerData, setFarmerData] = useState([]);
  const [investorData, setInvestorData] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    // getAllFarmers();
    // getAllInvestors();
  }, []);
>>>>>>> 0f3a730095d33854c52722e9ef925be2e130c949

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
    let other = cookies.User.other;
    let session = sessionStorage.getItem("token");
    let pathname = location.pathname;
    let state = location.state;
    const showAlert = state ? state.showAlert : "false";

    if (session == null) {
      return <Login />;
    }
    if (pathname == "/createProject" && other.userType == 1) {
      return <CreateProject />;
    }
    if (pathname == "/dashboard" || pathname == "/login") {
      switch (other.userType) {
        case 0:
          return <DashboardAdmin showAlert={showAlert} />;
        case 1:
          return <DashboardFarmer showAlert={showAlert} />;
        case 2:
          return <DashboardInvestor showAlert={showAlert} />;
      }
    }
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
              path="/signup-investor"
              component={SignUpInvestor}
            ></Route>
            <PrivateRoute exact path="/createProject" />
            <PrivateRoute exact path="/dashboard" />
            <Route path="*" exact component={My404Component} />
          </Switch>
<<<<<<< HEAD

          {/* <p>{!data ? "Loading..." : data}</p> */}
=======
          {/* <p>
            Try changing the value stored on <strong>line 42</strong> of App.js.
          </p>
          <div>The stored value is: {this.state.storageValue}</div> */}
>>>>>>> 0f3a730095d33854c52722e9ef925be2e130c949
        </div>
      </Router>
    </>
  );
};

export default App;
