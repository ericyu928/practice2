import { createStore } from 'redux'

import ContactClass from "../ContactClass.json";
import ContactData from "../ContactData.json";

const contactState = {
    contacttypelist: ContactClass,
    contactData: ContactData,
}

const stateStoreReducer = (state = contactState, action) => {
    if (action.type === "addContactList") {
        return {
            contacttypelist: [...state.contacttypelist, action.value],
            contactData: state.contactData
        }
    }
    else if (action.type === "editContactList") {
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
    else if (action.type === "deleteContactList") {
        for (let i = 0; i < state.contacttypelist.length; i++) {
            if (action.classId === state.contacttypelist[i].ClassId) {
                const newItems = [...this.state.contacttypelist];
                newItems.splice(i, 1);
                return {
                    contacttypelist: newItems,
                    contactData: state.contactData

                };
            }
        }
    }
}

const stateStore = createStore(stateStoreReducer);

export default stateStore;