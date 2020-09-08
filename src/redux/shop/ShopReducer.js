import shopActionTypes from "./ShopTypes";

const INITIAL_STATE = {
    shopData: null,
    isFetching: false,
    errorMessage: ''
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case shopActionTypes.SET_SHOP_COLLECTIONS:
        return {
          ...state,
          shopData: action.payload
        }
      case shopActionTypes.FETCH_COLLECTIONS_START:
        return {
          ...state,
          isFetching: true
        }
      case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
        return {
          ...state,
          shopData: action.payload,
          isFetching: false
        }
      case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
        return {
          ...state,
          errorMessage: action.payload,
          isFetching: false
        }
      default:
          return state;
    }
}

export default shopReducer;