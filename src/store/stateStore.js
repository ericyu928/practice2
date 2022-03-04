import { createStore } from 'redux'

import ContactClass from "../ContactClass.json";
import ContactData from "../ContactData.json";

const contactState = {
    contacttypelist: ContactClass,
    contactData: ContactData,
}

const stateStoreReducer = (state = contactState, action) => {
    switch (action.type) {
        case "addContactTypeList":
            return {
                contacttypelist: [...state.contacttypelist, action.newClass],
                contactData: state.contactData
            };
        case "editContactTypeList":
            for (let i = 0; i < state.contacttypelist.length; i++) {
                if (action.newClass.ClassId === state.contacttypelist[i].ClassId) {
                    const newItems = [...state.contacttypelist];
                    newItems[i].Name = action.newClass.Name;
                    return {
                        contacttypelist: newItems,
                        contactData: state.contactData
                    };
                }
            }
            break;
        case "deleteContactTypeList":
            for (let i = 0; i < state.contacttypelist.length; i++) {
                if (action.classId === state.contacttypelist[i].ClassId) {
                    const newItems = [...state.contacttypelist];
                    newItems.splice(i, 1);
                    return {
                        contacttypelist: newItems,
                        contactData: state.contactData
    
                    };
                }
            }
            break;
        case "addContactList":
            return {
                contacttypelist: state.contacttypelist,
                contactData: [...state.contactData, action.contact]
            };
        case "editContactList":
            for (let i = 0; i < state.contactData.length; i++) {
                if (action.contact.ContactId === state.contactData[i].ContactId) {
                    const newItems = [...state.contactData];
                    newItems[i] = action.contact;
                    return {
                        contactData: newItems,
                        contacttypelist: state.contacttypelist,
                    };
                }
            }
            break;
        case "delContactList":
            for (let i = 0; i < state.contactData.length; i++) {
                if (action.contactId === state.contactData[i].ContactId) {
                    const newItems = [...state.contactData];
                    newItems.splice(i, 1);
                    return { contactData: newItems, contacttypelist: state.contacttypelist };
                }
            }
            break;
        default:
            return state
    }


}

const stateStore = createStore(stateStoreReducer);

export default stateStore;