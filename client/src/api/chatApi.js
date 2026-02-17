
export const getInfo = async (username) => {
    try {
        const res = await fetch(`http://localhost:3000/user/getID/${username}`);
        const r = await res.json();
        return r;
    } catch (err) {
        console.error("getInfo error:", err);
    }
};

export const getFriends = async (ID) => {
    try {
        const res = await fetch(`http://localhost:3000/friends/getFriends/${ID.ID}`);
        const r = await res.json();
        return r.list;
    } catch (err) {
        console.error("getFriends error:", err);
    }
};

export const getFriendInfo = async (username) => {
    try {
        const res = await fetch(`http://localhost:3000/user/getID/${username.userName}`);
        const r = await res.json();
        return r.userINFO;
    } catch (err) {
        console.error("getFriendInfo error:", err);
    }
};

export const getMessages = async (sender, receiver) => {
    try {
        console.log('getmessage ran!!');
        if (!sender || !receiver) return;
        console.log('sender: ', sender);
        console.log('receiver: ', receiver);
        const res = await fetch(`http://localhost:3000/message/getMessage/${sender.ID}/${receiver}`);
        const r = await res.json();
        return r.messages;
    } catch (error) {
        console.log('getMessages error: ', error);
    }
};
