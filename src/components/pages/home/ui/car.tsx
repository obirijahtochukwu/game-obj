import React, { useEffect, useRef, useState } from "react";
import { Buttons } from "../../../ui/buttons";
import { Icons } from "../../../ui/icons";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0); // Store container width

  const cards = [
    {
      id: 1,
      title: "Exclusive Deal",
      subtitle: "Big Bass Boom",
      description: "Try Pragmatic's newest Enhanced RTP creation, Big Bass..",
      bg: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "Exclusive Deal",
      subtitle: "Big Bass Boom",
      description: "Try Pragmatic's newest Enhanced RTP creation, Big Bass..",
      bg: "bg-gradient-to-r from-green-500 to-teal-500",
    },
    {
      id: 3,
      title: "Exclusive Deal",
      subtitle: "Big Bass Boom",
      description: "Try Pragmatic's newest Enhanced RTP creation, Big Bass..",
      bg: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "Exclusive Deal",
      subtitle: "Big Bass Boom",
      description: "Try Pragmatic's newest Enhanced RTP creation, Big Bass..",
      bg: "bg-gradient-to-r from-pink-500 to-yellow-500",
    },
  ];

  useEffect(() => {
    const calculateVisibleCards = () => {
      if (targetRef.current) {
        const width = targetRef.current.offsetWidth;
        setContainerWidth(width); // Update container width
        const cardWidth = 400;
        const gap = 16;
        const calculatedVisibleCards = Math.floor(width / (cardWidth + gap));
        setVisibleCards(calculatedVisibleCards);
      }
    };

    calculateVisibleCards(); // Initial calculation
    window.addEventListener("resize", calculateVisibleCards);

    return () => window.removeEventListener("resize", calculateVisibleCards);
  }, []);

  const cardWidthPercentage = (400 / containerWidth) * 100; // Calculate percentage based on 400px fixed width

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      const maxIndex = cards.length - visibleCards;
      return Math.min(nextIndex, maxIndex);
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      return Math.max(0, prevIndex - 1);
    });
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const visibleCardsIndices = Array.from({ length: visibleCards }, (_, i) => i); // Indices of visible cards

  return (
    <div ref={targetRef} className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (400 + 16)}px)`, // Use pixel value for translation
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            style={{ width: 400, marginRight: 16 }} // Fixed width, margin for gap
            className={`bg-md grid h-60 flex-shrink-0 grid-cols-12 gap-3 rounded-lg p-3 font-advance text-white`}
          >
            <div className="col-span-5 h-full bg-muted"></div>
            <div className="col-span-7 flex flex-col">
              <div className="mb-1 w-max rounded-sm border border-pink px-2 text-xs italic tracking-wider">Exclusive Deal</div>
              <div className="font-secondary text-lg font-semibold">Big Bass Boom Enhanced RTP</div>
              <div className="text-sm font-medium tracking-wider text-grey">
                Try Pragmatic's newest Enhanced RTP creation, Big Bass..
              </div>
              <Buttons.primary classname="mt-auto">Play Now</Buttons.primary>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {currentIndex == 0 || (
        <Icons.arrow
          onClick={handlePrev}
          className="absolute left-0 top-1/2 ml-5 -translate-y-1/2 rotate-180 cursor-pointer"
          color="white"
        />
      )}
      <Icons.arrow onClick={handleNext} className="absolute right-0 top-1/2 mr-5 -translate-y-1/2 cursor-pointer" color="white" />
    </div>
  );
};

export default Carousel;
