import { prisma } from "../../../../prisma";

export async function GET(req: Request) {
  try {
    const debates = await prisma.debate.findMany({
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!debates) return new Response("No debates found", { status: 404 });
    return new Response(JSON.stringify(debates), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching debates:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
