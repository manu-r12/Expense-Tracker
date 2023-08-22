import { createSelector } from "@reduxjs/toolkit";

export const selectAddNewExpenseReducer = (state) => state.setNewExpense


export const getTime = createSelector([selectAddNewExpenseReducer],
    (AddNewExpense) => AddNewExpense.date)


export const getAmount = createSelector([selectAddNewExpenseReducer],
        (AddNewExpense) => AddNewExpense.amountSpent)


export const getLimit = createSelector([selectAddNewExpenseReducer],
        (AddNewExpense) => AddNewExpense.amountSaved)