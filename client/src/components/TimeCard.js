import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  card: {
    minWidth: 275,
    margin: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  const { classes, timer, calculateDifference, deleteTimer } = props;
  return (
    <Card
      className={classes.card}
      style={!timer.ended_at ? { background: "#892785" } : null}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color={!timer.ended_at ? "secondary" : "textSecondary"}
          gutterBottom
        >
          Started {moment(timer.created_at).fromNow()}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color={!timer.ended_at ? "secondary" : "inherit"}
        >
          {timer.description}
        </Typography>
        <Typography
          className={classes.pos}
          color={!timer.ended_at ? "secondary" : "textSecondary"}
        >
          {timer.ended_at
            ? `Ended ${moment(timer.updated_at).fromNow()}`
            : "In Progress"}
        </Typography>
        <Typography
          component="p"
          color={!timer.ended_at ? "secondary" : "inherit"}
        >
          {timer.ended_at
            ? `Total Time ${calculateDifference(
                timer.started_at,
                timer.ended_at
              )}`
            : "Still in progress"}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="Add to favorites"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete timer?")) {
              deleteTimer(timer.id);
            } else {
              return;
            }
          }}
          color={!timer.ended_at ? "secondary" : "default"}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
