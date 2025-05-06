import { prisma } from "../../../../../../prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const newId = Array.isArray(id) ? id[0] : id;
    if (!newId) return new Response("User ID is required", { status: 400 });
    const user = await prisma.user.findUnique({
      where: {
        id: newId,
      },
      include: {
        joinedDebates: {
          include: {
            debate: {
              include: {
                participants: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) return new Response("User not found", { status: 404 });
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
