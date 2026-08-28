import client from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const db = client.db("want_to_say_something");

    await db.collection("messages").insertOne({
      name: data.name,
      isTargetPerson: data.isTargetPerson,
      answers: data.answers,
      message: data.message,
      createdAt: new Date(),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
