import React, { useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";

const Table = (props) => {
  const [filtering, setFiltering] = useState(false);
  return (
    <MaterialTable
      columns={props.column}
      data={props.data}
      actions={[
        ...props.actions,
        {
          icon: "filter_list",
          tooltip: "Show Filter",
          isFreeAction: true,
          onClick: () => {
            setFiltering(!filtering);
          },
        },
      ]}
      title={props.title || ""}
      options={{
        headerStyle: {
          backgroundColor: "#06a120",
          color: "#FFF",
        },
        actionsColumnIndex: -1,
        filtering: filtering,
      }}
      isLoading={props.loading || false}
    />
  );
};

export default Table;
