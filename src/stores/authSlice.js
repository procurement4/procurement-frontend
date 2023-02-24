import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    mode: "dark",
    token: null,
    user: null,
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.token = null;
            state.user = null;
        },
<<<<<<< HEAD
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
    }
});

export const { setMode, setLogin, setLogout, setUser } = authSlice.actions;
=======
    }
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3

export default authSlice.reducer;
