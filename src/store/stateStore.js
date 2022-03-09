import { createStore, combineReducers } from 'redux'

import ContactListReducer from '../Reducer/ContactListReducer'
import ContactTypeReducer from '../Reducer/ContactTypeReducer';


const stateStoreReducer = combineReducers({
   Data: ContactListReducer,
   List: ContactTypeReducer
});

const stateStore = createStore(stateStoreReducer);


export default stateStore;
