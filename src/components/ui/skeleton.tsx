import React from "react";

export default function SkeletonLoader({ height, width }: { height?: string; width?: string }) {
  return (
    <div
      className={`${height || "h-9"} ${width || "w-full"} skeleton text-muted-foreground mb-2 truncate bg-pink text-base font-medium`}
    ></div>
  );
}
