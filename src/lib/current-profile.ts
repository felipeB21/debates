import { auth } from "../../auth";
import { prisma } from "../../prisma";

export const currentUser = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!profile) return null;

  return profile;
};
