import ContactClass from "../ContactClass.json";

const initialState = {
    contactClass: ContactClass
}

const ContactClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setClassData":
            return {
                ...state,
                contactClass: action.data
            }
        default:
            return state
    }
}
export default ContactClassReducer;