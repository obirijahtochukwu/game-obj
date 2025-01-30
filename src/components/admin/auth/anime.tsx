import React, { useEffect } from "react";
import "./DarkThemeBackground.css";

const UniverseBackground = () => {
  useEffect(() => {
    // Generate twinkling stars
    const starsContainer = document.querySelector(".stars-container");
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${Math.random() * 3 + 1}px`; // Random size (1px to 4px)
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`; // Random vertical position
      star.style.left = `${Math.random() * 100}%`; // Random horizontal position
      star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random animation speed
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="universe-bg">
      <div className="stars-container"></div>
    </div>
  );
};

export default UniverseBackground;
