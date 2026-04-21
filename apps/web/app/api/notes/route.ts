export async function POST(request: Request) {
    const { title, content } = await request.json();
    console.log(title, content);
    return Response.json({ message: "Note created" });
}

export async function GET(request: Request) {
    return Response.json({ message: "Notes fetched" });
}

