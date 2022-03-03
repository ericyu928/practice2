import { createStore } from 'redux'

import ContactClass from "../ContactClass.json";
import ContactData from "../ContactData.json";

const contactState = {
    contacttypelist: ContactClass,
    contactData: ContactData,
}

const stateStoreReducer = (state = contactState, action) => {
    if (action.type === "addContactTypeList") {
        return {
            contacttypelist: [...state.contacttypelist, action.newClass],
            contactData: state.contactData
        }
    }
    else if (action.type === "editContactTypeList") {
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
    }
    else if (action.type === "deleteContactTypeList") {
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
    }
    else if (action.type === "addContactList") {
        return {
            contacttypelist: state.contacttypelist,
            contactData: [...state.contactData, action.contact]
        }
    }
    else if (action.type === "editContactList") {
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
    }
    else if (action.type === "delContactList") {
        for (let i = 0; i < state.contactData.length; i++) {
            if (action.contactId === state.contactData[i].ContactId) {
                const newItems = [...state.contactData];
                newItems.splice(i, 1);
                return { contactData: newItems, contacttypelist: state.contacttypelist };
            }
        }
    }

    return state
}

const stateStore = createStore(stateStoreReducer);

export default stateStore;