const initialState = {
    contactData:null
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