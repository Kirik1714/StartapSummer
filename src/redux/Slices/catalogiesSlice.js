import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';


const initialState={
    catalogies:[],
    statusCatalogies:'',
    chosenCatalog:null,
    catalogTitle:'',
    payment_from:0,
    payment_to:0,
}
export const fetchCatalogies = createAsyncThunk('users/fetchCatalogies',async()=>{
    const { data } = await axios.get(
        `https://startup-summer-proxy-production.up.railway.app/2.0/catalogues/`,{
          headers:{
            "x-secret-key":"GEU4nvd3rej*jeh.eqp",
            "X-Api-App-Id":"v3.r.137523968.eb365129c4d1e5393ee5d0e76de03b4027313d06.ace6ffecb1df5589cb2fba2ff52e40bca27c2fc7",
          }
        }
      );
      
      return data
})

export const catalogiesSlice = createSlice({
    name:'catalogies',
    initialState,
    reducers:{
        changeChooseCatalog(state,action){
            // console.log(action)
            state.chosenCatalog=action.payload?.key;
        },
        changeCatalogTitle(state,action){
            state.catalogTitle = action.payload
        },
        changeCatalogPaymentFrom(state,action){
            state.payment_from = action.payload
        },
        changeCatalogPaymentTo(state,action){
            state.payment_to = action.payload
        },
        resetData(state,action)
        {
            state.chosenCatalog=null;
            state.catalogTitle='';
            state.payment_from=0;
            state.payment_to=0;

        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCatalogies.pending,(state)=>{
            console.log("Идет отправка")
            //state.statusFull = 'loading'

        })
        .addCase(fetchCatalogies.fulfilled,(state,action)=>{
            state.catalogies = action.payload
            console.log("Все ок")
            
        })
        .addCase(fetchCatalogies.rejected,(state)=>{
            console.log("Была ошибка получение вакансий");
            //state.statusFull = 'error'
            
        })
    }
})
export const {changeChooseCatalog,changeCatalogTitle,changeCatalogPaymentFrom,changeCatalogPaymentTo,resetData} = catalogiesSlice.actions

export default  catalogiesSlice.reducer;