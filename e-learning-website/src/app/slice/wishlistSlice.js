import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coursewishlist: [], // Do not access localStorage here
};

const isBrowser = typeof window !== "undefined";

export const wishlistSlice=createSlice({
    name:'coursewishlist',
    initialState,
    reducers:{
        addtowishlist:(state,action)=>{
            const wish=action.payload;
            state.coursewishlist.push(wish);
            if(isBrowser){
                localStorage.setItem('coursewishlist',JSON.stringify(state.coursewishlist))
            }
        },
        removefromwishlist:(state,action)=>{
            const id=action.payload;
            state.coursewishlist=state.coursewishlist.filter((items)=>items.id !=id);
             if(isBrowser){
                localStorage.setItem('coursewishlist',JSON.stringify(state.coursewishlist))
            }
        },
           loadwishlistfromstorage: (state) => {
      if (isBrowser) {
        const data = localStorage.getItem("coursewishlist");
        state.coursewishlist = data ? JSON.parse(data) : [];
      }
    },
    }
})


export const {addtowishlist,loadwishlistfromstorage,removefromwishlist}=wishlistSlice.actions;

export default wishlistSlice.reducer;