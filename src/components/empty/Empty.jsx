import React from "react";
import { NavLink } from "react-router-dom";
import foto from '../../assets/empty.svg'
import style from "./empty.module.scss";

const Empty = () => {
  return (
    <div className={style.block}>
      <img src={foto} className={style.block_foto} alt="foto" />

      <div className={style.block_description}>Упс, здесь еще ничего нет!</div>
      <NavLink to={"/"}>
        <div className={style.block_return_MainPage}>Поиск Вакансий</div>
      </NavLink>
    </div>
  );
};

export default Empty;
