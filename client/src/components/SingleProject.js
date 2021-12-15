import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  media: {
    height: 140,
  },
  paper: {
    position: "absolute",
    width: "60%",
    height: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const SingleProject = (props) => {
  const classes = useStyles();
  const {
    title,
    projectDescription,
    investmentToBeRaised,
    maximumInvestment,
    minimumInvestment,
    lastDateOfInvestment,
    expectedDateOfProjectCompletion,
    returnPerMinimumInvestment,
    status,
  } = props.val;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = { left: "17%", top: "8%", border: "1px solid blue" };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://media.istockphoto.com/photos/apple-orchard-ready-for-harvest-picture-id613534346?k=20&m=613534346&s=612x612&w=0&h=Ijfnoo82TIfr4oHk9e1VWrD4Arcczm-y2TdY2ECcgS0="
            title="Contemplative Reptile"
          />
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Investment to be raised : </b>
            {investmentToBeRaised}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Maximum Investment : </b>
            {maximumInvestment}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Minimum Investment : </b>
            {minimumInvestment}
          </Typography>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            Show Details
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography gutterBottom variant="h5" component="h2">
                <b>Project Name : </b>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Investment to be raised : </b>
                {investmentToBeRaised}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Maximum Investment : </b>
                {maximumInvestment}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Minimum Investment : </b>
                {minimumInvestment}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Return per Minimum Investment : </b>
                {returnPerMinimumInvestment}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Last Date of Investment : </b>
                {lastDateOfInvestment}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Expected Date of Completion : </b>
                {expectedDateOfProjectCompletion}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Status of Project : </b>
                {status}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default SingleProject;
