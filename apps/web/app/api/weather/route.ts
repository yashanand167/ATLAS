import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const API_KEY = process.env.WEATHER_API_KEY;
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&appid=${API_KEY}&units=metric`;

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    }

    const res = await fetch(url);
    const data = await res.json();

    return Response.json(data);
}