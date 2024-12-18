"use client";

// Data
import { getAllLines } from "@/data";
import { useStations } from "@/app/contexts/StationsContext";

import { useRouter } from "next/navigation";

import { toFarsiNumber } from "@/app/utils/toFarsiNumber";

function StationPage({ params }) {
  const { stations, loading, error } = useStations();

  const router = useRouter();

  const lineID = params.id;

  const lines = getAllLines();
  const filteredStations = stations.filter((station) => {
    return station.lineNumber == lineID;
  });

  const line = lines.find((line) => {
    return line.id == filteredStations[0]?.lineNumber;
  });

  if (loading)
    return <div className="w-fit mx-auto mt-16">در حال بارگذاری...</div>;
  if (error)
    return <div className="w-fit mx-auto mt-16">خطا: {error.message}</div>;

  return (
    <div className="mt-16 max-w-[400px] mx-auto w-4/5">
      <h3 className="p-4 text-2xl bg-white text-black font-semibold w-2/3 mx-auto rounded-t-2xl -mb-3 text-center">
        {toFarsiNumber(line.label)}
      </h3>
      <div
        style={{ backgroundColor: `${line.color}80` }}
        className=" p-8 space-y-4 rounded-2xl backdrop-blur-2xl"
      >
        {filteredStations.map((station) => (
          <div
            key={station.stationCode}
            onClick={() =>
              router.push(
                `/next-arrivals/result?station=${station?.stationCode}`
              )
            }
            className="border p-4 rounded-2xl cursor-pointer"
          >
            {station.stationName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StationPage;
