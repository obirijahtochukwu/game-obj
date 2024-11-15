import React, { useRef } from "react";
import ReactElasticCarousel from "react-elastic-carousel";
import { trending } from "../mock-data";
import { Icons } from "../../../ui/icons";

export default function Trending() {
  const ref: any = useRef(null);

  const next = (currentItem: any, nextItem: any) => {
    if (currentItem.index === nextItem.index) {
      ref.current.goTo(0);
    }
  };
  const prev = (currentItem: any, nextItem: any) => {
    if (currentItem.index === nextItem.index) {
      // ref.current.goTo(icons.length);
    }
  };
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 6 },
  ];

  const myArrow = ({
    type,
    onClick,
    isEdge,
  }: {
    type: string;
    onClick: () => void;
    isEdge: boolean;
  }) => {
    const pointer =
      type === "PREV" ? (
        <div className=" flex items-center justify-center bg-primary w-14 h-14 rounded-full cursor-pointer">
          <Icons.arrow className=" -rotate-180" />
        </div>
      ) : (
        <div className=" flex items-center justify-center bg-primary w-14 h-14 rounded-full cursor-pointer">
          <Icons.arrow />
        </div>
      );
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  };

  return (
    <article>
      <div className=" text-4xl font-semibold tracking-tighter text-primary mb-6 mt-5">
        Trending Now
      </div>
      {/* @ts-ignore */}
      <ReactElasticCarousel
        ref={ref}
        disableArrowsOnEnd={false}
        onNextStart={next}
        // showArrows={false}
        pagination={false}
        onPrevEnd={prev}
        breakPoints={breakPoints}
        renderArrow={myArrow}
      >
        {[...trending, ...trending].map(({ image }, idx) => {
          return <img src={image} alt="" className="h-40 w-36 rounded-3xl" />;
        })}
      </ReactElasticCarousel>
    </article>
  );
}
