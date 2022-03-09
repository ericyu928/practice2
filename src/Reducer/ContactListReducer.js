import ContactData from "../ContactData.json";
import ContactClass from "../ContactClass.json";

let c = ContactData;
for (let x = 0; x < ContactData.length; x++) {
    for (let i = 0; i < ContactClass.length; i++) {
        if (ContactData[x].ClassId === ContactClass[i].ClassId) {
            c[x]["Classname"] = ContactClass[i].Name
            break;
        }
    }
}
const initialState = {
    contactData: c,
    editContactData: [],
    contactAddMode: false,
}

const ContactListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "editContactData":
            return {
                ...state,
                contactData: state.contactData,
                editContactData: action.editContactData,
                contactAddMode: action.contactAddMode,
            }
        case "saveContactData":
            return {
                ...state,
                contactData: action.contactData,
                editContactData: [],
                contactAddMode: false
            }
        default:
            return state
    }
}

export default ContactListReducer;