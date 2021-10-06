import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    height: 500,
  },
  title: {
    marginBottom: 12,
  },
  pos: {
    fontSize: 14,
  },
});

const IndividualFarmerDetail = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Farmer Details
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default IndividualFarmerDetail;
