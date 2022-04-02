import Hero from "../components/hero";
import Main from "./main";
import Carrousel from "./carrousel";
import Carrousel2 from "./carrousel2";

export default function AppHome() {
  return (
    <>
      <Hero />

      <div className="div-main__carr">
        <Main />
      </div>
      <div className="div-carr">
        <div className="div__carr-1">
          <Carrousel />
        </div>
        <div className="div__carr-2">
          <Carrousel2 />
        </div>
      </div>
    </>
  );
}
