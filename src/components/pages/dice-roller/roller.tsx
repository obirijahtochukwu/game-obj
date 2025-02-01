import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [roll, setRoll] = useState(null); // Stores the current dice roll
  const [isRolling, setIsRolling] = useState(false); // Tracks if the dice is rolling

  const rollDice = () => {
    if (isRolling) return; // Prevent multiple rolls at once

    setIsRolling(true);
    setRoll(null);

    // Generate a random number between 1 and 6
    const randomRoll = Math.floor(Math.random() * 6) + 1;

    // Wait for the animation to finish before displaying the result
    setTimeout(() => {
      setRoll(randomRoll);
      setIsRolling(false);
    }, 2000); // Match the duration of the CSS animation
  };

  return (
    <div className="App">
      <h1>3D Dice Roll</h1>
      <div className={`dice ${isRolling ? "rolling" : ""}`} data-roll={roll}>
        <div className="face front">8 1</div>
        <div className="face back">2</div>
        <div className="face right">3</div>
        <div className="face left">4</div>
        <div className="face top">5</div>
        <div className="face bottom">6</div>
      </div>
      <button onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
      {roll && <p className="result">You rolled a {roll}!</p>}
    </div>
  );
};

export default App;
