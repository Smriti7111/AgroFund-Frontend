import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";

const InvestorVerificationRequest = (props) => {
  const { name } = props.val;
  const history = useHistory();

  const showInvestorDetails = () => {
    history.push("/individualInvestorDetail");
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
