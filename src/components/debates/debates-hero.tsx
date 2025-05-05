import axios from "axios";
import Image from "next/image";
import Link from "next/link";
export async function DebatesHero() {
  const res = await axios.get(`${process.env.NEXT_URL}/api/debates`);
  const debates = await res.data;

  return (
    <div className="mt-10 grid grid-cols-3 items-center justify-items-center gap-10 bg-stone-100/60 dark:bg-stone-800/60 rounded-md p-10">
      {debates.map((debate: any) => (
        <Link
          href={`/debate/${debate.id}`}
          key={debate.id}
          className="flex flex-col gap-2"
        >
          <h5 className="geist-mono">{debate.title}</h5>
          <ul>
            {debate.participants.map((participant: any) => (
              <li key={participant.id}>
                <Image
                  src={participant.user.image}
                  alt="image"
                  width={50}
                  height={50}
                />
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}
