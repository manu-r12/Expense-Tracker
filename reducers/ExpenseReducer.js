import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATES = {
    time: 0,
    amount: 0,
    dailyLimit: 0,

}
export const ExpenseReducerSlice = createSlice({
    name: 'expense',
    initialState: INITIAL_STATES,
    reducers:{
        setTIme(state, action){
            state.time = action.payload
        },
        setAmount(state, action){
                state.amount = action.payload
        },
        setLimit(state, action){
                state.dailyLimit = action.payload
        },
    }

})

export const expenseReducer = ExpenseReducerSlice.reducer
export const {setTIme , setAmount, setLimit} = ExpenseReducerSlice.actions