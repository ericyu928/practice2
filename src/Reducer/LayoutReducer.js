const initialState = {
    LayoutType: "Main",
    Params: {}
}
const ChangeType = (LayoutType, Params) => {
    return {
        type: "changeType",
        LayoutType,
        Params
    }
}
export { ChangeType };

const LayoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case "changeType":
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}

export default LayoutReducer;