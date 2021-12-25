import React, { useEffect, useState } from "react";
import DashboardAdmin from "./dashboard";
import Table from "../../../components/Dashboard/Table";
import axios from "axios";

const url = "http://localhost:8888/";
const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Address",
    field: "address",
  },

  {
    title: "Pan No",
    field: "panNo",
  },
  {
    title: "Pan File",
    field: "pan",
    filtering: false,
    render: (rowData) => (
      <a href={`${url}/${rowData.pan}`} target="_blank">
        View File
      </a>
    ),
  },
  {
    title: "Citizenship No",
    field: "citizenshipNo",
  },
  {
    title: "Citizenship File",
    field: "citizenship",
    filtering: false,
    render: (rowData) => (
      <a href={`${url}/${rowData.citizenship}`} target="_blank">
        View File
      </a>
    ),
  },
];

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "/api/admin/verificationRequests/farmer",
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
    }).then((res) => {
      setRequests(res.data.data);
      console.log("All requests are:", res.data.data);
      setLoading(false);
    });
  }, [response]);

  const verifyFarmer = (farmerId) => {
    axios({
      method: "put",
      url: `/api/admin/verifyFarmer/${farmerId}`,
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => setResponse(res.data.message))
      .catch((e) => console.log(e.message));
  };

  const actions = [
    {
      icon: "verified_user",
      tooltip: "Verify",
      onClick: (event, rowData) => {
        console.log(rowData._id);
        verifyFarmer(rowData._id);
      },
    },
    {
      icon: "block",
      tooltip: "Decline",
      onClick: (event, rowData) => {},
    },
  ];

  return (
    <DashboardAdmin>
      <Table
        title="Farmer Verification Requests"
        column={columns}
        data={requests}
        actions={actions}
        loading={loading}
      />
    </DashboardAdmin>
  );
};

export default Request;
