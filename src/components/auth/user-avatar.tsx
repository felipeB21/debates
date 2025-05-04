import Image from "next/image";
import { auth } from "../../../auth";
import { SignIn } from "./signin-button";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <div>
      <Image
        src={session.user.image as string}
        alt="User image"
        width={32}
        height={32}
        priority
        className="rounded-full w-auto h-auto"
      />
    </div>
  );
}
