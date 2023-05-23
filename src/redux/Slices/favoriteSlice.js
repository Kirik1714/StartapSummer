import { createSlice } from '@reduxjs/toolkit'



const initialState={
    favoriteVacancies:[],
    currentPage:1,
}


export const favoriteVacancySlice = createSlice({
    name:'vacancy',
    initialState,
    reducers:{
        setFavoriteVacanciesF(state,action){
           if(state.favoriteVacancies.find(item=> Number(item.id)===Number(action.payload.id))){
            state.favoriteVacancies= state.favoriteVacancies.filter(item => Number(item.id)!== Number(action.payload.id));
            }else{
               
                state.favoriteVacancies.push({...action.payload,is_storage:!(action.payload.is_storage)})
           }
        },
        setCurrentPage(state,action){
            state.currentPage = action.payload 
         
        }
    },
   
})

export  const {setFavoriteVacanciesF,setCurrentPage} =favoriteVacancySlice.actions;
export default  favoriteVacancySlice.reducer;