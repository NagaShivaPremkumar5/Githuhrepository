import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cart from "./Cart";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        veg: [
            { name: "Carrot", price: 25.5, brand: "mahesh co" },
            { name: "Potato", price: 28.0, brand: "mahesh co" },
            { name: "Kandhi Pappu", price: 28.0, brand: "mahesh co" },
            { name: "Sugar", price: 28.0, brand: "mahesh co" },
            { name: "Salt", price: 28.0, brand: "mahesh co" },
            { name: "Chilli Powder", price: 28.0, brand: "mahesh co" },
            
            { name: "Gongura", price: 50.5, brand: "GreenFarm" },
            { name: "Paala koora", price: 26.5, brand: "FreshFields" },
            { name: "Tomato",        price: 38.5, brand: "Nature's Choice" },
            { name: "Onion",         price: 25.2, brand: "mahesh co" },
            { name: "ladiesfinger",  price: 20.2, brand: "GreenFarm" },
            { name: "Badhusha",      price: 65.5, brand: "hari sweets" },
            { name: "Kalakandh",     price: 85.5, brand: "hari sweets" },
            { name: "Jilebi",        price: 45.5, brand: "hari sweets" },
            { name: "khaja",         price: 55.5, brand: "hari sweets" },
            { name: "Paper Roll",    price: 115.5, brand: "hari sweets" },
            { name: "Junnu",         price: 200.0, brand: "hari sweets" },
            { name: "MilkCake",      price: 250.5, brand: "hari sweets" },
            { name: "Milk",          price: 25.0, brand: "hari sweets" },
            { name: "Curd",          price: 20.0, brand: "hari sweets" },

        ],
        nonveg: [
            { name: 'Chicken', price: 315.0 , brand: "sneha co" },
            { name: 'Mutton', price: 800.0, brand: "sneha co" },
            { name: 'Beef', price: 450.5 , brand: "sneha co" },
            { name: 'Mutton Biriyani', price: 350.5 , brand: "Biriyani's" },
            { name: 'Fish Biriyani', price: 250.5, brand: "Biriyani's" },
            { name: 'Prawns Biriyani', price: 450.5 ,brand: "Biriyani's" },
            { name: 'Mogalai Biriyani', price: 250.5 , brand: "Biriyani's"},
            { name: 'Mandi', price: 650.5 , brand: "Mandhi's" },
            { name: 'Half-Mandi', price: 480.5 , brand: "Mandhi's" },
            { name: 'Full-Mandi', price: 900.5 , brand: "Mandhi's" },
            { name: 'Juicy-Mandi', price: 850.5 , brand: "Mandhi's" },
        ],
    },
    reducers: {} 
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.name !== action.payload.name);
        },
        clearCart: () => {
            return [];
        },
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                return state.filter(cartItem => cartItem.name !== action.payload.name); 
            }
        }
    }
});

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer
    }
});

export default store;
export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
