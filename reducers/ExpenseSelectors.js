import { createSelector } from "@reduxjs/toolkit";

export const selectExpenseReducer = (state) => state.expense


export const getTime = createSelector([selectExpenseReducer],
    (ExpenseReducerSlice) => ExpenseReducerSlice.time)


export const getAmount = createSelector([selectExpenseReducer],
        (ExpenseReducerSlice) => ExpenseReducerSlice.amount)


export const getLimit = createSelector([selectExpenseReducer],
        (ExpenseReducerSlice) => ExpenseReducerSlice.dailyLimit)