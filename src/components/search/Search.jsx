import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./Search.module.scss";
import search from "../../assets/search.svg";
import { setSearchValue } from "../../redux/Slices/searchSlice";

const Search = () => {
  const searchValue = useSelector((state) => state.searchSlice.searchValue);
  const dispatch = useDispatch();
  const [localsearch, setLocalSearch] = useState("");

  const changeLocalSearch = (event) => {
    setLocalSearch(event.target.value);
  };

  return (
    <div className={style.block} data-elem="search-input">
      <img src={search} alt="" className={style.block_fotoSearch} />
      <div
        onClick={() => dispatch(setSearchValue(localsearch))}
        className={style.block_button}
        data-elem="search-button"
      >
        Поиск
      </div>
      <input
        type="text"
        value={localsearch}
        onChange={changeLocalSearch}
        className={style.block_search}
        placeholder="Введите название вакансии"
      />
    </div>
  );
};

export default Search;
