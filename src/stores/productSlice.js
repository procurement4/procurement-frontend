import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    data: [
        {
          id: 1,
          name: 'Book',
          category: 'Office',
          stock : 5,
          price: '450',
        },
        {
          id: 2,
          name: 'Pencil',
          category: 'Office',
          stock : 24,
          price: '150',
        },
        {
          id: 3,
          name: 'Eraser',
          category: 'Office',
          stock : 22,
          price: '100',
        },
        {
          id: 4,
          name: 'Bread',
          category: 'Logistic',
          stock : 100,
          price: '2500',
        },
        {
          id: 5,
          name: 'Bottle Water',
          category: 'Logistic',
          stock : 110,
          price: '2000',
        }
        ],
    category: []
}

// user: null,
// state.user = action.payload.user;
// state.user = null;
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        productCategory: (state, payload) => {
            let { data } = state;
            state.category =  data.filter((item) => item.category !== payload.payload);
        },
    }
});

export const { productCategory } = productSlice.actions;

export default productSlice.reducer;
