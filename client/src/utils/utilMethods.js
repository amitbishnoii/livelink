export const convertTime = (time) => {
    return new Date(time).toLocaleTimeString([],
        {
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true,
        });
};

export const convertDate = (date) => {
    return new Date(date).toLocaleDateString();
};

export const redirect = (url) => {
    window.open(url, "_blank");
};