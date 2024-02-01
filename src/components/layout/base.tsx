import { cn } from "@/lib/utils";

export function BaseLayout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto my-8 max-w-full px-4 text-zinc-300 md:max-w-xl xl:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
