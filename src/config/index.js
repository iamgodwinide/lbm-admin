export const Config = {
    API_URL: 'https://loveblazersmobile.com/api/admin',
}

export const makeGetRequest = async (url, headers = {}) => {
    try {
        // set timeout for request
        const timeout = 30000
        const abortController = new AbortController();
        const id = setTimeout(() => abortController.abort(), timeout);

        const res = await fetch(`${Config.API_URL}${url}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers
            },
            signal: abortController.signal
        })
        clearTimeout(id);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const makePostRequest = async (url, body = {}, headers = {}) => {
    try {
        // set timeout for request
        const timeout = 30000
        const abortController = new AbortController();
        const id = setTimeout(() => abortController.abort(), timeout);

        const res = await fetch(`${Config.API_URL}${url}`, {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body),
            signal: abortController.signal
        })
        clearTimeout(id);
        return res;
    } catch (err) {
        console.log(err);
    }
}


