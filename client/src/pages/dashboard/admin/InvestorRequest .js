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

const InvestorRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "/api/admin/verificationRequests/investor",
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
    }).then((res) => {
      setRequests(res.data.data);
      console.log("All requests are:", res.data.data);
      setLoading(false);
    });
  }, []);

  // Actions of tables
  const actions = [
    {
      icon: "verified_user",
      tooltip: "Verify",
      onClick: (event, rowData) => {
        // Do save operation
      },
    },
    {
      icon: "block",
      tooltip: "Decline",
      onClick: (event, rowData) => {
        // Do save operation
      },
    },
  ];
  return (
    <DashboardAdmin>
      <Table
        title="Investor Verification Requests"
        column={columns}
        data={requests}
        actions={actions}
        loading={loading}
      />
    </DashboardAdmin>
  );
};

export default InvestorRequest;
