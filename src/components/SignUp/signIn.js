import "../../style.css";
import React from "react";
import { connect } from "react-redux";
import userAction from "../../redux/action/userAction";
import { Link as LinkRouter } from "react-router-dom";
import Container from "./container";
import Snackbar from "../Snackbar";
import FacebookSignIn from "../SignUp/FacebookSignIn";

function SignIn(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const logedUser = {
      email: event.target[0].value,
      password: event.target[1].value,
      from: "signIn",
    };
    props.signIn(logedUser);
  };

  return (
    <div className="login">
      {console.log(props.user)}
      <Container />
      <Snackbar />
      <FacebookSignIn />
      <form onSubmit={handleSubmit} className="form__">
        <div className="form-group input-group">
          <div className="input-group-prepend"></div>
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
            placeholder=" Password"
            type="password"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            {" "}
            SignIn{" "}
          </button>
        </div>
        <div className="text-center">
          Dont Have an account? <LinkRouter to={"/SignUp"}>signUp</LinkRouter>
        </div>
      </form>
    </div>
  );
}
{
}
const mapDispatchToProps = {
  signIn: userAction.signIn,
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
