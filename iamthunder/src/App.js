import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import { TiThMenu } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import Pages from "./components/pages";
import { useMediaQuery } from "react-responsive";

function App() {
  const [navShow, setNavShow] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1199px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return (
    <div className="App">
      <header className="my_header">
        <div className="d-flex p-3 align-items-center">
          <h1
            className="mb-0 flex-grow-1 text-center"
            onClick={() => {
              // navigate("/");
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/mySquirrel.svg`}
              className="logo_squirrel"
              alt=""
            />
            다다람지의 공간
          </h1>
          <TiThMenu
            className="hamburgerMenu"
            onClick={() => {
              setNavShow(true);
            }}
          />
        </div>
      </header>
      <div className="full_container">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Pages />} />
            <Route path="/intro" element={<Pages />} />
            <Route path="/write" element={<Pages />} />
            <Route path="/diary/:category" element={<Pages />} />
            <Route path="/board/:category" element={<Pages />} />
            <Route path="/detail" element={<Pages />} />
          </Routes>
          <Nav
            navShow={navShow}
            setNavShow={setNavShow}
            isDesktopOrLaptop={isDesktopOrLaptop}
            isTablet={isTablet}
          />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
