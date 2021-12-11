import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    width: "80%",
  },
  media: {
    height: 140,
  },
});
const SingleProject = (props) => {
  const classes = useStyles();
  const { title, investmentToBeRaised, maximumInvestment, minimumInvestment } =
    props.val;
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
          <Button size="small" color="primary">
            Show Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default SingleProject;
