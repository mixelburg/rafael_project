const serverUrl = "http://localhost:5000"

const fetchData = async (key, lim) => {
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: key, lim: lim })
    };

    const response = await fetch(serverUrl, requestMetadata)
    return response.json()
}

export default fetchData