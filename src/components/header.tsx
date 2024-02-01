import { app } from "@/lib/constants";

import { Icon } from "./icon";

export function Header() {
  return (
    <div className="center py-auto flex h-56 w-full flex-col gap-4 md:h-72">
      <Icon />
      <p className="max-w-80 text-center">{app.description}</p>
    </div>
  );
}
