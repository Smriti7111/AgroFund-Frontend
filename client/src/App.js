import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

import "./App.css";
import SignUpFarmer from "./pages/signup/farmer";
import SignUpInvestor from "./pages/signup/investor";
import { useCookies } from "react-cookie";
import My404Component from "./components/My404Component";
import VerificationForm from "./components/VerificationForm";
import PrivateRoute from "./components/PrivateRoute";
const axios = require("axios");

const App = () => {
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

  // state = { web3: null, accounts: null, contract: null };

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     // const networkId = await web3.eth.net.getId();
  //     // const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     // const instance = new web3.eth.Contract(
  //     //   SimpleStorageContract.abi,
  //     //   deployedNetwork && deployedNetwork.address
  //     // );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`
  //     );
  //     console.error(error);
  //   }
  // };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   // await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   // const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   // this.setState({ storageValue: response });
  // };

  // render() {
  //   if (!this.state.web3) {
  //     return <div>Loading Web3, accounts, and contract...</div>;
  //   }
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
