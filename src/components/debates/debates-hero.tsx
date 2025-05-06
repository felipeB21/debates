import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export async function DebatesHero() {
  const res = await axios.get(`${process.env.NEXT_URL}/api/debates`);
  const debates = await res.data;

  const bgColors = [
    "bg-red-200 dark:bg-red-800",
    "bg-blue-200 dark:bg-blue-800",
    "bg-green-200 dark:bg-green-800",
    "bg-yellow-200 dark:bg-yellow-800",
    "bg-purple-200 dark:bg-purple-800",
    "bg-pink-200 dark:bg-pink-800",
    "bg-indigo-200 dark:bg-indigo-800",
    "bg-orange-200 dark:bg-orange-800",
  ];

  return (
    <div className="mt-10 grid grid-cols-3 items-center justify-items-center gap-10 bg-stone-100/60 dark:bg-stone-800/60 rounded-md p-10">
      {debates.map((debate: any) => (
        <Link
          href={`/debate/${debate.id}`}
          key={debate.id}
          className="flex flex-col gap-2"
        >
          <h5 className="geist-mono">{debate.title}</h5>
          <ul className="flex flex-wrap gap-2">
            {debate.participants.map((participant: any, index: number) => (
              <li
                key={participant.id}
                className={`rounded-full overflow-hidden ${
                  bgColors[index % bgColors.length]
                } p-1 flex items-center justify-center`}
              >
                <div className="rounded-full overflow-hidden">
                  <Image
                    src={participant.user.image || "/placeholder.svg"}
                    alt={`Participant ${index + 1}`}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}
