import config from "./config.json"
const serverUrl = config["main_server_url"]


/**
 * gets data from server
 * @param {string} key
 * @param {number} lim
 */
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