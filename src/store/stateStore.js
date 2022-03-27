import { createStore, combineReducers } from 'redux'

import ContactReducer from '../Reducer/ContactReducer'
import ContactClassReducer from '../Reducer/ContactClassReducer';
import LayoutReducer from '../Reducer/LayoutReducer';

const stateStoreReducer = combineReducers({
   Data: ContactReducer,
   Class: ContactClassReducer,
   Layout: LayoutReducer
});

const stateStore = createStore(stateStoreReducer);


export default stateStore;
