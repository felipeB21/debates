import { currentUser } from "@/lib/current-profile";
import { prisma } from "../../../../prisma";

export async function POST(req: Request) {
  try {
    const { title, genre } = await req.json();

    const user = await currentUser();
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "Debe iniciar sesión para poder crear un debate.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const findDebate = await prisma.debate.findFirst({
      where: {
        ownerId: user.id,
        isActive: true,
      },
    });
    if (findDebate) {
      return new Response(
        JSON.stringify({
          message: "Ya tienes un debate activo.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

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
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
