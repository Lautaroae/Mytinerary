import { Link as LinkRouter } from "react-router-dom";

export default function AppHero() {
  return (
    <div className="hero">
      <div className="px-4 py-5 my-5 text-center">
        <div>
          <p className="texto">
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <LinkRouter to="/cities">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Let's go around the world!
              </button>
            </LinkRouter>
          </div>
        </div>
      </div>
    </div>
  );
}
