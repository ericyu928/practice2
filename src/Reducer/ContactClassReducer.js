import ContactClass from "../ContactClass.json";

const initialState = {
    contactClassList: ContactClass,
    classDetail: [{
        ClassId: "",
        Name: "",
        UserId: ""
    }],
    classAddMode: false
}

const ContactClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case "openClassEdit":
            let editData = []
            if (!action.classAddMode) {
                editData = action.classDetail
            }
            return {
                ...state,
                classDetail: editData,
                classAddMode: action.classAddMode
            }
        case "saveContactTypeList":
            let list = [...state.contactClassList];
            if (action.mode === "Save") {
                if (state.classAddMode) {
                    list = [...list, { ClassId: Math.random.toString(), Name: action.className, UserId: "Eric" }]
                }
                else {
                    list = list.map((contactClass) =>
                        contactClass.ClassId === state.classDetail.ClassId ?
                            { ClassId: state.classDetail.ClassId, Name: action.className, UserId: state.classDetail.UserId } : contactClass
                    )
                }
            }
            else if (action.mode === "Del") {
                list = list.filter((contactClass) =>
                    contactClass.ClassId !== state.classDetail.ClassId
                )
            }
            return {
                ...state,
                contactClassList: list,
                classAddMode: false
            }
        default:
            return state
    }
}
export default ContactClassReducer;