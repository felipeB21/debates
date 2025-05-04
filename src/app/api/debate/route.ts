import { currentUser } from "@/lib/current-profile";
import { prisma } from "../../../../prisma";

export async function POST(req: Request) {
  try {
    const { title, genre } = await req.json();

    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const debate = await prisma.debate.create({
      data: {
        title,
        genre,
        ownerId: user.id,
        participants: {
          create: {
            userId: user.id,
            role: "ADMIN",
          },
        },
      },
    });

    return new Response(JSON.stringify(debate), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating debate:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
