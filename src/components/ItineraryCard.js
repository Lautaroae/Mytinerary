import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import itineraryAction from "../redux/action/itineraryAction";
import ciudadesAction from "../redux/action/ciudadesAction";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Activity from "../components/activity";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from "../components/Snackbar";


const CardDetalle = (props) => {
  const { id } = useParams();
  const [detailCard, setDetailCard] = useState();
  const [inputText, setInputText] = useState()
  const [reload, setReload] = useState(false)
  const [modify, setModify] = useState()
  console.log(props.itinerariesData);


  useEffect(() => {


    props
      .obtenerUnaCiudad(id)
      .then((response) => setDetailCard(response.ciudad));

    props.getAllActivities();
    props.fetchearApiData(id);
  }, [reload]);


  function ButtonLike(id) {

    props.likeDislike(id)

      .then(() => setReload(!reload))
  }

  async function addComment(itineraryId) {

    const commentData = {
      itinerary: itineraryId,
      comment: inputText,
    }
    await props.addComment(commentData)
      .then(response => setInputText(""))

  }

  async function modifyComment(id) {
    const commentData = {
      commentID: id,
      comment: modify,

    }
    await props.modifyComment(commentData)
    setReload(!reload)

  }


  async function deleteComment(id) {
    await props.deleteComment(id)

    setReload(!reload)
  }


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <>
        <div className="listData__iti">
          <div className="card__container">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={detailCard?.img} class="img-fluid__iti" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {detailCard?.ciudad} - {detailCard?.pais}
                    </h5>
                    <p className="card-txt">{detailCard?.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* itinerarios */}
      <Snackbar />
      {props.itinerariesData.itinerary?.map((datos) => (
        <div className="card__container--iti">

          <Card
            sx={{
              bgcolor: "#e1e1e171",
              width: "100%",
              boxShadow: 5,
            }}
          >
            <CardHeader
              calassName="card__iti"
              avatar={<Avatar src={datos.author.photo} />}
              action={<IconButton aria-label="settings"></IconButton>}
              title={datos.author.name}
            />
            <CardMedia
              className="img"
              component="img"
              height="194"
              image={datos.photos}
            />
            <CardContent>
              <Typography variant="Caveat" color="text.secondary">
                {datos.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <div className="price-duration-likes">
                <IconButton className="__corazon" aria-label="add to favorites" onClick={() => {
                  ButtonLike(datos._id)
                }}>  <FavoriteIcon className="corazon" /> <span> {datos.likes.length}</span>

                </IconButton>

                <p className="price">Price: {"💵".repeat(datos.price)}</p>
                <p className="duration">Duration: {datos.duration} hs🕑 </p>
              </div>


              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Typography className="hashtags" variant="Amatic SC" paragraph>
              {datos.hashtags}
            </Typography>

            <Collapse in={expanded}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  padding: "1rem",
                }}
              >
                <Activity itineraryId={datos._id} />
              </div>

              <CardContent>
                <Typography
                  className="descripcion"
                  variant="Amatic SC"
                  paragraph
                >
                  {datos.descripcion}
                </Typography>


                <Typography>


                  <div class="accordion" id={datos?.cityId}>


                    {datos?.comments.map(comment =>
                      <>
                        {comment.userID?._id !== props.user?.id ?

                          <div className=" cardComments " key={comment._id}>
                            {console.log(comment)}

                            <div className="card-header">
                              {comment.userID?.name}
                            </div>
                            <div className="card-body">
                              <p className="card-text"> {comment.comment}</p>
                            </div>
                          </div> :

                          <div className=" cardComments">
                            <div className="card-header">
                              {comment.userID.name}
                            </div>

                            <div className="card-body ">
                              <textarea type="text" className="card-text textComments" onChange={(event) => setModify(event.target.value)} defaultValue={comment.comment} />
                              <button id={comment._id} onClick={() => modifyComment(comment._id)} className="btn__modify btn-primary">Modify</button>
                              <button id={comment._id} onClick={() => deleteComment(comment._id)} className="btn__delete btn-primary">Delete</button>
                              {/* {console.log(comment._id)} */}
                            </div>
                          </div>

                        }
                      </>
                    )}

                    {props.user ?
                      <div className=" cardComments">
                        <div className="card-header">

                          WRITE YOUR COMMENT
                        </div>
                        <div className="card-body ">
                          <textarea onChange={(event) => setInputText(event.target.value)} className="card-text textComments" value={inputText} />
                          <button onClick={() => addComment(datos._id)} className="btn__add btn-primary">Load</button>
                        </div>
                      </div> :
                      <h1>Make singIn and leave us your comment</h1>
                    }

                  </div>

                  <div />
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ))}
    </>
  );
};

const mapDispatchToProps = {
  fetchearApiData: itineraryAction.fetchearApiData,
  obtenerUnaCiudad: ciudadesAction.obtenerUnaCiudad,
  addComment: itineraryAction.addComment,
  deleteComment: itineraryAction.deleteComment,
  modifyComment: itineraryAction.modifyComment,
  getAllActivities: itineraryAction.getAllActivities,
  likeDislike: itineraryAction.likeDislike
};

const mapStateToProps = (state) => {
  return {
    itinerariesData: state.itineraryReducer.itinerariesData,
    auxiliar: state.ciudadesReducer.auxiliar,
    ciudades: state.ciudadesReducer.ciudades,
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetalle);
