import { combineReducers } from 'redux';
import userReducer from './user/UserReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import directoryReducer from './directory/DirectoryReducer';
import shopReducer from './shop/ShopReducer';
import CartReducer from './cart/CartReducer';
import localCartReducer from './cart/local-cart/LocalCartReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['localCart']
}

const rootReducer = combineReducers({
    user: userReducer,
    localCart: localCartReducer,
    cart: CartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);