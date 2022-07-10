export const fetchData = async (method, body) => fetch('/notes/', {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
}).then((res) => res.json()).then((result) => result).catch((err) => {
    console.error('GET err', err);
});

export const data = fetchData('GET');