import React from "react";
import { useSelector } from "react-redux";
import Empty from "../../components/empty/Empty";
import {useLocation} from 'react-router-dom'
import Vacancy from "../../components/vacancy/Vacancy";

import style from "./Favorite.module.scss";

const Favorite = () => {
  const location = useLocation();
  console.log(location.pathname.includes('favotite'))
  const favoriteVacancies = useSelector(
    (state) => state.favoriteVacancySlice.favoriteVacancies
  );
 
  React.useEffect(()=>{},[favoriteVacancies])

  return (
    <>
    {favoriteVacancies.length > 0 ?( 

        <div className={style.block}>
          {favoriteVacancies.map((item) => (
            <Vacancy {...item} location={location}/>
          ))}
        </div>
      ):<Empty/>
    }
    </>
  );
};

export default Favorite;
