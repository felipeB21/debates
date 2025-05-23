import { prisma } from "../../../../../../prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const newId = Array.isArray(id) ? id[0] : id;
    if (!newId)
      return new Response("El ID del usuario es requerido", { status: 400 });
    const user = await prisma.user.findUnique({
      where: {
        id: newId,
      },
    });
    if (!user) return new Response("User not found", { status: 404 });
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
