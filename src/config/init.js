import { makeGetRequest } from ".";
import { updatePendingUsers, updateUsers } from "../features/users";
import { updateMessages } from '../features/messages'
import { updateSeries } from "../features/series";
import { updateDevotionals } from "../features/devotionals";

export const getUsers = async (dispatch) => {
    try {
        const req = await makeGetRequest("/users");
        if (req) {
            const res = await req.json();
            if (res.success) {
                dispatch(updateUsers(res.users));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const getPendingUsers = async (dispatch) => {
    try {
        const req = await makeGetRequest("/users/pending");
        if (req) {
            const res = await req.json();
            if (res.success) {
                dispatch(updatePendingUsers(res.users));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const getMessages = async (dispatch) => {
    try {
        const req = await makeGetRequest("/messages");
        if (req) {
            const res = await req.json();
            if (res.success) {
                dispatch(updateMessages(res.messages));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const getSeries = async (dispatch) => {
    try {
        const req = await makeGetRequest("/series");
        if (req) {
            const res = await req.json();
            if (res.success) {
                dispatch(updateSeries(res.series));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const getDevotionals = async (dispatch) => {
    try {
        const req = await makeGetRequest("/devotionals");
        if (req) {
            const res = await req.json();
            if (res.success) {
                dispatch(updateDevotionals(res.devotionals));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const init = (dispatch) => {
    getUsers(dispatch);
    getPendingUsers(dispatch);
    getMessages(dispatch);
    getSeries(dispatch);
    getDevotionals(dispatch);
}

export default init