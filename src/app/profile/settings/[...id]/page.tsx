"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Loader2 } from "lucide-react";

interface User {
  id: string;
  name?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre de usuario debe tener más de 3 caracteres" })
    .max(32, {
      message: "El nombre de usuario no puede tener más de 32 caracteres",
    }),
});

export default function page() {
  const { id } = useParams();
  const newId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const formSubmitting = form.formState.isSubmitting;

  const getUser = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(`/api/auth/user/${newId}`);
      setUser(response.data as User);

      // Pre-fill the form with the current username if available
      if (response.data?.name) {
        form.setValue("name", response.data.name);
      }
    } catch (error: any) {
      setError("Error al obtener el usuario");
      toast.error("Error al obtener el usuario", {
        description: "Por favor, inténtelo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.put(`/api/auth/username/${newId}`, data);

      toast.success("Usuario actualizado correctamente", {
        description: "El nombre de usuario ha sido actualizado.",
      });
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating username:", error);
      toast.error(error.response?.data || "Error interno del servidor.", {
        description: "Por favor, inténtelo de nuevo.",
      });
    }
  };

  useEffect(() => {
    if (newId) {
      getUser();
    }
  }, [newId]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4">Cargando información del usuario...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80dvh]">
        <p className="text-xl text-red-500">{error}</p>
        <Link href="/">
          <Button className="cursor-pointer mt-4">
            <Home className="w-5 h-5 mr-2" />
            <span>Volver a la página principal</span>
          </Button>
        </Link>
      </div>
    );
  }

  // Check if user exists and if the current user is authorized
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80dvh]">
        <p className="text-xl">Usuario no encontrado</p>
        <Link href="/">
          <Button className="cursor-pointer mt-4">
            <Home className="w-5 h-5 mr-2" />
            <span>Volver a la página principal</span>
          </Button>
        </Link>
      </div>
    );
  }

  // Check if the user is authorized to edit this profile
  if (user && user.id !== newId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80dvh]">
        <p className="text-xl">No puedes cambiar el nombre de otro usuario</p>
        <Link href="/">
          <Button className="cursor-pointer mt-4">
            <Home className="w-5 h-5 mr-2" />
            <span>Volver a la página principal</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-card rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Cambiar nombre de usuario</h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nombre de usuario</Label>
          <Input
            id="name"
            type="text"
            placeholder="Nuevo nombre de usuario"
            {...form.register("name")}
            disabled={formSubmitting}
          />
          {form.formState.errors.name && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-2">
          <Link href="/">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={formSubmitting}
            className="cursor-pointer flex items-center"
          >
            {formSubmitting && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {formSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
