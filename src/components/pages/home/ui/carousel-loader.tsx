import React from "react";
import { randomData } from "../../../../lib/utils";

export default function CarouselLoader() {
  return (
    <>
      {randomData(4)?.map((card) => (
        <div
          key={card._id}
          style={{ width: 400, marginRight: 16 }}
          className="grid h-60 flex-shrink-0 animate-pulse grid-cols-12 gap-3 rounded-lg bg-muted p-3"
        >
          {/* Image Skeleton */}
          <div className="col-span-7 h-full rounded-lg bg-md"></div>

          {/* Content Skeleton */}
          <div className="col-span-5 flex flex-col">
            {/* Badge Skeleton */}
            <div className="mb-2 h-4 w-24 rounded-sm bg-md"></div>

            {/* Title Skeleton */}
            <div className="mb-2 h-6 rounded-lg bg-md"></div>

            {/* Description Skeleton */}
            <div className="mb-2 h-4 rounded-lg bg-md"></div>
            <div className="mb-2 h-4 rounded-lg bg-md"></div>

            {/* Button Skeleton */}
            <div className="mt-auto h-10 rounded-lg bg-md"></div>
          </div>
        </div>
      ))}
    </>
  );
}
