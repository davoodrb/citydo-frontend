"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { toFarsiNumber } from "@/app/utils/toFarsiNumber";

import { useStations } from "@/app/contexts/StationsContext";
import { getStationTimeApi } from "@/app/utils/api";

import EditIcon from "@mui/icons-material/Edit";

const convertMinuteTo24Format = (min) => {
  return `${Math.trunc(min / 60)}:${(min % 60).toString().padStart(2, "0")}`;
};

const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

function NextArrivalsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { stations: stationsData, loading, error } = useStations();
  const [waitTimes, setWaitTimes] = useState(null);
  const [currentTimeInMinutes, setCurrentTimeInMinutes] = useState(
    getCurrentTimeInMinutes()
  );

  const getBaseTimesById = useCallback(
    (id, des) => {
      const station = stationsData.find((station) => station.stationCode == id);
      if (station) {
        return des === 1 ? station.baseTime1 : station.baseTime2;
      } else {
        throw new Error("Station not found.");
      }
    },
    [stationsData]
  );

  const findStationById = useCallback((stations, id) => {
    const station = stations.find(
      (item) => item.stationCode === parseInt(id, 10)
    );
    return station;
  }, []);

  const selectedStationCode = searchParams.get("station");
  const selectedStation = findStationById(stationsData, selectedStationCode);

  const allStationsInLine = stationsData.filter(
    (station) => station.lineNumber === selectedStation?.lineNumber
  );

  useEffect(() => {
    if (!selectedStationCode || !stationsData || stationsData.length === 0)
      return;

    const fetchWaitTimes = async () => {
      try {
        const response = await getStationTimeApi(
          selectedStation.lineNumber,
          getBaseTimesById(selectedStationCode, 1),
          getBaseTimesById(selectedStationCode, 2)
        );
        setWaitTimes(response.data);
      } catch (error) {
        console.error("Error fetching wait times:", error);
      }
    };

    if (/^\d{4}$/.test(selectedStationCode)) {
      fetchWaitTimes();
    } else {
      router.push("/next-arrivals");
    }
  }, [
    selectedStationCode,
    stationsData,
    selectedStation?.lineNumber,
    getBaseTimesById,
    router,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimeInMinutes(getCurrentTimeInMinutes());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading)
    return <div className="w-fit mx-auto mt-16">در حال بارگذاری...</div>;
  if (error)
    return <div className="w-fit mx-auto mt-16">خطا: {error.message}</div>;

  return (
    <>
      <div className="my-8 w-11/12 overflow-hidden max-w-[500px] mx-auto">
        <div className="mt-16 text-2xl font-semibold">
          <h3 className="inline leading-10">
            زمان‌بندی حرکت قطار از ایستگاه
            <br />
            {selectedStation.stationName || "Invalid Station"}
          </h3>
          <Link className="inline p-4" href="/next-arrivals">
            <EditIcon />
          </Link>
        </div>
        <div className="text-xl">
          {selectedStationCode && selectedStationCode.toString()[1] != 1 && (
            <div className="mt-8">
              <p>
                به سمت{" "}
                {allStationsInLine[allStationsInLine.length - 1]?.stationName}
              </p>
              {waitTimes && (
                <div className="text-center text-black w-full text-xl flex justify-start gap-4 overflow-x-auto py-4">
                  {waitTimes["1"].map((time) => {
                    const minutesLeft = time - currentTimeInMinutes;
                    return (
                      <div
                        key={uuidv4()}
                        className="mt-2 py-6 px-4 rounded-2xl flex-shrink-0 cursor-default bg-gray-300"
                      >
                        <span className="block">
                          {toFarsiNumber(convertMinuteTo24Format(time))}
                        </span>
                        {minutesLeft > 0 ? (
                          <span className="block">
                            {toFarsiNumber(minutesLeft)} دقیقه‌ی دیگر
                          </span>
                        ) : minutesLeft === 0 ? (
                          <span className="block">قطار داخل ایستگاهه!</span>
                        ) : (
                          <span className="block">قطار راه افتاده</span>
                        )}
                      </div>
                    );
                  })}
                  {waitTimes["1"].length < 5 && (
                    <div className="mt-2 py-6 px-4 rounded-2xl flex-shrink-0 cursor-default bg-red-800 text-white">
                      <span className="block">
                        دیگه قطاری نمیاد! <br />
                        بعدا بهمون سر بزن.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {selectedStationCode && selectedStationCode.toString()[1] != 2 && (
            <div className="mt-8">
              <p>به سمت {allStationsInLine[0]?.stationName}</p>
              {waitTimes && (
                <div className="text-center text-black w-full text-xl flex justify-start gap-4 overflow-x-auto py-4">
                  {waitTimes["2"].map((time) => {
                    const minutesLeft = time - currentTimeInMinutes;
                    return (
                      <div
                        key={uuidv4()}
                        className="mt-2 py-6 px-4 rounded-2xl flex-shrink-0 cursor-default bg-gray-300"
                      >
                        <span className="block">
                          {toFarsiNumber(convertMinuteTo24Format(time))}
                        </span>
                        {minutesLeft > 0 ? (
                          <span className="block">
                            {toFarsiNumber(minutesLeft)} دقیقه‌ی دیگر
                          </span>
                        ) : minutesLeft === 0 ? (
                          <span className="block">قطار داخل ایستگاهه!</span>
                        ) : (
                          <span className="block">قطار راه افتاده</span>
                        )}
                      </div>
                    );
                  })}
                  {waitTimes["2"].length < 5 && (
                    <div className="mt-2 py-6 px-4 rounded-2xl flex-shrink-0 cursor-default bg-red-800 text-white">
                      <span className="block">
                        دیگه قطاری نمیاد! <br />
                        بعدا بهمون سر بزن.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const NextArrivalsPageSuspense = () => (
  <Suspense
    fallback={<div className="mx-auto w-fit mt-16">در حال بارگذاری ...</div>}
  >
    <NextArrivalsPage />
  </Suspense>
);

export default NextArrivalsPageSuspense;
