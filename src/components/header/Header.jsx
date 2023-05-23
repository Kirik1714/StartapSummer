import React,{useState}from "react";
import {  NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/logo.svg";
import logoSmall from "../../assets/logoSmall.svg";



import style from "./Header.module.scss";

export const Header = () => {
  const [width,setWidth] =React.useState(window.innerWidth)
  

  const location=useLocation();
  React.useEffect(()=>{
    // ForWidth
    const handleResize = (event) => {
     setWidth(event.target.innerWidth);
   };

   window.addEventListener('resize', handleResize);

   return () => {
     window.removeEventListener('resize', handleResize);
   };},[])

  return (
    <div className={style.block}>
      <nav className={style.block_nav}>
        <div className={style.block_nav_logo}>
          <NavLink to="/"  >
            {width>=500?
            <img src={logo} alt="Логотип" />:

            <img src={logoSmall} alt="Логотип" />


            }
          </NavLink>
        </div>
        <div className={style.block_nav_pages}>
          <NavLink to="/"  className = { navData => navData.isActive || location.pathname.includes('fullVacancy') ? style.active : style.item }>
            Поиск вакансий
          </NavLink>
          <NavLink to="/favorite" className = { navData => navData.isActive ? style.active : style.item }>
           Избранное
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
