"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";

import { FRAMER_FADE_IN_OUT } from "@/lib/constants";

import { LoadingSpinner } from "../loading-spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SearchInput() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  function handleSearch(query: string) {
    const params = new URLSearchParams(window.location.search);

    if (query) params.set("search", query);
    else {
      params.delete("search");
      if (searchInputRef.current) searchInputRef.current.value = "";
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative flex h-12 w-full items-center">
      <Input
        className="!h-full rounded-2xl bg-zinc-900 !px-11"
        placeholder="Search for similar songs"
        defaultValue={searchParams.get("search") || undefined}
        ref={searchInputRef}
        onChange={(e) => handleSearch(e.target.value)}
        autoFocus
      />
      <div className="center pointer-events-none absolute bottom-0 left-4 top-0 flex">
        <SearchIcon className="text-zinc-500" size={18} />
      </div>
      <AnimatePresence>
        {isPending && (
          <motion.div
            className="center absolute bottom-0 right-4 top-0 flex"
            {...FRAMER_FADE_IN_OUT}
          >
            <LoadingSpinner />
          </motion.div>
        )}
        {!isPending && searchParams.get("search") && (
          <motion.div {...FRAMER_FADE_IN_OUT}>
            <Button
              className="center absolute bottom-0 right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 rounded-xl text-zinc-500 hover:text-zinc-700 hover:dark:text-zinc-300"
              variant="ghost"
              size="icon"
              onClick={() => {
                handleSearch("");
                searchInputRef.current?.focus();
              }}
            >
              <XIcon size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
