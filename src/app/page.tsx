"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [keyword, setKeywords] = useDebounceValue("", 500);
  const route = useRouter();

  const handleOnSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    route.push(`/home?search=${keyword}`);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-purple-400">
      <div>
        <Image
          src="/logo.png"
          alt="ngmusic logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </div>
      <div className="absolute bottom-0 w-full px-6 m-6">
        <form className="flex flex-col gap-3 w-full" onSubmit={handleOnSearch}>
          <Input
            type="text"
            placeholder="Artist / Album / Title"
            onChange={handleOnChange}
          />
          <Button
            type="submit"
            className="text-white bg-white bg-opacity-20"
            disabled={!keyword}
          >
            Search
          </Button>
        </form>
      </div>
    </main>
  );
}
