import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState={
    vacancy:{},
    statusFull:'',
}
export const fetchVacancy = createAsyncThunk('users/fetchVacancy',async(id)=>{
    const { data } = await axios.get(
        `https://startup-summer-proxy-production.up.railway.app/2.0/vacancies/${id}`,{
          headers:{
            "x-secret-key":"GEU4nvd3rej*jeh.eqp",
            "X-Api-App-Id":"v3.r.137523968.eb365129c4d1e5393ee5d0e76de03b4027313d06.ace6ffecb1df5589cb2fba2ff52e40bca27c2fc7",
          }
        }
      );
    
      return data
})

export const fyllVacancySlice = createSlice({
    name:'fullVacancy',
    initialState,
    reducers:{
     
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchVacancy.pending,(state)=>{
            console.log("Идет отправка")
            state.statusFull = 'loading'

        })
        .addCase(fetchVacancy.fulfilled,(state,action)=>{
            state.vacancy = action.payload
            state.statusFull = 'success'
            console.log("Все ок")
            
        })
        .addCase(fetchVacancy.rejected,(state)=>{
            console.log("Была ошибка получение вакансий");
            state.statusFull = 'error'
            
        })
    }
})


export default  fyllVacancySlice.reducer;