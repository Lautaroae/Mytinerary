import React from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import userActions from "../../redux/action/userAction";
import "../../style.css";

function FacebookSignUp(props) {
  const responseFacebook = async (res) => {
    console.log(res);
    console.log(res.name);
    const nameSeparate = res.name.split(" ");
    console.log(nameSeparate);
    let name = nameSeparate[0];
    let lastName = nameSeparate[1];
    console.log(name);
    console.log(lastName);

    const userData = {
      name: nameSeparate[0],
      lastName: nameSeparate[1],
      country: props.country,
      email: res.email,
      password: res.id,
      from: "facebook",
    };
    await props.signUp(userData);
  };

  return (
    <FacebookLogin
      cssClass="buttonsocial my-facebook-button-class"
      icon="fa-facebook"
      textButton=" SignUp with Facebook"
      appId="1096093190965715"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
}
const mapDispatchToProps = {
  signUp: userActions.signUp,
};

export default connect(null, mapDispatchToProps)(FacebookSignUp);
