const initialState = {
    showType: "Main"
}

const LayoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case "changeType":
            return {
                ...state,
                showType: action.layoutType
            }
        default:
            return state
    }
}

export default LayoutReducer;