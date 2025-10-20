export async function handler(event) {
    const key = process.env.WEATHER_API
    try {
        const res = await fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?key=${key}&location.latitude=39.1031&location.longitude=-84.5120&unitsSystem=IMPERIAL`)

        const data = await res.json()

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: err.message})
        }
    }
}
