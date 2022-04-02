import React from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import userActions from "../../redux/action/userAction";
import "../../style.css";

function FacebookSignIn(props) {
  const responseFacebook = async (res) => {
    console.log(res);
    const logedUser = {
      email: res.email,
      Image: res.picture.data.url,
      country: "facebook",
      password: res.id,
      from: "facebook",
    };
    await props.signIn(logedUser);
  };

  return (
    <FacebookLogin
      cssClass="buttonsocial my-facebook-button-class"
      icon="fa-facebook"
      textButton=" with Facebook"
      appId="1096093190965715"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
}
const mapDispatchToProps = {
  signIn: userActions.signIn,
};

export default connect(null, mapDispatchToProps)(FacebookSignIn);
