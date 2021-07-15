import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";

const MyAlert = (props) => {
  const { severity, message, setAlert } = props;
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("hi there");
      setAlert(false);
      // Disable your alert after 5 seconds
    }, 5000);

    return () => {
      clearTimeout(timeout); // Clears timer in case you close your alert somewhere else.
    };
  }, []);

  return (
    <Alert onClose={() => setAlert(false)} severity={severity}>
      {message}
    </Alert>
  );
};

export default MyAlert;
