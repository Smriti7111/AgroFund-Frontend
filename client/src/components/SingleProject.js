import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
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
  const { title, investmentToBeRaised, maximumInvestment, minimumInvestment } =
    props.val;
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
          hello
        </div>
      </Modal>
    </>
  );
};

export default SingleProject;
