import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import emptyStar from "../../assets/emptyStar.svg";
import fullstar from "../../assets/fullstar.svg";
import point from "../../assets/point.svg";
import place from "../../assets/place.svg";

import style from "./Vacancy.module.scss";
import { setFavoriteVacanciesF } from "../../redux/Slices/favoriteSlice";
import { setFavoriteVacancyM } from "../../redux/Slices/vacancySlice";

const Vacancy = (props) => {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(props.sortArr.includes(props.id));

  console.log(props.sortArr);

  const dispatch = useDispatch();

  const isFullVacancy = location.pathname.includes("fullVacancy")
    ? style.block_description_bigTitle
    : style.block_description_title;

  const changeFavorite = () => {
    // //For favoriteSlice
    dispatch(setFavoriteVacanciesF(props));

    // //For vacancySlice
    dispatch(setFavoriteVacancyM(props.id));
    setIsFavorite(!isFavorite);
  };


  


  return (
    <>
      <div className={style.block} data-elem={`vacancy-${props.id}`}>
        <NavLink
          to={`/fullVacancy/${props.id}`}
          key={props.id}
          className={ location.pathname.includes("fullVacancy") ?style.conteiner_cursor:style.conteiner}
        >
          <div className={style.block_description}>
            <div className={isFullVacancy}>{props.profession}</div>
            <div
              className={
                location.pathname.includes("fullVacancy")
                  ? style.block_description_shortInfoFull
                  : style.block_description_shortInfo
              }
            >
              <div className={style.shortInfo_sallary}>
                з/п от {props.payment_from}-{props.payment_to} {props.currency}
              </div>


              <img className={style.shortInfo_point} src={point} alt="" />
              <div className={style.shortInfo_schedule}>
              <div className="">

                {props.type_of_work?.title }
              </div>
              </div>
            </div>
            <div className={style.block_description_place}>
              <img src={place} className={style.place_ikon} alt="" />
              <div className={style.place_city}>{props.town?.title }</div>
            </div>
          </div>
        </NavLink>
        <div className={style.block_favoriteIcon_absolut} data-elem={`vacancy-${props.id}-shortlist-button`} onClick={changeFavorite}>
          {props.location?
          <img
            src={fullstar }
            alt="fullstar"
          />:  <img
          src={isFavorite ? fullstar : emptyStar}
          
          alt="star"
        />}
        
         
        </div>
      </div>
    </>
  );
};

export default Vacancy;
