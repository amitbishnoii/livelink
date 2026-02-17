export const getInfo = async () => {
    try {
        const res = await fetch(`http://localhost:3000/user/getID/${user}`);
        const r = await res.json();
        setID(r.ID);
    } catch (err) {
        console.error("getInfo error:", err);
    }
};

export const getFriends = async () => {
    try {
        if (!ID) return;
        const res = await fetch(`http://localhost:3000/friends/getFriends/${ID}`);
        const r = await res.json();
        setFriends(r.list || []);
    } catch (err) {
        console.error("getFriends error:", err);
    }
};

export const getFriendInfo = async (sel) => {
    try {
        if (!sel) return;
        const res = await fetch(`http://localhost:3000/user/getID/${sel.userName}`);
        const r = await res.json();
        setCurrentChatInfo(r.userINFO || null);
    } catch (err) {
        console.error("getFriendInfo error:", err);
    }
};

export const getMessages = async (sen, rec) => {
    try {
        if (!sen || !rec) return;
        const res = await fetch(`http://localhost:3000/message/getMessage/${sen}/${rec}`);
        const r = await res.json();
        setMessages(r.messages)
    } catch (error) {
        console.log('getMessages error: ', error);
    }
}
