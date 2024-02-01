import { Drawer } from "vaul";

export function Navbar() {
  return (
    <div className="fixed top-0 z-40 w-full border-b border-b-zinc-200 bg-zinc-100/90 px-4 py-4 backdrop-blur-sm xl:px-0 dark:border-b-zinc-900 dark:bg-zinc-950/90 dark:backdrop-blur-xl">
      <div className="max-w-9xl mx-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          {/* <LogoLink />
          <RouteLinks /> */}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-0">{/* <ThemeButton /> */}</div>
          {/* <ProfileButton /> */}
        </div>
        {/* <Button className="flex md:hidden" variant="ghost" size="icon">
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button> */}
      </div>
    </div>
  );
}
