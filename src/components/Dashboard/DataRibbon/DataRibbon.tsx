import React from "react";
import { Grid } from "@mui/material";
import DataCard from "../DataCard";
import scss from "./DataRibbon.module.scss";

const DataRibbon = () => {
  // These values would typically come from your API or state management
  const ticketStats = {
    unassigned: 42,
    assigned: 78,
    unresolved: 95,
    resolved: 125,
    rejected: 15
  };

  return (
    <Grid container gap={2} className={scss.dataRibbon}>
      <Grid>
        <DataCard
          title="Unassigned Tickets"
          value={ticketStats.unassigned.toString()}
          description="Tickets that have not been assigned to any agent"
        />
      </Grid>
      <Grid>
        <DataCard
          title="Assigned Tickets"
          value={ticketStats.assigned.toString()}
          description="Tickets currently assigned to support agents"
        />
      </Grid>
      <Grid>
        <DataCard
          title="Unresolved Tickets"
          value={ticketStats.unresolved.toString()}
          description="Total number of open tickets awaiting resolution"
        />
      </Grid>
      <Grid>
        <DataCard
          title="Resolved Tickets"
          value={ticketStats.resolved.toString()}
          description="Tickets that have been successfully resolved"
        />
      </Grid>
      <Grid>
        <DataCard
          title="Rejected Tickets"
          value={ticketStats.rejected.toString()}
          description="Tickets that have been rejected or cancelled"
        />
      </Grid>
    </Grid>
  );
};

export default DataRibbon;