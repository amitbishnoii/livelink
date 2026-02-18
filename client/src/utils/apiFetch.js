
export const apiFetch = async (api, options = {}) => {
    const token = localStorage.getItem("token");
    const finalHeaders = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    }
    const res = await fetch(api, {
        ...options,
        headers: finalHeaders
    });
    return res;
}