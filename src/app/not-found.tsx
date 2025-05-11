import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70dvh]">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-4xl font-semibold">Pagina no encontrada</h2>
        <Link href={"/"}>
          <Button className=" cursor-pointer" variant={"secondary"}>
            <Home /> Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
