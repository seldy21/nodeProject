import React from "react";
import { useLocation } from "react-router-dom";
import Home from '../pages/home';
import Intro from '../pages/intro';
import Board from '../pages/board';
import Diary from '../pages/diary';
import Write from "../pages/write";
import Detail from "../pages/detail";

function Pages() {
  const location = useLocation();
  return <div className="contentWrapper">
  {location.pathname === '/' && <Home/>}
  {location.pathname === '/intro' && <Intro/>}
  {location.pathname === '/write' && <Write/>}
  {location.pathname.split('/')[1] === 'diary' && <Diary/>}
  {location.pathname.split('/')[1] === 'board' && <Board/>}
  {location.pathname === '/detail' && <Detail/>}
  </div>;
}

export default Pages;
