import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import messages from "../features/messages";
import users from "../features/users";
import series from '../features/series'
import devotionals from '../features/devotionals'
import admin from '../features/admin'

const reducer = combineReducers({
    messages,
    series,
    users,
    devotionals,
    admin
});

const store = configureStore({
    reducer
});

export default store;