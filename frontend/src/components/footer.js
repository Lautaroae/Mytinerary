import Logo from "./img/logo.png";
import { Link as LinkRouter } from "react-router-dom";

export default function AppFooter() {
  return (
    <>
      <div className="footer">
        <div className="iconos-botones-logo">
          <div className="iconos__footer">
            <a
              href="https://www.facebook.com/MYtinerarytheapp"
              className="fab fa-facebook"
            ></a>
            <a
              href="https://www.instagram.com/mytinerary_/"
              className="fab fa-instagram"
            ></a>
            <a
              href="https://api.whatsapp.com/send/?phone=5491115151515&text&app_absent=0"
              className="fab fa-whatsapp"
            ></a>
          </div>

          <div className="logo-footer">
            <img src={Logo} alt="logo" className="logo" />
            <div className="txt-dir">
              <a href="https://goo.gl/maps/UGXJitWZKtS7WcHj6">
                8590 Sunset Blvd, West Hollywood
              </a>
            </div>
          </div>

          <div className="botones__footer">
            <LinkRouter to="*">
              <button className="btn-footer">Home</button>
            </LinkRouter>
            <LinkRouter to="/cities">
              <button className="btn-footer">Cities</button>
            </LinkRouter>
            <LinkRouter to="/SingIn">
              <button className="btn-footer">Sign In</button>
            </LinkRouter>
            <LinkRouter to="/SingUp">
              <button className="btn-footer">Sign Up</button>
            </LinkRouter>
          </div>
        </div>

        <div className="txt">
          <p> MY Tinerary &copy; 2022 All rights reserved</p>
        </div>
      </div>
    </>
  );
}
