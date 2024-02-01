"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { BaseLayout } from "@/components/layout/base";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <BaseLayout className="center my-0 flex h-screen flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-6xl font-extrabold text-white">Not Found</h1>
        <p className="text-lg">We couldn't find the page you're looking for.</p>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => router.back()}>
          Go Back
        </Button>
        <Link href="/">
          <Button tabIndex={-1}>New Search</Button>
        </Link>
      </div>
    </BaseLayout>
  );
}
