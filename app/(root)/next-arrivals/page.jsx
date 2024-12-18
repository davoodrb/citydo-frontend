"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@mui/material";

import SelectStation from "@/components/UI/SelectStation";

import { getAllLines } from "@/data";
import { useStations } from "@/app/contexts/StationsContext";

import { toast } from "react-toastify";

function NextTrainArrivalPage() {
  const router = useRouter();

  const { stations, loading, error } = useStations();

  const [station, setStation] = useState({ stationName: "" });
  const [selectedLine, setSelectedLine] = useState(1);

  const stationsData = stations;
  const linesData = getAllLines();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (station.stationCode) {
      router.push(`/next-arrivals/result?station=${station.stationCode}`);
    } else {
      toast.warn("ایستگاه را انتخاب کنید!", {
        position: "bottom-right",
      });
    }
  };

  if (loading)
    return <div className="w-fit mx-auto mt-16">در حال بارگذاری...</div>;
  if (error)
    return <div className="w-fit mx-auto mt-16">خطا: {error.message}</div>;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="my-16 flex items-center justify-center flex-col w-10/12 max-w-[300px] mx-auto"
      >
        <p className="w-[90%] text-right m-4 text-xl font-semibold">
          محاسبه‌گر زمان رسیدن قطار به ایستگاه
        </p>

        <SelectStation
          stationsData={stationsData}
          linesData={linesData}
          station={station}
          setStation={setStation}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />

        <br />

        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: 3,
            width: "90%",
            maxWidth: "400px",
            height: "50px",
          }}
        >
          کی می‌رسه؟
        </Button>
      </form>
    </>
  );
}

export default NextTrainArrivalPage;
