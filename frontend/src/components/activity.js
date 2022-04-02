import { useEffect, useState } from "react";
import { connect } from "react-redux";
import itinerariesActions from "../redux/action/itineraryAction";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Activities = (props) => {
  const [activities, setActivities] = useState();

  useEffect(() => {
    setActivities(
      props.allActivities.filter(
        (activity) => activity.itineraryId === props.itineraryId
      )
    );
  }, [props.itineraryId]);

  return (
    <>


      {activities?.map((data) => (
        <Card className="activiti__content" sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="80%"
              img
              src={data.pic}
              className="activiti__foto"
              alt="g"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div className="activiti__txt">{data.title}</div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    allActivities: state.itineraryReducer.activities,
  };
};

const mapDispatchToProps = {
  getActivities: itinerariesActions.getActivities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
