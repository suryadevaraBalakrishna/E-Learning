import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from "../slice/cartSlice";
import wishlistSlice  from "../slice/wishlistSlice";
import loginSlice  from "../slice/loginSlice";


export let myStore=configureStore({
    reducer:{
        cartReducer:cartSlice,
        wishlist:wishlistSlice,
        login:loginSlice
    }
})