import React, { useEffect, useRef, useState } from "react";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Details from "./ui/details";
import { BallManager } from "./game/classes/BallManager";
import { baseURL } from "../../../lib/paths";
import axios from "axios";
import { predict } from "../../../lib/predict";

export default function Plinko() {
  const [setting, setSetting] = useState(false);
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
    try {
      const response = await axios.post("http://localhost:5000/plinko", {
        data: 1,
      });
      console.log(response);

      if (ballManager) {
        ballManager.addBall(response.data.point);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const props = { rows, setRows, handleClick, setting, setSetting };

  return (
    <article>
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings {...props} />
          <main className="sm:h-[700px] h-96 w-full lg:w-[calc(100%-384px)] bg-advance rounded-3xl relative flex justify-center">
            <Icons.setting
              onClick={() => setSetting(!setting)}
              className=" absolute top-4 left-4 z-10 lg:hidden cursor-pointer"
            />
            <canvas
              ref={canvasRef}
              width="700"
              height="700"
              className=" max-sm:scale-[0.9] scale-90 relative -left-6"
            ></canvas>
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
