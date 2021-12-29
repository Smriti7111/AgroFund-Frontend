import React, { useEffect, useState } from "react";
import DashboardAdmin from "./dashboard";
import Table from "../../../components/Dashboard/Table";
import axios from "axios";

const columns = [
  {
    title: "Title",
    field: "title",
  },
  {
    title: "Owner",
    field: "owner",
  },
  {
    title: "Minimun Inv.",
    field: "minimumInvestment",
  },
  {
    title: "Last Date",
    field: "lastDateOfInvestmen",
  },
  {
    title: "Project Status",
    field: "status",
  },
  {
    title: "Active Status",
    field: "isActive",
  },
  {
    title: "Fund Pool",
    field: "investmentToBeRaised",
  },
];

const actions = [
  {
    icon: "delete",
    tooltip: "Remove Project",
    onClick: (event, rowData) => {
      // Do save operation
    },
  },
];

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "/api/project",
    }).then((res) => {
      setProjects(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardAdmin>
      <Table
        title="All Projects"
        column={columns}
        data={projects}
        actions={actions}
        loading={loading}
      />
    </DashboardAdmin>
  );
};

export default Project;
