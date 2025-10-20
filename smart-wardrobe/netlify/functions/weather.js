export async function handler(event) {
    const key = process.env.WEATHER_API
    try {
        // const res = await fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?key=${key}&location.latitude=39.1336&location.longitude=-84.43561&unitsSystem=IMPERIAL`)

        const[res1, res2] = await Promise.all([
            fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?key=${key}&location.latitude=39.1336&location.longitude=-84.43561&unitsSystem=IMPERIAL`),
            fetch(`https://weather.googleapis.com/v1/forecast/days:lookup?key=${key}&location.latitude=39.1336&location.longitude=-84.43561&days=1&unitsSystem=IMPERIAL`)
        ])

        if (!res1.ok || !res1.ok) {
            throw new Error(`Fetch failed: ${res1.status} / ${res2.status}`)
        }

        const [data1, data2] = await Promise.all([res1.json(), res2.json()])

        const combine = {
            currentConditions: data1,
            forecast: data2
        };

        return {
            statusCode: 200,
            body: JSON.stringify(combine),
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: err.message})
        }
    }
}
