import ContactData from "../ContactData.json";
import ContactClass from "../ContactClass.json";
import ContactClassReducer from "./ContactClassReducer";

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
    contactDetail: [{
        ContactId: "",
        ClassId: "",
        Classname:"",
        Name: "",
        Sex: "",
        Phone: "",
        Address: "",
        Email: ""
    }],
    contactAddMode: false,
}

const ContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "editContactData":
            let editData = []
            if (!action.classAddMode) {
                editData = action.contactDetail
            }
            return {
                ...state,
                contactDetail: editData,
                contactAddMode: action.contactAddMode,
            }
        case "saveContactData":
            let list = [...state.contactData];
            if (action.mode === "Save") {
                if (state.contactAddMode) {
                    list = [...list, {
                        ...action.editData, ContactId: Math.random.toString(),
                        ClassId:action.classId,
                        Classname: action.className
                    }]
                }

                else {
                    console.log(action.editData)
                    list = list.map((contactData) =>
                        contactData.ContactId === state.contactDetail.ContactId ?
                            { ...action.editData, ContactId: state.contactDetail.ContactId, ClassId: state.contactDetail.ClassId } : contactData
                    )
                }
                console.log(action.className)

            }
            else if (action.mode === "Del") {
                list = list.filter((contactData) =>
                    contactData.ContactId !== state.contactDetail.ContactId
                )
            }
            return {
                ...state,
                contactData: list,
                classAddMode: false
            }
        default:
            return state
    }
}

export default ContactReducer;