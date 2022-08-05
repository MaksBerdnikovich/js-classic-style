const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

const getData = async (url) => {
    const result = await fetch(url)

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`)
    }

    return await result.json()
}

export {postData, getData}