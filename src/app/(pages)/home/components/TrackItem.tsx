"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

import { PauseCircle, PlayCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { TrackResult } from "../../model/search";

type Props = {
  track: TrackResult;
};

const TrackItem = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { track } = props;

  const audioRef = useRef(new Audio(track.previewUrl || ""));

  const handleTrackClick = () => {
    audioRef.current.play();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="max-h-36 my-3">
      <CardContent className="flex gap-4 p-2">
        <div className="relative h-[100px] w-[100px]">
          <Image
            src={track.artworkUrl100 || ""}
            alt={track.trackName || ""}
            sizes="100px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {isPlaying ? (
              <PauseCircle
                color="#ffffff"
                size={32}
                className="cursor-pointer"
                onClick={handleTrackClick}
              />
            ) : (
              <PlayCircle
                color="#ffffff"
                size={32}
                className="cursor-pointer"
                onClick={handleTrackClick}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex-1">
            <p className="text-sm">{track.artistName}</p>
            <p className="text-lg font-semibold line-clamp-2">
              {track.trackName}
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <Badge className="!bg-green-600">{track.primaryGenreName}</Badge>
            {track.trackPrice && (
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src="/dollarsign.png"
                    alt="dollar"
                    width={16}
                    height={16}
                  />
                </div>
                <span className="text-yellow-500 font-semibold">
                  {track.trackPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackItem;
