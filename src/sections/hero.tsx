import CreateButton from "@/components/debates/create-button";
import { DebatesHero } from "@/components/debates/debates-hero";

export default function Hero() {
  return (
    <div>
      <h1 className="text-3xl">Bienvenido a debates</h1>
      <div className="mt-3">
        <CreateButton />
      </div>
      <div className="mt-20">
        <h2 className="text-3xl">Debates populares</h2>
        <DebatesHero />
      </div>
    </div>
  );
}
