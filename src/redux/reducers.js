import { combineReducers } from 'redux'
 import counter from './slices/counterSlice';
 import events from './slices/eventsSlice' ; 
 import wishlist from './slices/wishlistSlice' ;
const reducers = combineReducers({
  counter,
  events,
  wishlist,
})

export default reducers;

