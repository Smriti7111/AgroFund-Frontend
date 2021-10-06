import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import axios from "axios";

const InvestorVerificationRequest = (props) => {
  const { name, _id } = props.val;
  const history = useHistory();

  const showInvestorDetails = () => {
    history.push("/individualInvestorDetail");
  };

  const verifyInvestor = async () => {
    await axios({
      method: "PUT",
      url: `/api/investor/${_id}`,
      data: { isVerified: true },
    });
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">
        <Button
          startIcon={<VisibilityIcon />}
          variant="contained"
          onClick={showInvestorDetails}
        >
          View Details
        </Button>{" "}
        <Button
          style={{ backgroundColor: "#2bad4e", color: "white" }}
          startIcon={<CheckBoxIcon />}
          variant="contained"
          onClick={verifyInvestor}
        >
          Verify
        </Button>{" "}
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="secondary"
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InvestorVerificationRequest;
