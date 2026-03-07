export const convertTime = (time) => {
    return new Date(time).toLocaleTimeString([],
        {
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true,
        });
};

export const convertDate = (date) => {
    const newDate = new Date(date);
    const today = new Date();
    if (today.toDateString() === newDate.toDateString()) {
        return "Today";
    }
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (newDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }
    return new Date(date).toLocaleDateString([], {day: 'numeric', month:'short'});
};

export const redirect = (url) => {
    window.open(url, "_blank");
};