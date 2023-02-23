import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    data: [],
    category: [],
    procurement: [],
    newprocurement: []
}

// user: null,
// state.user = action.payload.user;
// state.user = null;
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        setProduct: (state, payload) => {
          state.data = payload.payload;
        console.log("payload", payload.payload)
        },
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
            state.category =  data.filter((item) => item.category === payload.payload);
            console.log("payload category : ", payload.payload)
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
          console.log("payload", payload)
          console.log("id : ", payload.payload.product_id)
          console.log("price : ", payload.payload.price)
          console.log("quantity : ", payload.payload.quantity)

          state.procurement = state.procurement
            .map((product) => {
              if (product.product_id == payload.payload.product_id && payload.payload.price !== undefined) {
                return {
                  ...product,
                  price: payload.payload.price,
                };
              } else if (product.product_id == payload.payload.product_id && payload.payload.quantity !== undefined){
                return {
                  ...product,
                  quantity: payload.payload.quantity,
                };
              } else if (product.product_id == payload.payload.product_id && payload.payload.priority !== undefined){
                return {
                  ...product,
                  priority: payload.payload.priority,
                };
              } else if (product.product_id == payload.payload.product_id && payload.payload.notes !== undefined){
                return {
                  ...product,
                  notes: payload.payload.notes,
                };
              }
              return product;
            })
           
        },
        deleteProcurementProduct: (state, payload) => {
          let { procurement } = state;
          state.procurement =  procurement.filter((item) => item.product_id !== payload.payload);
        },
        resetProcurement: (state, payload) => {
          state.procurement = [];
        },
        setNewProcurement: (state, payload) => {
          state.newprocurement = payload.payload;
        console.log("payload update procurement", payload.payload)
        },
        newProcurementUpdate: (state, payload) => {
          console.log("payload new procurement", payload)
          console.log("id new procurement: ", payload.payload.product_id)
          console.log("price new procurement: ", payload.payload.price)
          console.log("quantity new procurement: ", payload.payload.quantity)

          state.newprocurement = state.newprocurement
            .map((product) => {
              if (product.product_id == payload.payload.product_id && payload.payload.price !== undefined) {
                return {
                  ...product,
                  price: payload.payload.price,
                };
              } else if (product.product_id == payload.payload.product_id && payload.payload.quantity !== undefined){
                return {
                  ...product,
                  quantity: payload.payload.quantity,
                };
              } else if (product.product_id == payload.payload.product_id && payload.payload.priority !== undefined){
                return {
                  ...product,
                  priority: payload.payload.priority,
                };
              } else if (product.product_id == payload.payload.product_id && payload.payload.notes !== undefined){
                return {
                  ...product,
                  notes: payload.payload.notes,
                };
              }
              return product;
            })
        },
      }
});

export const {setProduct, addProduct, productCategory, addProcurementProducts, updateProcurement, deleteProcurementProduct, resetProcurement,newProcurementUpdate, setNewProcurement } = productSlice.actions;

export default productSlice.reducer;
