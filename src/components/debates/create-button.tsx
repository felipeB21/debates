import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CreateButton() {
  return (
    <Link href={"/debate/create"}>
      <Button className="cursor-pointer">
        Crear un debate <Plus />
      </Button>
    </Link>
  );
}
