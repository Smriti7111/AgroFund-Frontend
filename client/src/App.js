import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import getWeb3 from "./getWeb3";

import "./App.css";
import { walletContext } from "./Context/WalletContext";
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
          </Switch>

          {/* <p>{!data ? "Loading..." : data}</p> */}
        </div>
      </Router>
    </>
  );
};

export default App;
