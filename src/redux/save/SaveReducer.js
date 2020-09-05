const INITIAL_STATE = {
    canSave: false
};

export const saveReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_CAN_SAVE':
            return {
                ...state,
                canSave: !state.canSave
            }
        default:
            return state;
    }
}