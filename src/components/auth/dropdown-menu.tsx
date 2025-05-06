"use client";

import Image from "next/image";
import type { User } from "next-auth";
import { LogOut, Settings, UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserAvatarDropdownProps {
  user: User | null | undefined;
}

export function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Image
            src={(user.image as string) || "/placeholder.svg"}
            alt="User avatar"
            width={32}
            height={32}
            priority
            className="rounded-full w-8 h-8 cursor-pointer hover:ring-2 hover:ring-muted transition"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div>
            <p className="text-sm font-medium leading-none">{user.name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/profile/${user.id}`}
              className="flex items-center gap-2 w-full"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              <p>Perfil</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/profile/${user.id}/settings`}
              className="flex items-center gap-2 w-full"
            >
              <Settings className="mr-2 h-4 w-4" />
              <p>Configuración</p>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <p>Serrar sesión</p>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
