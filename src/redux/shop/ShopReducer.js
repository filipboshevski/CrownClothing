import shopActionTypes from "./ShopTypes";

const INITIAL_STATE = {
    shopData: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case shopActionTypes.SET_SHOP_COLLECTIONS:
        return {
          ...state,
          shopData: action.payload
        }
      
      default:
          return state;
    }
}

export default shopReducer;