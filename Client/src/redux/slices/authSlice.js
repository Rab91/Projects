import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../config";
//login thunk
export const loginAction = createAsyncThunk("login",async({email,password})=>{
    console.log(email,password);
    const data = await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {
            "Content-Type": "application/json",
          },
    })
    return data.json();
})
export const signupAction = createAsyncThunk("signup",async({firstname,lastname,email,password,gender})=>{
    console.log(firstname,lastname,email,password,gender);
    const data = await fetch(`${BASE_URL}/auth/signup`,{
        method: "POST",
        body: JSON.stringify({
            name:firstname +""+lastname,
            email,
            password,
            gender}),
        headers: {
            "Content-Type": "application/json",
          },
    })
    return data.json();
})
export const updatePasswordAction = createAsyncThunk("updatepassword",async({currentPassword,newPassword,token})=>{
    console.log(currentPassword,newPassword,token)
    const data = await fetch(`${BASE_URL}/auth/password`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        body: JSON.stringify({currentPassword,newPassword}),
    })
    return data.json();
})
export const updateDetailsAction = createAsyncThunk("updatedetails",async({phone,about, street,city,state,zip,token})=>{
    const data = await fetch(`${BASE_URL}/auth/profile`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        body: JSON.stringify({phone,about, street,city,state,zip}),
    })
    return data.json();
})

export const fetchDetails = createAsyncThunk("getuserdata",async({token})=>{
    const data = await fetch(`${BASE_URL}/auth/details`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
    })
    return data.json();
})


const authSlice = createSlice({
    name: "auth-slice",
    initialState: {
        user: null,
        authloading: false,
        autherror: null,
        loginsuccess: false,
        signupsuccess: false
    },
    reducers:{
        logout: (state,action)=>{
            state.user = null;
            state.authloading = false;
            state.autherror = false;
            state.loginsuccess = false;
            state.signupsuccess = false;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginAction.pending,(state,action)=>{
            state.authloading = true;
            state.autherror = null;
            state.loginsuccess = false;
        }) 
        builder.addCase(loginAction.fulfilled,(state,action)=>{
            state.authloading = false;
            if(action.payload.success){
                state.user = action.payload.user;
                state.loginsuccess = true;

            }else{
                state.autherror = action.payload.message;
            }
        })
        builder.addCase(signupAction.pending,(state,action)=>{
            state.authloading = true;
            state.autherror = null;
            state.signupsuccess = false;
        })
        builder.addCase(signupAction.fulfilled,(state,action)=>{
            state.authloading = false;
            if(action.payload.success == false){
                state.autherror = action.payload.message;
            }
            else{
                state.signupsuccess = true;
            }
        })
        builder.addCase(updatePasswordAction.pending,(state,action)=>{
            state.authloading = true;
            state.autherror = null;
            
        })
        builder.addCase(updateDetailsAction.pending,(state,action)=>{
            state.authloading = true;
            state.autherror = null;
        })
        builder.addCase(updateDetailsAction.fulfilled,(state,action)=>{
            state.authloading = false;
            if(action.payload.success == false){
                state.autherror = action.payload.message
            }
            else{
                state.autherror = "Details updated";
            }
        })
        builder.addCase(fetchDetails.fulfilled,(state,action)=>{
            state.user ={
                ...action(state.user),
                ...action.payload.user
            }
        })
       
    }
})
export default authSlice.reducer;
export const {logout}=authSlice.actions;