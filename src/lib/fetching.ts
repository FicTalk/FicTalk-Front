export const fetchData = async (url: string, method: string, body?: any) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}
