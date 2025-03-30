import { createSlice } from "@reduxjs/toolkit";

const initialState={
    LoggedIn:false,
    Supplier:false,
    Admin:false,
    User:null,
}

export const UserAuth = createSlice({
    name:"User",
    initialState,
    reducers:{
        logUser:(state,action)=>{
            state.LoggedIn = action.payload;
        },
        setUser:(state,action)=>{
            state.User=action.payload
            if (state.User){
                if (state.User.role==='supplier'){
                    state.Supplier=true
                }else if (state.User.role==='admin'){
                    state.Admin=true
                }
            }
        }
    }
})

export const { logUser,setUser } = UserAuth.actions;
export default UserAuth.reducer