import React from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./PopupCatalogies.module.scss";

const PopupCatalogies = ({ changeChosenLocalCatalog, chosenCatalog }) => {
  const catalogies = useSelector((state) => state.catalogiesSlice.catalogies);
  const dispatch = useDispatch();

  // {style.block_item} 
  return (
    <div className={style.block}>
      {catalogies.map((item) => (
        <div
          className={
            chosenCatalog?.title === item.title
              ? `${style.block_item} ${style.active}`
              : style.block_item
          }
          onClick={() => changeChosenLocalCatalog(item)}
         key={item.key}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default PopupCatalogies;
