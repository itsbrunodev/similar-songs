import Image from "next/image";
import Link from "next/link";

import SpotifyFullImage from "../../public/spotify-full.png";

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-evenly py-4">
      <Link
        className="font-light text-zinc-400 transition-colors hover:text-zinc-100"
        href="https://itsbruno.dev"
        target="_blank"
      >
        Created by <span className="font-medium text-white">Bruno</span>
      </Link>
      <Link
        className="font-light text-zinc-400 transition-colors hover:text-zinc-100"
        href="https://spotify.com"
        target="_blank"
      >
        Powered by{" "}
        <Image
          className="inline-flex ml-0.5"
          src={SpotifyFullImage}
          height={20}
          alt="Spotify"
        />
      </Link>
    </footer>
  );
}
