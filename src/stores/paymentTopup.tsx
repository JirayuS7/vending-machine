import { createSlice } from "@reduxjs/toolkit";

export interface PaymentProps {
    total: number; // this is a boolean value that will be used to check if the payment is successfull
    topUp: number;
    phone: string;
    smtp: string;
}

const initialState: PaymentProps = {
    total: 0,
    topUp: 0,
    phone: "",
    smtp: "",
};

export const paymentTopUpSlice = createSlice({
    name: "paymentTopUp",
    initialState,
    reducers: {
        addPhoneNumber: (state, actions) => {
            state.phone = actions.payload;
        },
        addSmtp: (state, actions) => {
            state.smtp = actions.payload;
        },
        addTopUp: (state, actions) => {
            state.topUp = actions.payload;
        },
        addTotal: (state, actions) => { 
     
            state.total =   actions.payload;
        },

    },
});

// Action creators are generated for each case reducer function
export const { addPhoneNumber, addSmtp ,addTopUp  , addTotal} = paymentTopUpSlice.actions;

export default paymentTopUpSlice.reducer;
