import Image from "next/image";
import Link from "next/link";

// Data
import { getAllLines } from "@/data";

function StationsPage() {
  const lines = getAllLines();

  return (
    <div className="w-[300px] md:w-[400px] mx-auto mt-16">
      <h3 className="text-xl font-semibold text-center">
        ایستگاه‌ها و خطوط مترو شهر تهران
      </h3>
      <div className="space-y-8 mt-12">
        {lines.map((line) => (
          <Link key={line.id} className="block" href={`/stations/${line.id}`}>
            <div
              style={{
                backgroundColor: `${line.color}90`,
                color: "white",
                boxShadow: `5px 5px ${line.color}`,
              }}
              className="p-4 rounded-2xl cursor-pointer backdrop-blur-2xl hover:scale-105 transition-all flex justify-evenly"
            >
              <div>
                {Number.isInteger(line.id) ? (
                  <Image
                    src={`/images/stations/line_${line.id}.png`}
                    width="0"
                    height="0"
                    sizes="50px"
                    alt="line icon"
                    className="w-full h-auto"
                  />
                ) : (
                 <span className="border p-1 rounded-3xl">انشعابی</span>
                )}
              </div>
              <span>{line.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StationsPage;
