import { Button, ButtonGroup, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import axios from "axios";

const FarmerVerificationRequest = (props) => {
  const farmerDetails = props.val;
  const { name, _id } = farmerDetails;
  const history = useHistory();

  const showFarmerDetails = () => {
    history.push("/individualFarmerDetail");
  };

  const verifyUser = async () => {
    await axios({
      method: "PUT",
      url: `/api/farmer/${_id}`,
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
          onClick={showFarmerDetails}
        >
          View Details
        </Button>{" "}
        <Button
          style={{ backgroundColor: "#2bad4e", color: "white" }}
          startIcon={<CheckBoxIcon />}
          variant="contained"
          onClick={verifyUser}
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

export default FarmerVerificationRequest;
