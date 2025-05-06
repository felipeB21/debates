import { auth } from "../../../auth";
import { SignIn } from "./signin-button";
import { UserAvatarDropdown } from "./dropdown-menu";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return <UserAvatarDropdown user={session.user} />;
}
