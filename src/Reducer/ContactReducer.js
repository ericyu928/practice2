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
    contactData: c
}

const ContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setContactData":
            return {
                ...state,
                contactData: action.data
            }
        default:
            return state
    }
}

export default ContactReducer;