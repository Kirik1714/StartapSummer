import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vacancies: [],
  currentPage: 1,
  status:'',
  

};

export const fetchVacancies = createAsyncThunk(
  "users/fetchVacancies",
  async (params) => {
    const {currentPage, searchValue,payment_from,payment_to,chosenCatalog} =params
    const strSearch = searchValue === "" ? "keyword=": `keyword=${searchValue}`;
    const strPayFrom = payment_from === "" ? "payment_from=": `payment_from=${payment_from}`;
    const strPayTo = payment_to === "" ? "payment_to=": `payment_to=${payment_to}`;
    const strChosenCat = chosenCatalog === "" ? "catalogues=": `catalogues=${chosenCatalog}`;
    
 
    


    // console.log([chosenCatalog]);
   
    const { data } = await axios.get(
      `https://startup-summer-proxy-production.up.railway.app/2.0/vacancies/?${strSearch}&${strPayFrom}&${strPayTo}&${strChosenCat}&page=${currentPage}&count=4`,
      {
        headers: {
          "x-secret-key": "GEU4nvd3rej*jeh.eqp",
          "X-Api-App-Id":
            "v3.r.137523968.eb365129c4d1e5393ee5d0e76de03b4027313d06.ace6ffecb1df5589cb2fba2ff52e40bca27c2fc7",
        },
      }
    );
    return data.objects;
  }
);

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    setVacancies(state, action) {
      state.vacancies = action.payload;
      
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      
    },
    setFavoriteVacancyM(state, action) {

      state.vacancies.map((item) => {
        if (item.id === action.payload) {
       
          item.is_storage = true;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        console.log("Идет отправка");
        state.status='loading'
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.vacancies = action.payload;
        state.status='success'
      })
      .addCase(fetchVacancies.rejected, (state) => {
        console.log("Была ошибка получение вакансий");
        state.status='error'
      });
  },
});

export const { setFavoriteVacancyM, setVacancies, setCurrentPage } =
  vacancySlice.actions;
export default vacancySlice.reducer;
