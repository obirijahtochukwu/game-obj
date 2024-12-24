import React, { useState, useEffect } from "react";
import Hands from "./hands";
import Result from "../utils";
import { useBlackJackContext } from "../context";
export default function Game() {
  const { gameOver, result } = useBlackJackContext();

  return (
    <>
      {gameOver && <Result result={result} />}

      <Hands />
    </>
  );
}
