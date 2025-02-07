import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../utils/userSlice';
import { productReducer } from '../utils/productSlice';
import { orderReducer } from '../utils/orderSlice';

const rootReducer = combineReducers({
    user: userReducer,
    userproduct: productReducer,
    userorder: orderReducer,

});

export default rootReducer;
