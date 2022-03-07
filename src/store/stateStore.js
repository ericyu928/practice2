import { createStore, combineReducers } from 'redux'

import ContactListReducer from '../Reducer/ContactListReducer'
import ContactTypeReducer from '../Reducer/ContactTypeReducer';


const stateStoreReducer = combineReducers({
    ContactListReducer,
    ContactTypeReducer
});

const stateStore = createStore(stateStoreReducer);


export default stateStore;



//無reducer

// import { createStore } from 'redux'

// import ContactClass from "../ContactClass.json";
// import ContactData from "../ContactData.json";

// const contactState = {
//     contacttypelist: ContactClass,
//     contactData: ContactData,
//     editContactData: [],
//     editContactType: [],
//     contactAddMode: false,
//     classAddMode: false
// }

// const stateStoreReducer = (state = contactState, action) => {
//     switch (action.type) {
//         case "deleteContactTypeList":
//             for (let i = 0; i < state.contacttypelist.length; i++) {
//                 if (action.classId === state.contacttypelist[i].ClassId) {
//                     const newItems = [...state.contacttypelist];
//                     newItems.splice(i, 1);
//                     return {
//                         contacttypelist: newItems,
//                         contactData: state.contactData,
//                         editContactData: state.editContactData,
//                         editContactType: state.editContactType,
//                         contactAddMode: state.contactAddMode,
//                         classAddMode: state.classAddMode
//                     };
//                 }
//             }
//             break;

//         case "delContactList":
//             for (let i = 0; i < state.contactData.length; i++) {
//                 if (action.contactId === state.contactData[i].ContactId) {
//                     const newItems = [...state.contactData];
//                     newItems.splice(i, 1);
//                     return {
//                         contactData: newItems,
//                         contacttypelist: state.contacttypelist,
//                         editContactData: state.editContactData,
//                         editContactType: state.editContactType,
//                         contactAddMode: state.contactAddMode,
//                         classAddMode: state.classAddMode
//                     };
//                 }
//             }
//             break;
//         case "openAddList":
//             return {
//                 contactData: state.contactData,
//                 contacttypelist: state.contacttypelist,
//                 editContactData: {
//                     ContactId: Math.random().toString(),
//                     ClassId: state.contacttypelist[0].ClassId,
//                     Name: '',
//                     Sex: '男',
//                     Phone: '',
//                     Address: '',
//                     Email: ''
//                 },
//                 editContactType: state.editContactType,
//                 contactAddMode: action.contactAddMode,
//                 classAddMode: state.classAddMode
//             }
//         case "editContactData":
//             return {
//                 contactData: state.contactData,
//                 contacttypelist: state.contacttypelist,
//                 editContactData: action.editContactData,
//                 editContactType: state.editContactType,
//                 contactAddMode: action.contactAddMode,
//                 classAddMode: state.classAddMode
//             }
//         case "saveContactData":
//             if (action.contactAddMode) {
//                 return {
//                     contacttypelist: state.contacttypelist,
//                     contactData: [...state.contactData, action.editContactData],
//                     editContactData: [],
//                     editContactType: state.editContactType,
//                     contactAddMode: state.contactAddMode,
//                     classAddMode: state.classAddMode
//                 }
//             }
//             else {
//                 for (let i = 0; i < state.contactData.length; i++) {
//                     if (action.editContactData.ContactId === state.contactData[i].ContactId) {
//                         const newItems = [...state.contactData];
//                         newItems[i] = action.editContactData;
//                         return {
//                             contactData: newItems,
//                             contacttypelist: state.contacttypelist,
//                             editContactData: [],
//                             editContactType: state.editContactType,
//                             contactAddMode: state.contactAddMode,
//                             classAddMode: state.classAddMode
//                         };
//                     }
//                 }
//                 break;
//             }
//         case "openClassAdd":
//             return {
//                 contactData: state.contactData,
//                 contacttypelist: state.contacttypelist,
//                 editContactData: state.editContactData,
//                 editContactType: action.editContactType,
//                 contactAddMode: state.contactAddMode,
//                 classAddMode: action.classAddMode
//             }
//         case "openClassEdit":
//             return {
//                 contactData: state.contactData,
//                 contacttypelist: state.contacttypelist,
//                 editContactData: state.editContactData,
//                 editContactType: action.editContactType,
//                 contactAddMode: state.contactAddMode,
//                 classAddMode: action.classAddMode
//             }
//         case "saveContactType":
//             if (state.classAddMode) {
//                 return {
//                     contacttypelist: [...state.contacttypelist, action.newClass],
//                     contactData: state.contactData,
//                     editContactData: state.editContactData,
//                     editContactType: state.editContactType,
//                     contactAddMode: state.contactAddMode,
//                     classAddMode: state.classAddMode
//                 }
//             }
//             else {
//                 for (let i = 0; i < state.contacttypelist.length; i++) {
//                     if (action.newClass.ClassId === state.contacttypelist[i].ClassId) {
//                         const newItems = [...state.contacttypelist];
//                         newItems[i].Name = action.newClass.Name;
//                         return {
//                             contacttypelist: newItems,
//                             contactData: state.contactData,
//                             editContactData: state.editContactData,
//                             editContactType: state.editContactType,
//                             contactAddMode: state.contactAddMode,
//                             classAddMode: state.classAddMode
//                         };
//                     }
//                 }
//                 break;
//             }
//         default:
//             return state
//     }


// }

// const stateStore = createStore(stateStoreReducer);

// export default stateStore;

