const INITIAL_STATE = {
    canSave: false,
    isLoading: true
};

export const saveReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_CAN_SAVE':
            return {
                ...state,
                canSave: !state.canSave
            }
        case 'TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: !state.isLoading
            }
        default:
            return state;
    }
}