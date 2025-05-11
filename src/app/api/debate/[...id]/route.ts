import { prisma } from "../../../../../prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const debateId = id[0];

    const debate = await prisma.debate.findUnique({
      where: {
        id: debateId,
      },
    });

    if (!debate) {
      return new Response(JSON.stringify({ message: "Debate no encontrado" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(debate), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Error del servidor" }), {
      status: 500,
    });
  }
}
