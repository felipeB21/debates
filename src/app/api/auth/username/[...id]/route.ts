import { prisma } from "../../../../../../prisma";
import { auth } from "../../../../../../auth";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const { id } = await params;
    const { name } = await req.json();
    const newId = Array.isArray(id) ? id[0] : id;
    if (!newId)
      return new Response("El ID del usuario es requerido", { status: 400 });
    const user = await prisma.user.findUnique({
      where: {
        id: newId,
      },
    });
    if (!session?.user) return new Response("Unauthorized", { status: 401 });
    if (session.user.id !== newId)
      return new Response("Unauthorized", { status: 401 });
    if (!user) return new Response("User not found", { status: 404 });
    const updatedUser = await prisma.user.update({
      where: {
        id: newId,
      },
      data: {
        name,
      },
    });
    return new Response(JSON.stringify(updatedUser), {
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
