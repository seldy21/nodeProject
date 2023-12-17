import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { NavMenu } from "../navMenu";

import "@natscale/react-calendar/dist/main.css";
import NavCalendar from "./navCalendar";

function Nav(props) {
  const { navShow, setNavShow, isDesktopOrLaptop, isTablet } = props;
  useEffect(() => {
    isDesktopOrLaptop && setNavShow(true);
  }, []);

  return (
    <div className={`navBackground ${navShow ? "show" : ""}`}>
      <nav className={`${navShow ? "" : "hiddenNav"} scroll`}>
        <IoClose
          className={`menuClose ${navShow ? "" : "d-none"}`}
          onClick={() => {
            setNavShow(false);
          }}
        />
        {NavMenu.map((item) => (
          <ul key={`ul_${item.id}`} className="nav_ul">
            {item.list.map((list) => (
              <li key={`li_${list.id}}`}>
                <Link
                  to={list.path}
                  onClick={() => {
                    !isDesktopOrLaptop && setNavShow(false);
                  }}
                  className="navItem"
                >
                  {/* <img src={list.icon} alt="" className="navIcons" /> */}
                  {list.icon}
                  {list.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
        <div className="d-flex w-100 justify-content-center">
          <NavCalendar isDesktopOrLaptop={isDesktopOrLaptop} isTablet={isTablet} setNavShow={setNavShow} />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
