"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Debate {
  id: string;
  title: string;
  genre: string;
  createdAt: string;
  // Añade otros campos si es necesario
}

export default function DebatePage() {
  const { id } = useParams();
  const [debate, setDebate] = useState<Debate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (!id) return <p>No id</p>;

  const debateId = id[0];

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const res = await axios.get(`/api/debate/${debateId}`);
        console.log(res);

        setDebate(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al cargar el debate.");
      } finally {
        setLoading(false);
      }
    };

    if (debateId) {
      fetchDebate();
    }
  }, [debateId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{debate?.title}</h1>
      <p className="text-gray-700">Género: {debate?.genre}</p>
    </div>
  );
}
