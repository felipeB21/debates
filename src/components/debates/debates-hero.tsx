import axios from "axios";
export async function DebatesHero() {
  const res = await axios.get(`${process.env.NEXT_URL}/api/debates`);
  const debates = await res.data;
  console.log(debates.particpipants);

  return (
    <div>
      {debates.map((debate: any) => (
        <div key={debate.id} className="flex flex-col gap-2">
          <p>{debate.title}</p>
        </div>
      ))}
    </div>
  );
}
