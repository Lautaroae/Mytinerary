import React, { useState } from "react";
import { connect } from "react-redux";
import userActions from "../../redux/action/userAction";
import { Link as LinkRouter } from "react-router-dom";
import Container from "./container";
import selectCountries from "../apiNombres";
import Snackbar from "../Snackbar";
import FacebookSignUp from "./FacebookSignUp";
import selectCountry from "../apiNombres";

function SignUp(props) {
  const [selectCountry, setCountry] = useState("unselected");

  function selected(event) {
    console.log(event.target.value);
    setCountry(event.target.value);
  }

  console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0]);
    const userData = {
      name: event.target[0].value,
      lastName: event.target[1].value,
      email: event.target[3].value,
      password: event.target[4].value,
      image: event.target[2].value,
      country: selectCountry,
      from: "signup",
    };
    console.log(userData);
    props.signUp(userData);
  };
  console.log(props.message);

  return (
    <>
      <Snackbar />

      <div className="login">
        <div>
          <select className="__select" onChange={selected}>
            <option className="__option" value={""}>
              {" "}
              -select your country-{" "}
            </option>
            {selectCountries.map((countries) => {
              return (
                <option key={countries.name} value={countries.name}>
                  {countries.name}
                </option>
              );
            })}
          </select>
        </div>
        {selectCountry !== "unselected" ? (
          <>
            <div>
              <Container />
              <Snackbar />
              <FacebookSignUp country={selectCountry} />
              <form onSubmit={handleSubmit} className="form__">
                <div className="form-group input-group">
                  <div className="input-group-prepend"></div>

                  <input
                    name="Name"
                    className="form-control"
                    placeholder=" Name"
                    type="text"
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend"></div>

                  <input
                    name="last name"
                    className="form-control"
                    placeholder="Last name"
                    type="text"
                  />

                  <div className="form-group input-group">
                    <div className="input-group-prepend"></div>
                  </div>

                  <input
                    name="image"
                    className="form-control"
                    placeholder="Photo URL"
                    type="text"
                  />
                  <div className="form-group input-group">
                    <div className="input-group-prepend"></div>
                  </div>

                  <input
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    type="email"
                  />
                </div>

                <div className="form-group input-group">
                  <div className="input-group-prepend"></div>

                  <input
                    name="password"
                    className="form-control"
                    placeholder="Create password"
                    type="password"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn__sign btn btn-primary btn-block btn-Sign"
                  >
                    Create Account
                  </button>
                </div>
                <div className="text-center">
                  Have an account? <LinkRouter to="/SignIn">SignIn</LinkRouter>
                </div>
              </form>
            </div>
          </>
        ) : (
          <h2 className="__select">Select your country to continue signUp</h2>
        )}
      </div>
    </>
  );
}

const mapDispatchToProps = {
  signUp: userActions.signUp,
};
const mapStateToProps = (state) => {
  return {
    Snackbar: state.userReducer.Snackbar,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
