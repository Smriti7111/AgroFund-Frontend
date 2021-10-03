import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import MyAlert from "../../../components/MyAlert";
import axios from "axios";
import FarmerVerificationRequest from "../../../components/FarmerVerificationRequest";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import InvestorVerificationRequest from "../../../components/InvestorVerificationRequest";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  root: {
    width: "100%",
  },
});

const DashboardAdmin = (props) => {
  const { showAlert, message } = props;
  const [alert, setAlert] = useState(showAlert);
  const [farmerVeriData, setFarmerVeriData] = useState([]);
  const [investorVeriData, setInvestorVeriData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getFarmersWithRequest = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/farmer",
        });
        let resData = res.data.data;
        resData &&
          resData.map((value) => {
            const conditionArray = [
              value.hasPhoneVerified,
              value.citizenshipNo != "",
              value.citizenship != "",
              value.panNo != "",
              value.pan != "",
            ];
            if (
              conditionArray.indexOf(false) == -1 &&
              value.isVerified == false
            ) {
              setFarmerVeriData((prevState) => [...prevState, value]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    const getInvestorsWithRequest = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/investor",
        });
        let resData = res.data.data;
        resData &&
          resData.map((value) => {
            const conditionArray = [
              value.isPhoneVerified,
              value.citizenshipNo != "",
              value.citizenship != "",
            ];
            if (
              conditionArray.indexOf(false) == -1 &&
              value.isVerified == false
            ) {
              setInvestorVeriData((prevState) => [...prevState, value]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    getFarmersWithRequest();
    getInvestorsWithRequest();
  }, []);

  return (
    <>
      {message ? (
        alert ? (
          <MyAlert setAlert={setAlert} severity="success" message={message} />
        ) : null
      ) : null}
      <Navbar />
      <h2>Show Farmer Verification Requests</h2>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farmerVeriData ? (
              farmerVeriData.map((value, index) => {
                return <FarmerVerificationRequest key={index} val={value} />;
              })
            ) : (
              <div className={classes.root}>
                <Skeleton />
                <Skeleton animation={false} />
                <Skeleton animation="wave" />
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Show Investor Verification Requests</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investorVeriData ? (
              investorVeriData.map((value, index) => {
                return <InvestorVerificationRequest key={index} val={value} />;
              })
            ) : (
              <div className={classes.root}>
                <Skeleton />
                <Skeleton animation={false} />
                <Skeleton animation="wave" />
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardAdmin;
