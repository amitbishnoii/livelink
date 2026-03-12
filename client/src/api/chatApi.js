import { apiFetch } from '../utils/apiFetch.js';

export const getInfo = async (username) => {
    try {
        const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/user/getID/${username}`);
        const r = await res.json();
        return r;
    } catch (err) {
        console.error("getInfo error:", err);
    }
};

export const getFriends = async (ID) => {
    try {
        const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/friends/getFriends/${ID}`);
        const r = await res.json();
        return r.list;
    } catch (err) {
        console.error("getFriends error:", err);
    }
};

export const getFriendInfo = async (username) => {
    try {
        const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/user/getID/${username.userName}`);
        const r = await res.json();
        return r.userINFO;
    } catch (err) {
        console.error("getFriendInfo error:", err);
    }
};

export const getMessages = async (sender, receiver) => {
    try {
        if (!sender || !receiver) return;
        const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/message/getMessage/${sender}/${receiver}`);
        const r = await res.json();
        return r.messages;
    } catch (error) {
        console.log('getMessages error: ', error);
    }
};
