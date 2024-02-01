import { Icon } from "./icon";

export function Header() {
  return (
    <div className="center py-auto flex h-56 w-full flex-col gap-4 md:h-72">
      <Icon />
      <p className="max-w-80 text-center">
        Find songs that are similar to your favorite track on Spotify
        effortlessly.
      </p>
    </div>
  );
}
