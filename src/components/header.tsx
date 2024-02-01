import Link from "next/link";

import { app } from "@/lib/constants";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Icon } from "./icon";

export function Header() {
  return (
    <div className="center py-auto relative flex h-56 w-full flex-col gap-4 md:h-72">
      <Link
        className="absolute right-0 top-4 text-zinc-300 transition-colors hover:text-white"
        href="https://github.com/itsbrunodev/similar-songs"
        target="_blank"
      >
        <SiGithub size={24} />
      </Link>
      <Icon />
      <p className="max-w-80 text-center">{app.description}</p>
    </div>
  );
}
