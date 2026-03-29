import { configureStore } from "@reduxjs/toolkit";
import  loginSlice  from "../slice/loginSlice";

export let myStore=configureStore({
    reducer:{
        login:loginSlice
    }
})