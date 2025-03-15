import React, { useEffect, useRef, useState } from "react";
import { Buttons } from "../../../ui/buttons";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";
import { Ad } from "../../../../lib/types";
import { getImagePath } from "./../../../../lib/utils";
import CarouselLoader from "./carousel-loader";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cardWidth = window?.innerWidth > 500 ? 400 : 320;

  // Fetch ads data
  useEffect(() => {
    axios
      .get(backend_api + "/get-ads")
      .then((res) => {
        setAds(res.data.reverse());
        setIsLoading(false);
      })
      .catch((res) => setIsLoading(false));
  }, []);

  // Calculate visible cards based on container width
  useEffect(() => {
    const calculateVisibleCards = () => {
      if (targetRef.current) {
        const width = targetRef.current.offsetWidth;
        setContainerWidth(width);
        // const cardWidth = cardWidth;
        const gap = 16;
        const calculatedVisibleCards = Math.floor(width / (cardWidth + gap));
        setVisibleCards(calculatedVisibleCards);
      }
    };

    calculateVisibleCards(); // Initial calculation
    window.addEventListener("resize", calculateVisibleCards);

    return () => window.removeEventListener("resize", calculateVisibleCards);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        const maxIndex = ads.length - visibleCards;
        return nextIndex > maxIndex ? 0 : nextIndex; // Reset to 0 if at the end
      });
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [ads.length, visibleCards]);

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="flex w-full overflow-hidden">
        <CarouselLoader />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Container */}
      <div ref={targetRef} className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + 16)}px)`, // Use pixel value for translation
          }}
        >
          {ads?.map((card) => (
            <div
              key={card._id}
              style={{ width: cardWidth, marginRight: 16 }} // Fixed width, margin for gap
              className={`grid h-52 flex-shrink-0 grid-cols-12 gap-3 rounded-lg bg-md p-3 font-advance text-white md:h-60`}
            >
              <img src={card.image} className="col-span-5 h-full object-contain sm:col-span-7" />
              <div className="col-span-7 flex flex-col sm:col-span-5">
                <div className="mb-2 w-max rounded-sm border border-pink px-2 text-xs italic tracking-wider">Exclusive Deal</div>
                <div className="font-poppins text-base first-letter:uppercase sm:text-xl sm:font-semibold">{card.title}</div>
                <div className="text-sm font-light tracking-wider text-grey first-letter:uppercase sm:font-medium">
                  {card.description}
                </div>
                <Buttons.primary onClick={() => window.open(card?.link, "_blank", "noopener,noreferrer")} classname="mt-auto">
                  Play Now
                </Buttons.primary>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators (Dots) */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(ads.length / visibleCards) }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? "bg-gradient-custom" : "bg-primary"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
