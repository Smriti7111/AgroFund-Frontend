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

  const PrivateRoute = ({ location, ...rest }) => {
    let state = location.state;
    if (state) {
      switch (state.usertype) {
        case 0:
          return <DashboardAdmin />;
        case 1:
          return <DashboardFarmer />;
        case 2:
          return <DashboardInvestor />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  };

  // state = { web3: null, accounts: null, contract: null };

  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup-farmer" component={SignUpFarmer}></Route>
            <Route
              exact
              path="/signup-investor"
              component={SignUpInvestor}
            ></Route>
            <PrivateRoute exact path="/dashboard"></PrivateRoute>
          </Switch>

          {/* <p>{!data ? "Loading..." : data}</p> */}
        </div>
      </Router>
    </>
  );
};

export default App;
