import "./style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Cities from "./pages/cities";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Itinerarys from "./pages/itinerarys";
import SignUp from "./components/SignUp/signUp";
import SignIn from "./components/SignUp/signIn";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { getThemeProps } from "@mui/system";
import userAction from "./redux/action/userAction";

function App(props) {
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      props.verifyToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="navBar">
          <Navbar />
        </div>

        <Routes>
          <Route path="*" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cities" element={<Cities />}></Route>
          <Route path="/itinerarys/:id" element={<Itinerarys />}></Route>
          {!props.user && <Route path="/SingUp" element={<SignUp />}></Route>}
          {!props.user && <Route path="/SingIn" element={<SignIn />}></Route>}
        </Routes>
        {/* <toastContainer
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}
const mapDispatchToProps = {
  verifyToken: userAction.verifyToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
