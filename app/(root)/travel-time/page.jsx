"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// mui
import { Button } from "@mui/material";
import SelectStation from "@/components/UI/SelectStation";

// Icons
import CachedIcon from "@mui/icons-material/Cached";

// DATA
import { getAllLines } from "@/data";
import { useStations } from "@/app/contexts/StationsContext";

// toast notif
import { toast } from "react-toastify";

function NavigateFormPage() {
  const router = useRouter();

  const { stations, loading, error } = useStations();

  // states for store start and end station
  const [startStation, setStartStation] = useState({ stationName: "" });
  const [endStation, setEndStation] = useState({ stationName: "" });

  const [selectedLine, setSelectedLine] = useState(1);

  // get stations and lines data
  const stationsData = stations;
  const linesData = getAllLines();

  // pushing client to result page after submitting
  const handleSubmit = (event) => {
    event.preventDefault();
    if (startStation.stationCode && endStation.stationCode) {
      if (startStation.stationCode === endStation.stationCode) {
        toast.warn("مبدا و مقصد باید متفاوت باشند!", {
          position: "bottom-right",
        });
      } else if (
        startStation.stationCode.toString()[0] !=
        endStation.stationCode.toString()[0]
      ) {
        toast.warn("در حال حاضر، باید مبدا و مقصد در یک خط باشند!", {
          position: "bottom-right",
        });
      } else {
        router.push(
          `/travel-time/result?start=${startStation.stationCode}&end=${endStation.stationCode}`
        );
      }
    } else if (startStation.stationCode) {
      toast.warn("لطفا مقصد را انتخاب کنید!", {
        position: "bottom-right",
      });
    } else if (endStation.stationCode) {
      toast.warn("لطفا مبدا را انتخاب کنید!", {
        position: "bottom-right",
      });
    } else {
      toast.warn("مبدا و مقصد را مشخص کنید!", {
        position: "bottom-right",
      });
    }
  };

  if (loading)
    return <div className="w-fit mx-auto mt-16">در حال بارگذاری...</div>;
  if (error)
    return <div className="w-fit mx-auto mt-16">خطا: {error.message}</div>;

  return (
    <div className="mt-16 w-10/12 max-w-[300px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col"
      >
        <p className="w-[90%] text-right m-4 text-xl font-semibold">
          ایستگاه مبدا و مقصد را مشخص کنید!
        </p>

        {/* start station */}
        <SelectStation
          stationsData={stationsData}
          linesData={linesData}
          suffix="مبدا"
          station={startStation}
          setStation={setStartStation}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />

        {/* switch */}
        <div id="switchBtn" className="-my-3 w-[90%] z-10 pl-8 text-left">
          <CachedIcon
            onClick={() => {
              const temp = startStation;
              setStartStation(endStation);
              setEndStation(temp);
            }}
            sx={{
              fontSize: "3rem",
              zIndex: 10,
              backgroundColor: "#023047",
              borderRadius: 10,
            }}
          />
        </div>

        {/* end station */}
        <SelectStation
          stationsData={stationsData}
          linesData={linesData}
          suffix="مقصد"
          station={endStation}
          setStation={setEndStation}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />

        <br />

        {/* submit button */}
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
          مسیریابی کن!
        </Button>
      </form>

      <Link
        href="/next-arrivals"
        className="text-sm block my-8 mx-6 leading-6 text-gray-300"
      >
        فقط میخوای بدونی قطار بعدی کی وارد میشه؟ اینجا کلیک کن!
      </Link>
    </div>
  );
}

export default NavigateFormPage;
