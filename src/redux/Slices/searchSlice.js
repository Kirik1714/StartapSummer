import { createSlice } from '@reduxjs/toolkit'

const initialState={
    searchValue:'',
}


export const searchSlice = createSlice({
    name:'vacancy',
    initialState,
    reducers:{
        setSearchValue(state,action){
            state.searchValue = action.payload
         
        }
    },
   
})

export  const {setSearchValue} =searchSlice.actions;
export default  searchSlice.reducer;