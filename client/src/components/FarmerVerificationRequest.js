import { Button, ButtonGroup, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";

const FarmerVerificationRequest = (props) => {
  const { name } = props.val;
  const history = useHistory();

  const showFarmerDetails = () => {
    history.push("/individualFarmerDetail");
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
