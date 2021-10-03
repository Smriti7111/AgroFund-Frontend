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
  const [farmerData, setFarmerData] = useState(null);
  const [verificationData, setVerificationData] = useState([]);
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
            console.log("condition", conditionArray.indexOf(false));
            if (
              conditionArray.indexOf(false) == -1 &&
              value.isVerified == false
            ) {
              setVerificationData((prevState) => [...prevState, value]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    getFarmersWithRequest();
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
            {verificationData ? (
              verificationData.map((value, index) => {
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
    </>
  );
};

export default DashboardAdmin;
