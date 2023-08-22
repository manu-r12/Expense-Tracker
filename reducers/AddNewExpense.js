

import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATES = {
    date: 0,
    amountSpent: 0,
    amountSaved: 0,

}
export const AddNewExpense = createSlice({
    name: 'expense',
    initialState: INITIAL_STATES,
    reducers:{
        setDate(state, action){
            state.date = action.payload
        },
        setAmountSpent(state, action){
                state.amountSpent = action.payload
        },
        setAmountSaved(state, action){
                state.amountSaved = action.payload
        },
    }

})

export const addNewexpenseReducer = AddNewExpense.reducer
export const {setDate , setAmountSaved, setAmountSpent} = AddNewExpense.actions