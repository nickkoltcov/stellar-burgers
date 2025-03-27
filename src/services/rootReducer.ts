import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/IngredientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';
import { userReducer } from './slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer
});
