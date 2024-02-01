"use client";

import { ArrowLeftIcon, SearchIcon } from "lucide-react";
/* import Image from "next/image"; */
import { useRouter } from "next/navigation";

/* import SpotifyFullImage from "../../public/spotify-full.png"; */
import { Button } from "./ui/button";

export function TopNavigation() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between">
      <Button
        className="w-fit rounded-full"
        variant="secondary"
        size="sm"
        onClick={() => {
          if (window.history?.length > 1) router.back();
          else router.replace("/");
        }}
      >
        <ArrowLeftIcon className="mr-1 inline-flex" size={14} /> Go Back
      </Button>
      <div className="flex items-center gap-2">
        <Button
          className="w-fit rounded-full"
          variant="default" /* "secondary" */
          size="sm"
          onClick={() => router.push("/")}
        >
          <SearchIcon className="mr-1 inline-flex" size={14} /> New Search
        </Button>
        {/* <Button
          className="w-fit rounded-full"
          size="sm"
          onClick={() => router.push("/")}
        >
          Login with
          <Image
            className="ml-1 inline-flex"
            src={SpotifyFullImage}
            height={18}
            alt="Spotify"
          />
        </Button> */}
      </div>
    </div>
  );
}
