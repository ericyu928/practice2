import ContactClass from "../ContactClass.json";

const initialState = {
    contacttypelist: ContactClass,
    editContactType: [],
    classAddMode: false
}

const ContactTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "openClassEdit":
            return {
                ...state,
                contacttypelist: state.contacttypelist,
                editContactType: action.editContactType,
                classAddMode: action.classAddMode
            }
        case "saveContactTypeList":
            return {
                ...state,
                contacttypelist: action.contacttypelist,
                editContactType: state.editContactType,
                classAddMode: false
            }
        default:
            return state
    }
}
export default ContactTypeReducer;