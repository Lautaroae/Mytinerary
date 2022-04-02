import React, { useEffect } from "react";
import { connect } from "react-redux";
import citiesActions from "../redux/action/ciudadesAction";
import { Link as LinkRouter } from "react-router-dom";

const Card = (props) => {
  useEffect(() => {
    props.fetchApiData();
    console.log();
  }, []);

  function filtroCiudad(event) {
    props.filtroCiudad(props.ciudades, event.target.value);

  }
  console.log(props);
  return (
    <>
      <div className="listContainer">
        <div className="search__container">
          <input
            onChange={filtroCiudad}
            placeholder="search your cities"
          ></input>
        </div>
        {props.ciudades.length > 0 &&
          props.filterApidata?.map((data) => (
            <div key={data.id} className="listData">
              <div className="card__container">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={data.img} class="img-fluid" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {data.ciudad} - {data.pais}
                        </h5>
                        <p className="card-txt">{data.descripcion}</p>

                        <div className="text-muted">
                          <LinkRouter to={`/itinerarys/${data._id}`}>
                            <p>
                              <a>More info!</a>
                            </p>
                          </LinkRouter>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
const mapDispatchToProps = {
  fetchApiData: citiesActions.fetchApiData,
  filtroCiudad: citiesActions.filtroCiudad,
};

const mapStateToProps = (state) => {
  return {
    ciudades: state.ciudadesReducer.ciudades,
    filterApidata: state.ciudadesReducer.filterApidata,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
