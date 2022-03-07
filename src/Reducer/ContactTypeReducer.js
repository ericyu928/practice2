import ContactClass from "../ContactClass.json";

const initialState = {
    contacttypelist: ContactClass,
    editContactType: [],
    classAddMode: false
}

const ContactTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "openClassAdd":
            return {
                contacttypelist: state.contacttypelist,
                editContactType: action.editContactType,
                classAddMode: action.classAddMode
            }
        case "openClassEdit":
            return {
                contacttypelist: state.contacttypelist,
                editContactType: action.editContactType,
                classAddMode: action.classAddMode
            }
        case "saveContactType":
            if (state.classAddMode) {
                return {
                    contacttypelist: [...state.contacttypelist, action.newClass],
                    editContactType: state.editContactType,
                    classAddMode: state.classAddMode
                }
            }
            else {
                for (let i = 0; i < state.contacttypelist.length; i++) {
                    if (action.newClass.ClassId === state.contacttypelist[i].ClassId) {
                        const newItems = [...state.contacttypelist];
                        newItems[i].Name = action.newClass.Name;
                        return {
                            contacttypelist: newItems,
                            editContactType: state.editContactType,
                            classAddMode: state.classAddMode
                        };
                    }
                }
                break;
            }
        case "deleteContactTypeList":
            for (let i = 0; i < state.contacttypelist.length; i++) {
                if (action.classId === state.contacttypelist[i].ClassId) {
                    const newItems = [...state.contacttypelist];
                    newItems.splice(i, 1);
                    return {
                        contacttypelist: newItems,
                        editContactType: state.editContactType,
                        classAddMode: state.classAddMode
                    };
                }
            }
            break;
        default:
            return state
    }
}
export default ContactTypeReducer;