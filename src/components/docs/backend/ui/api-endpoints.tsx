import React from "react";
import Title from "../../ui/title";
import Text from "../../ui/text";
import Subtitle from "../../ui/subtitle";
import { routeEndpoints } from "../../mock-data";

export default function ApiEndpoints() {
  return (
    <div className="mt-8">
      <Title text="API Endpoints" />
      {routeEndpoints.map(({ name, data }) => (
        <>
          <Text text={name + " API"} classname=" font-bold capitalize" />
          <main className="custom-scrollbar mb-8 w-full overflow-x-auto">
            <div className="w-[700px]">
              <div className="mt-4 grid grid-cols-3 gap-8 border-y-[1px] border-grey py-3">
                {["Method", "Endpoint", "Description"].map((name) => (
                  <Subtitle text={name} classname=" " />
                ))}
              </div>
              {data.map(({ method, description, endpoint }) => (
                <div className="grid grid-cols-3 gap-8 border-b border-grey py-3">
                  <Text text={method} classname=" " />
                  <Text text={endpoint} classname=" bg-black/10 px-2 py-1 h-fit w-fit rounded-md font-semibold" />
                  <Text text={description} classname="" />
                </div>
              ))}
            </div>
          </main>
        </>
      ))}
      <div id="Running the Server" className="" />
    </div>
  );
}
