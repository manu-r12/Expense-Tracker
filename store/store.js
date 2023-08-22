
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import { rootReducer } from "./rootReducer";
//reducer
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
  );
  
export const store = configureStore({
    reducer : rootReducer,
    middleware: middleWares
})
