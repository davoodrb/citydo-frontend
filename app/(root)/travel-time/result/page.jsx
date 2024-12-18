"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useCallback } from "react";

// utils
import { toFarsiNumber } from "@/app/utils/toFarsiNumber";

// icons
import EditIcon from "@mui/icons-material/Edit";

// component
import BasicTimeLine from "@/components/UI/BasicTimeLine";

// api
import { useStations } from "@/app/contexts/StationsContext";
import { getWaitTimeApi } from "@/app/utils/api";

const findStationById = (stations, id) => {
  const station = stations.find(
    (station) => station.stationCode === parseInt(id, 10)
  );
  return station;
};

const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { stations: stationsData, loading, error } = useStations();
  const [waitTimes, setWaitTimes] = useState([]);
  const [currentTimeInMinutes, setCurrentTimeInMinutes] = useState(
    getCurrentTimeInMinutes()
  );
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [arrivalTime, setArrivalTime] = useState(null);

  const startCode = searchParams.get("start");
  const endCode = searchParams.get("end");

  const startStation = findStationById(stationsData, startCode);
  const endStation = findStationById(stationsData, endCode);

  const isForwardTravel = useCallback(
    (startId, endId) => {
      const startIndex = stationsData.findIndex(
        (station) => station.stationCode === parseInt(startId, 10)
      );
      const endIndex = stationsData.findIndex(
        (station) => station.stationCode === parseInt(endId, 10)
      );
      return startIndex < endIndex;
    },
    [stationsData]
  );

  const getBaseTimesById = useCallback(
    (id, des) => {
      const station = stationsData.find(
        (station) => station.stationCode === id
      );
      if (station) {
        return des === 1 ? station.baseTime1 : station.baseTime2;
      } else {
        throw new Error("Station not found.");
      }
    },
    [stationsData]
  );

  const convertMinuteTo24Format = (min) => {
    return `${Math.trunc(min / 60)}:${(min % 60).toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchWaitTimes = async () => {
      try {
        const response = await getWaitTimeApi(
          startStation?.lineNumber,
          getBaseTimesById(
            +startCode,
            isForwardTravel(startCode, endCode) ? 1 : 2
          ),
          getBaseTimesById(
            +endCode,
            isForwardTravel(startCode, endCode) ? 1 : 2
          ),
          isForwardTravel(startCode, endCode) ? 1 : 2
        );
        setWaitTimes(response.data);
        if (response.data.length > 0 && response.data[0].length > 0) {
          setArrivalTime(response.data[0][0]);
        }
      } catch (error) {
        console.error("Error fetching wait times:", error);
      }
    };

    if (startCode && endCode) {
      fetchWaitTimes();
    } else {
      router.push("/travel-time");
    }
  }, [
    startCode,
    endCode,
    router,
    stationsData,
    getBaseTimesById,
    isForwardTravel,
    startStation?.lineNumber,
  ]);

  const allStationsInLine = stationsData.filter(
    (station) => station.lineNumber === startStation.lineNumber
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimeInMinutes(getCurrentTimeInMinutes());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTimeClick = (time, index) => {
    setSelectedTimeIndex(index);
    setArrivalTime(time);
  };

  if (loading)
    return <div className="w-fit mx-auto mt-16">در حال بارگذاری...</div>;
  if (error)
    return <div className="w-fit mx-auto mt-16">خطا: {error.message}</div>;

  return (
    <div className="mt-8 w-11/12 overflow-hidden max-w-[500px] mx-auto">
      <div className="px-4 py-2 font-semibold text-xl flex items-center justify-start gap-3">
        <span>
          از {startStation?.stationName} به {endStation?.stationName}
        </span>
        <Link href="/travel-time">
          <EditIcon />
        </Link>
      </div>
      <div className="mt-4">
        <span className="block text-2xl font-semibold">
          زمان‌بندی حرکت قطار
          <br /> از ایستگاه {startStation?.stationName} به سمت{" "}
          {isForwardTravel(startCode, endCode)
            ? allStationsInLine[allStationsInLine.length - 1]?.stationName
            : allStationsInLine[0]?.stationName}
        </span>
        <span className="block text-red-300 mt-2">
          حداقل دو دقیقه قبل از حرکت در ایستگاه باشید!
        </span>
      </div>
      <div className="text-center text-black w-full text-xl flex justify-start gap-4 overflow-x-auto py-4">
        {waitTimes.length > 0 &&
          waitTimes[0]?.map((time, index) => {
            const minutesLeft = time - currentTimeInMinutes;
            return (
              <div
                key={index}
                className={`mt-2 py-6 px-4 rounded-2xl flex-shrink-0 cursor-pointer ${
                  selectedTimeIndex === index ? "bg-yellow-500" : "bg-gray-300"
                }`}
                onClick={() => handleTimeClick(time, index)}
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
        {waitTimes[0]?.length < 5 && (
          <div className="mt-2 py-6 px-4 rounded-2xl flex-shrink-0 cursor-default bg-red-800 text-white">
            <span className="block">
              دیگه قطاری نمیاد! <br />
              بعدا بهمون سر بزن.
            </span>
          </div>
        )}
      </div>
      {waitTimes[0]?.length != 0 && (
        <div className="mt-8">
          <BasicTimeLine
            startStation={startStation?.stationName}
            endStation={endStation?.stationName}
            startArrival={convertMinuteTo24Format(arrivalTime)}
            endArrival={
              waitTimes[1] && waitTimes[1][selectedTimeIndex]
                ? convertMinuteTo24Format(waitTimes[1][selectedTimeIndex])
                : ""
            }
            travelDuration={
              waitTimes[1] && waitTimes[1][selectedTimeIndex]
                ? waitTimes[1][selectedTimeIndex] - arrivalTime
                : ""
            }
          />
          <div className="w-fit mx-auto">
            {waitTimes[1] && waitTimes[1][selectedTimeIndex] && (
              <p>
                {toFarsiNumber(
                  waitTimes[1][selectedTimeIndex] +
                    (arrivalTime - currentTimeInMinutes) -
                    arrivalTime
                )}{" "}
                دقیقه تا مقصد
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ResultPageWithSuspense = () => (
  <Suspense
    fallback={<div className="mx-auto w-fit mt-16">در حال بارگذاری ...</div>}
  >
    <ResultPage />
  </Suspense>
);

export default ResultPageWithSuspense;
