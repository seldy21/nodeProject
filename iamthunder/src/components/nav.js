import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { NavMenu } from "../navMenu";

function Nav(props) {
  const { navShow, setNavShow, isDesktopOrLaptop } = props;
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
          <ul key={`ul_${item.id}`}>
            {item.list.map((list) => (
              <li key={`li_${list.id}}`}>
                <Link
                  to={list.path}
                  onClick={() => {
                    !isDesktopOrLaptop && setNavShow(false);
                  }}
                  className="navItem"
                >
                  <img src={list.icon} alt="" className="navIcons" />
                  {list.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
