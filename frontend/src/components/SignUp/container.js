import React from "react";
import { connect } from "react-redux";
import userAction from "../../redux/action/userAction";

function Conteiner(props) {
  function SignOut() {
    props.signOut(props.user.email);
    console.log(props);
  }
  return (
    <>
      {props.user ? (
        <>
          <div>
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "ffffff52",
                textAlign: "center",
                alignItems: "center",
                margin: "auto",
                color: "#345234",
              }}
            >
              <h1>
                logged in user {props.user.name}
                {props.user.lastname} {props.user.from[0]}
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <button
                onClick={SignOut}
                className="btn__signout btn btn-primary btn-block"
                style={{ maxWidth: 400 }}
              >
                SignOut
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <h1 className="loginh1">There is no user connected</h1>
        </div>
      )}
      <div className="card2">
        <article className="card-body mx-auto" style={{ maxWidth: 400 }}>
          <h4 className="card-title mt-3 text-center">User Account</h4>
          <p className="text-center">Get started with your free account</p>

          <p className="divider-text">
            <span className="bg-light"></span>
          </p>
        </article>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
const mapDispatchToProps = {
  signOut: userAction.signOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(Conteiner);
