import { createSlice } from "@reduxjs/toolkit";

const getIntialCart=()=>{
    if(typeof window !=="undefined"){
      const stored=localStorage.getItem('COURSE_CART');
      return stored ? JSON.parse(stored) : [];
    }
    return []
}

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:{
        cart:getIntialCart()
    },
    reducers:{
        addtoCart:(state,action)=>{
            const obj=action.payload;
            state.cart.push(obj);
            if(typeof window !=="undefined"){
                localStorage.setItem("COURSE_CART",JSON.stringify(state.cart))
            }
        },
        deleteCart:(state,action)=>{
            const id=action.payload;
            state.cart=state.cart.filter(item=>item.id!==id)
            if(typeof window !=="undefined"){
                localStorage.setItem("COURSE_CART",JSON.stringify(state.cart))
            }
        },
        updateQuantity:(state,action)=>{
            const {id,qty}=action.payload;
            state.cart=state.cart.map(item=>
                item.id===id ? {...item,qty}: item
            )
            if(typeof window !=="undefined"){
                localStorage.setItem("COURSE_CART",JSON.stringify(state.cart))
            }
        },
        clearCart:(state)=>{
            state.cart=[];
            if(typeof window !=="undefined"){
                localStorage.removeItem("COURSE_CART")
            }
        }

    }
})

export const {addtoCart,deleteCart,updateQuantity,clearCart}=cartSlice.actions;

export default cartSlice.reducer;