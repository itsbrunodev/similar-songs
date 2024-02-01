import NextImage, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

export function Image({
  wrapper,
  image,
}: {
  wrapper?: React.HTMLProps<HTMLDivElement>;
  image: ImageProps;
}) {
  return (
    <div
      className={cn(
        "relative w-full bg-zinc-900",
        wrapper?.className
      )}
      {...wrapper}
    >
      <NextImage
        className={cn("full m-0 rounded-[inherit]", image.className)}
        draggable={false}
        {...image}
      />
    </div>
  );
}
