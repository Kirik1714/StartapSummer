import React, { useEffect, useState } from "react";
import style from "./Filter.module.scss";

import popup from "../../assets/popup.svg";
import reset from "../../assets/reset.svg";

import PopupCatalogies from "../popupCatalogies/PopupCatalogies"; 
import {
  changeCatalogPaymentFrom,
  changeCatalogPaymentTo,
  changeCatalogTitle,
  changeChooseCatalog,
  fetchCatalogies,
  resetData
} from "../../redux/Slices/catalogiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const Filter = () => {

  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [localCatalog, setLocalCatalog] = useState();
  const [localPayFrom, setLocalPayFrom] = useState(null);
  const [localPayTo, setLocalPayTo] = useState(null);

  const categoryRef = useRef(null);
  const chosenCatalog = useSelector(
    (state) => state.catalogiesSlice.chosenCatalog
  );
  const title = useSelector((state)=>state.catalogiesSlice.catalogTitle);



  const dispatch = useDispatch();

  const getCatalogies = async () => {
    dispatch(fetchCatalogies());
  };

  useEffect(() => {
    const handleClickOutsite = (event) => {
   
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsOpenPopUp(false);
      }
    };
    document.body.addEventListener("click", handleClickOutsite);
    return () => {
      document.body.removeEventListener("click", handleClickOutsite);
    
    };
  }, []);

  useEffect(() => {
    try {
      getCatalogies();
    } catch (error) {
      alert(error);
    }
  }, []);
  const changeOpenPopUp = () => {
   
    setIsOpenPopUp(!isOpenPopUp);
  };
  const changeChosenLocalCatalog = (item) => {
    dispatch(changeCatalogTitle(item.title))
    setLocalCatalog(item);
    setIsOpenPopUp(false);
  };

  const changeDataInRedux = () => {
    dispatch(changeChooseCatalog(localCatalog));
    dispatch(changeCatalogPaymentFrom(localPayFrom));
    dispatch(changeCatalogPaymentTo(localPayTo));
  };
  const resetInfo=()=>{
    dispatch(resetData());
    setLocalPayFrom(0);
    setLocalPayTo(0);
  }
  return (
    <>
      <div className={style.block} onClick={(event)=>event.stopPropagation()}>
        <div className={style.block_title}>
          <div className={style.block_title_filter}>Фильтры</div>
          <div className={style.block_title_reset} onClick={()=>resetInfo()}>
            <div className={style.block_title_reset_title}>Сбросить все</div>
            <img
              className={style.block_title_reset_foto}
              src={reset}
              alt="close"
            />
           
          </div>
        </div>
        <div className={style.block_area}>
          <div className={style.block_area_title}> Отрасль</div>
          <div className={style.block_content} ref={categoryRef}>
            <div className={style.block_area_popup}  onClick={changeOpenPopUp}>
              {title ?<div className={style.activeCatgory}>{title}</div>  :"Выберите категорию"}
              <img
                className={
                  isOpenPopUp ? style.popup_foto_reverse : style.popup_foto
                }
                src={popup}
               
                alt=""
              />
            </div>
         
          </div>
          {isOpenPopUp && (
            <div data-elem="industry-select">
            <PopupCatalogies
              changeChosenLocalCatalog={changeChosenLocalCatalog}
              chosenCatalog={chosenCatalog}
            />
            </div>
          )}
        </div>
        <div className={style.block_range_sallary}>
          <div className={style.block_range_sallary_title}>Оклад</div>
          <input
            data-elem="salary-from-input"
            type="number"
            min={0}
            value={localPayFrom}
            onChange={(event) => setLocalPayFrom(event.target.value)}
            step={500}
            placeholder="От"
            className={style.input}
            
          />
          <input
          data-elem="salary-to-input"
            type="number"
            min={0}
            value={localPayTo}
            onChange={(event) => setLocalPayTo(event.target.value)}
            step={500}
            placeholder="До"
            className={style.input}
          />
        </div>

        <div className={style.block_submit}>
          <input
          data-elem="search-button"
            type="submit"
            value="Подтвердить"
            onClick={changeDataInRedux}
            className={style.button}
          />
        </div>
      </div>
    </>
  );
};

export default Filter;
