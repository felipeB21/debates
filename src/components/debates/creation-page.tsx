"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, { message: "El titulo es requerido" }).max(50, {
    message: "El titulo no puede tener mas de 50 caracteres",
  }),
  genre: z.string().min(1, { message: "El genero es requerido" }),
});

export default function CreationPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/debate", data);
      const debateId = res.data.id;
      form.reset();
      router.push(`/debate/${debateId}`);
    } catch (error: any) {
      console.error("Error creating debate:", error);
      toast.error(
        error.response.data.message || "Error interno del servidor.",
        {
          description: "Por favor, intentenlo de nuevo.",
        }
      );
    }
  };

  return (
    <div className="mt-32">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Titulo</Label>
          <Input
            id="title"
            type="text"
            placeholder="Escribe el titulo del debate"
            {...form.register("title")}
            disabled={isLoading}
          />
          {form.formState.errors.title && (
            <span className="text-red-500">
              {form.formState.errors.title.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="genre">Genero</Label>
          <Select onValueChange={(value) => form.setValue("genre", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un genero" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Opciones</SelectLabel>
                <SelectItem value="DEPORTES">Deportes</SelectItem>
                <SelectItem value="POLITICA">Politica</SelectItem>
                <SelectItem value="CIENCIA">Ciencia</SelectItem>
                <SelectItem value="TECNOLOGIA">Tecnologia</SelectItem>
                <SelectItem value="SALUD">Salud</SelectItem>
                <SelectItem value="MEDIO_AMBIENTE">Medio Ambiente</SelectItem>
                <SelectItem value="EDUCACION">Educacion</SelectItem>
                <SelectItem value="ENTRETENIMIENTO">Entretenimiento</SelectItem>
                <SelectItem value="NEGOCIOS">Negocios</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.formState.errors.genre && (
            <span className="text-red-500">
              {form.formState.errors.genre.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="cursor-pointer">
          {isLoading ? "Creando..." : "Crear debate"}
        </Button>
      </form>
    </div>
  );
}
