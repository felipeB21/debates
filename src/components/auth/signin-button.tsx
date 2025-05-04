import { signIn } from "../../../auth";
import { Button } from "../ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant={"ghost"} className=" cursor-pointer">
        Iniciar sesión
      </Button>
    </form>
  );
}
