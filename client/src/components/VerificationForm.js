import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState({
    code: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationCode((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = sessionStorage.getItem("id");
    const res = await axios({
      method: "POST",
      url: `/api/farmer/verifyCode/${id}`,
      data: verificationCode,
    });
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="code"
        label="Type the verification Code in your Phone"
        name="code"
        value={verificationCode.code}
        onChange={handleChange}
        autoFocus
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Verify Code
      </Button>
    </form>
  );
};

export default VerificationForm;
