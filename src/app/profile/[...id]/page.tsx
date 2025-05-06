"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader, Calendar } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  createdAt?: string;
  // Add other user properties as needed
}

export default function UserProfile() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract the ID properly from params
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    fetchUser();
  }, [id]); // Re-fetch when ID changes

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/auth/user/${id}`);
      setUser(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader className="animate-spin" size={32} />
        <span className="ml-2">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchUser}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Usuario no encontrado</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-stone-100/60 dark:bg-stone-800/60 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>

        <div className="px-6 py-4 relative">
          <div className="absolute -top-16 left-6">
            <div className="rounded-full border-4 border-stone-100/60 dark:border-stone-800/60 overflow-hidden">
              {user.image ? (
                <Image
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="w-auto h-auto"
                  priority
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                    {user.name?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            {user.createdAt && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="inline mr-1" size={16} />
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
