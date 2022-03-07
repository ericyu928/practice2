import ContactData from "../ContactData.json";

const initialState = {
    contactData: ContactData,
    editContactData: [],
    contactAddMode: false,
}

const ContactListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "editContactData":
            return {
                contactData: state.contactData,
                editContactData: action.editContactData,
                contactAddMode: action.contactAddMode,
            }
        case "saveContactData":
            if (action.contactAddMode) {
                return {
                    contactData: [...state.contactData, action.editContactData],
                    editContactData: [],
                    contactAddMode: state.contactAddMode,
                }
            }
            else {
                for (let i = 0; i < state.contactData.length; i++) {
                    if (action.editContactData.ContactId === state.contactData[i].ContactId) {
                        const newItems = [...state.contactData];
                        newItems[i] = action.editContactData;
                        return {
                            contactData: newItems,
                            editContactData: [],
                            contactAddMode: state.contactAddMode,
                        };
                    }
                }
                break;
            }
        case "delContactList":
            for (let i = 0; i < state.contactData.length; i++) {
                if (action.contactId === state.contactData[i].ContactId) {
                    const newItems = [...state.contactData];
                    newItems.splice(i, 1);
                    return {
                        contactData: newItems,
                        editContactData: state.editContactData,
                        contactAddMode: state.contactAddMode,
                    };
                }
            }
            break;
        default:
            return state
    }
}

export default ContactListReducer;