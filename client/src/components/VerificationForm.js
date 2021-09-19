import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState({
    code: "",
  });
  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let isPhoneVerified = userData.isPhoneVerified;
  const [phoneverify, setIsPhoneVerify] = useState(isPhoneVerified);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationCode((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = userData._id;
    console.log(id);
    const res = await axios({
      method: "POST",
      url: `/api/farmer/verifyCode/${id}`,
      data: verificationCode,
    });
    let resData = res.data;
    let status = resData.data.status;
    if (status === "approved") {
      setIsPhoneVerify(true);
      userData.isPhoneVerified = true;
      sessionStorage.setItem("userdata", JSON.stringify(userData));
    }
  };
  return phoneverify ? (
    <p>Document Verification Form</p>
  ) : (
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
