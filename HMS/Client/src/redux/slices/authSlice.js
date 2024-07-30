import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

//login thunk
export const loginAction = createAsyncThunk("login",async({email,password})=>{
    console.log(email,password);
    const data = await fetch("http://localhost:8000/auth/login",{
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
    const data = await fetch("http://localhost:8000/auth/signup",{
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
    const data = await fetch("http://localhost:8000/auth/password",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        body: JSON.stringify({currentPassword,newPassword}),
    })
    return data.json();
})
export const updateDetailsAction = createAsyncThunk("updatedetails",async({name,phone,about, street,city,state,zip,token})=>{
    console.log(currentPassword,newPassword,token)
    const data = await fetch("http://localhost:8000/auth/profile",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        body: JSON.stringify({name,phone,about, street,city,state,zip}),
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
    
    extraReducers: (builder)=>{
        builder.addCase(loginAction.pending,(state,action)=>{
            state.authloading = true;
            state.autherror = null;
            state.loginsuccess = false;
        }) 
        builder.addCase(loginAction.fulfilled,(state,action)=>{
            state.authloading = false;
            if(action.payload.success){
                state.user = {
                    token : action.payload.token,
                }
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
        
        builder.addCase(updateDetailsAction.fulfilled,(state,action)=>{
            state.authloading = false;
            if(action.payload.success == false){
                state.autherror = action.payload.message
            }
            else{
                state.autherror = "Details updated";
            }
        })
       
    }
})
export default authSlice.reducer;