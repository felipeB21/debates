import Link from "next/link";
import UserAvatar from "./auth/user-avatar";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <header className="max-w-4xl mx-auto px-10 py-3">
      <nav className="flex items-center justify-between">
        <Link href="/" className="geist-mono text-2xl font-medium">
          debates
        </Link>
        <div className="flex items-center gap-4">
          <UserAvatar />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
