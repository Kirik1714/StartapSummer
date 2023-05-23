import React from "react";

import { useEffect,useState } from "react";
import Filter from "../../components/filter/Filter.jsx";
import Search from "../../components/search/Search";
import Vacancy from "../../components/vacancy/Vacancy";
import filter from "../../assets/filter.svg"
import { useDispatch, useSelector } from "react-redux";

import style from "./Main.module.scss";
import {
  fetchVacancies,
  setCurrentPage,
} from "../../redux/Slices/vacancySlice.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { Loader } from "../../components/Loader/loader.jsx";
import { useRef } from "react";

const Main = () => {
  const vacancies = useSelector((state) => state.vacancySlice.vacancies);
  const currentPage = useSelector((state) => state.vacancySlice.currentPage);
  const searchValue = useSelector((state) => state.searchSlice.searchValue);
  const status = useSelector((state) => state.vacancySlice.status);
  const payment_from = useSelector (state =>state.catalogiesSlice.payment_from)
  const payment_to = useSelector (state =>state.catalogiesSlice.payment_to)
  const chosenCatalog = useSelector (state =>state.catalogiesSlice.chosenCatalog)
  const favoriteVacancies = useSelector(
    (state) => state.favoriteVacancySlice.favoriteVacancies
  );
  const [width,setWidth] =React.useState(window.innerWidth);

  const [isOpenFilter,setIsOpenFilter] =useState(false);

  const filterRef = useRef(null);
 

  const dispatch = useDispatch();

  let sortArr=[];
  
  for(let item of favoriteVacancies){
    sortArr.push(item.id)

  }
 
  const getVacancy = async () => {
     dispatch(fetchVacancies({ currentPage, searchValue,payment_from,payment_to,chosenCatalog}));
  };

  useEffect(() => {
    const handleClickOutsite = (event) => {
   
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpenFilter(false);
      }
    };
    document.body.addEventListener("click", handleClickOutsite);
    return () => {
      document.body.removeEventListener("click", handleClickOutsite);
    
    };
  }, []);

  useEffect(() => {
    try {
      getVacancy();
    } catch (error) {
      alert(error, "Не получил вакансии");
    }
     // ForWidth
     const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPage, searchValue,payment_from,payment_to,chosenCatalog]);

  
  return (
    <div className={style.conteiner}>
      { width<=930? 
      <div ref={filterRef} onClick={()=>setIsOpenFilter(!isOpenFilter)}>
        <img src={filter}   className={style.litFilter} alt='filter'/>
        {isOpenFilter &&  <div className={style.absoluteFilter}><Filter/></div> }
        </div>:<div className={style.conteiner_filter}>
        <Filter />
      </div>
      }
      <div className={style.conteiner_main}>
        {width<469 && <div className={style.mainFilter} 
        ref={filterRef} onClick={()=>setIsOpenFilter(!isOpenFilter)}>
          Фильтры
             
          </div>}
        <div className={style.conteiner_main_search}>
          <Search />
        </div>
        {status == "loading" ? (
          <Loader />
        ) : (
         <>
          {  vacancies.length>0?
            <>
            <div className={style.conteiner_main_vacancy}>
              {vacancies.map((item) => (
                <Vacancy {...item} key={item.id} sortArr={sortArr} />
              ))}
            </div>
            <div className={style.conteiner_main_paginate}>
              <Pagination
                currentPage={currentPage}
                onChangePage={(number) => dispatch(setCurrentPage(number))}
              />
            </div>
          </>
      
        :<img src={foto} alt="logo" />}
        </>
        )}
      </div>
    </div>
  );
};

export default Main;
