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
    category: [],
    procurement: []
}

// user: null,
// state.user = action.payload.user;
// state.user = null;
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        addProduct: (state, payload) => {
        if (payload.payload.length === undefined) {
          state.data = [...state.data, payload.payload];
        } else {
          state.data = [...state.data, ...payload.payload];
        }
        // console.log("payload", data)
        },
        productCategory: (state, payload) => {
            let { data } = state;
            state.category =  data.filter((item) => item.category !== payload.payload);
        },
        addProcurementProducts: (state, payload) => {
        if (payload.payload.length === undefined) {
          state.procurement = [...state.procurement, payload.payload];
        } else {
          state.procurement = [...state.procurement, ...payload.payload];
        }
        // console.log("payload", data)
        },
        updateProcurement: (state, payload) => {
          state.procurement = state.procurement
            .map((product) => {
              if (product.id === payload.payload.id && payload.payload.price !== undefined) {
                return {
                  ...product,
                  price: payload.payload.price,
                };
              } else if (product.id === payload.payload.id && payload.payload.quantity !== undefined){
                return {
                  ...product,
                  quantity: payload.payload.quantity,
                };
              } else if (product.id === payload.payload.id && payload.payload.priority !== undefined){
                return {
                  ...product,
                  priority: payload.payload.priority,
                };
              } else if (product.id === payload.payload.id && payload.payload.notes !== undefined){
                return {
                  ...product,
                  notes: payload.payload.notes,
                };
              }
              return product;
            })
            console.log("payload", payload)
            console.log("id : ", payload.payload.id)
            console.log("price : ", payload.payload.price)
            console.log("quantity : ", payload.payload.quantity)
        },
        deleteProcurementProduct: (state, payload) => {
          let { procurement } = state;
          state.procurement =  procurement.filter((item) => item.id !== payload.payload);
        },
      }
});

export const {addProduct, productCategory, addProcurementProducts, updateProcurement, deleteProcurementProduct } = productSlice.actions;

export default productSlice.reducer;
