import React, { useEffect, useRef, useState } from "react";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Details from "./ui/details";
import { BallManager } from "./game/classes/BallManager";
import { baseURL } from "../../../lib/paths";
import axios from "axios";
import { predict } from "../../../lib/predict";

export default function Plinko() {
  const [rows, setRows] = useState(16);
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        // ts-ignore
        rows,
        canvasRef.current as unknown as HTMLCanvasElement
      );
      setBallManager(ballManager);
    }
  }, [canvasRef, rows]);

  const handleClick = async () => {
    if (ballManager) {
      ballManager.addBall(predict().point);
      console.log(predict().point);
    }
  };

  const props = { rows, setRows, handleClick };

  return (
    <article>
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings {...props} />
          <main className="h-[600px] w-[calc(100%-384px)] bg-advance rounded-3xl">
            <canvas ref={canvasRef} width="700" height="700"></canvas>
          </main>
        </div>
        <div className=" bg-advance h-16 flex items-center justify-between px-8 text-primary text-2xl font-semibold rounded-b-3xl">
          Webet <Icons.expand className=" cursor-pointer" />
        </div>
      </section>
      <Details />
    </article>
  );
}
