export async function GET() {
    const API_KEY = process.env.WEATHER_API_KEY;

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&appid=${API_KEY}`
    );

    const data = await res.json();

    return Response.json(data);
}