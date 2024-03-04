"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import TrackItem from "./components/TrackItem";
import useSearch from "./repository/search/use-search";
import useEvent from "./usecase/use-event";

export default function Home() {
  const searchParams = useSearchParams()!;
  const search = searchParams.get("search") ?? "";

  const { data, loading } = useSearch({ variables: { term: search } });

  const {
    keyword,
    showModal,
    handleOnChange,
    handleOnSearch,
    handleOnShowModal,
  } = useEvent();

  return (
    <main className="min-h-screen flex flex-col items-center pb-4 bg-gray-50">
      <div className="sticky top-0 flex justify-between items-center h-10 w-full p-2 mb-6 bg-gradient-to-br from-purple-700 to-purple-400 z-10">
        <Menu color="#ffffff" size={26} className="cursor-pointer" />
        <div>
          <Image
            src="/ngmusic.svg"
            alt="ngmusic logo"
            width={100}
            height={100}
            style={{
              objectFit: "contain",
            }}
            priority
          />
        </div>
        <Dialog open={showModal}>
          <DialogTrigger onClick={() => handleOnShowModal(true)}>
            <Search color="#ffffff" className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent onClose={() => handleOnShowModal(false)}>
            <div className="text-xl text-white text-center font-semibold m-auto mb-6">
              Search
            </div>
            <form
              className="flex flex-col gap-3 w-full"
              onSubmit={handleOnSearch}
            >
              <Input
                type="text"
                placeholder="Artist / Album / Title"
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                className="text-white bg-purple-600"
                disabled={!keyword}
              >
                Search
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <p>
        Search result for : &nbsp;
        <span className="text-xl text-purple-700 font-semibold">{search}</span>
      </p>
      {loading ? (
        <div className="flex-1 flex flex-col w-full p-4">
          {Array(5)
            .fill(null)
            .map((_, idx) => (
              <Skeleton key={idx} className="h-36 w-full rounded-xl my-2" />
            ))}
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 flex flex-col w-full p-4">
            {data.results.map((track, idx) => {
              return <TrackItem key={idx} track={track} />;
            })}
          </ScrollArea>
          <Button variant="secondary" className="w-32">
            Load More
          </Button>
        </>
      )}
    </main>
  );
}
