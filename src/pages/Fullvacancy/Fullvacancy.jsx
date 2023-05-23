import React, { useEffect } from "react";
import style from "./Fullvacancy.module.scss";
import Vacancy from "../../components/vacancy/Vacancy";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVacancy } from "../../redux/Slices/fullVacancySlice";
import { Loader } from "../../components/Loader/loader";
import ReactHtmlParser from 'react-html-parser';

const Fullvacancy = () => {
  const { id } = useParams();
  const vacancy = useSelector((state) => state.fyllVacancySlice.vacancy);
  const statusFull = useSelector((state) => state.fyllVacancySlice.statusFull);
  const dispatch = useDispatch();
  const getVacancy = async () => { 
    dispatch(fetchVacancy(id));
  };
  useEffect(() => {
    try {
      getVacancy();
    } catch (error) {
      alert(error);
    }
  }, []);

  const favoriteVacancies = useSelector(
    (state) => state.favoriteVacancySlice.favoriteVacancies
  );
  let sortArr=[];
  
  for(let item of favoriteVacancies){
    sortArr.push(item.id)

  }
 
  return (
    <div className={style.block}>
      {statusFull === "loading" ? (
        <Loader />
      ) : (
        <>
          <div className={style.block_initial}>
            <Vacancy {...vacancy}  sortArr={sortArr}/>
          </div>
          
          <div className={style.block_description}>
            <div className={style.block_description_first}>
              <div className={style.description_title}>Обязанности:</div>
              <ul className={style.description_subtitle}>
                <li>{vacancy.firm_activity}
             
                </li>
              </ul>
            </div>
            <div className={style.block_description_second}>
              <div className={style.description_title}>Требования:</div>
              <ul className={style.description_subtitle}>
                <li className={style.subtitle_item}>
                   {ReactHtmlParser( vacancy.vacancyRichText)}
                </li>
              
              </ul>
            </div>
            <div className={style.block_description_third}>
              <div className={style.description_title}>Условия:</div>
              <ul className={style.description_subtitle}>
                <li className={style.subtitle_item}>Оформление по контракту</li>
                <li className={style.subtitle_item}>Полный социальный пакет</li>
                <li className={style.subtitle_item}>
                  Премирование по результатам работы
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Fullvacancy;
