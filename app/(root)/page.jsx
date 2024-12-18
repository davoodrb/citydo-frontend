import Image from "next/image";
import Link from "next/link";

// mui
import { Button } from "@/components/UI/externals";

export default function Home() {
  return (
    <div className="x-screen overflow-x-hidden">
      <div className="mt-4 md:mt-24 w-[90%] max-w-[800px] mx-auto">
        <section className="md:flex justify-between items-center text-2xl">
          <div>
            <h1 className="text-primary text-3xl leading-[3rem] font-semibold">
              اگـه بدویـی،
              <br />
              مـیرسی!
            </h1>

            <div className="mt-6 w-[200px] space-y-3">
              <Button
                component={Link}
                href="/travel-time"
                sx={{ width: "100%" }}
                variant="contained"
              >
                محاسبه زمان سفر
              </Button>

              <Button
                component={Link}
                href="/next-arrivals"
                sx={{ width: "100%" }}
                color="inherit"
                variant="outlined"
              >
                زمان ورود قطار
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-end mt-12 md:mt-0">
              <Image
                src="/images/train-vector.png"
                className="block -ml-10"
                width={500}
                height={500}
                alt="train-vector"
              />
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-[150px]">
          <h1 className="text-primary text-2xl font-semibold">چرا سیتی‌دو؟</h1>
          <div className="mx-4">
            <div className="mt-6 bg-black/20 p-4 shadow-2xl rounded-2xl backdrop-blur-3xl hover:bg-black/30 hover:scale-105 transition-all">
              <h3 className="text-lg font-semibold">تخمین زمان ورود قطار </h3>
              <p className="text-justify mt-2 mx-6 text-gray-300">
                سیتی‌دو برات محاسبه میکنه که چقدر باید منتظر بمونی تا قطار به
                ایستگاه برسه!
              </p>
            </div>
            <div className="mt-6 bg-black/20 p-4 shadow-2xl rounded-2xl backdrop-blur-3xl hover:bg-black/30 hover:scale-105 transition-all">
              <h3 className="text-lg font-semibold">تخمین مدت سفر</h3>
              <p className="text-justify mt-2 mx-6 text-gray-300">
                سیتی‌دو برات تخمین می‌زنه که اگه سوار قطار شدی، چه زمانی به
                مقصدت می‌رسی.
              </p>
            </div>
            <div className="mt-6 bg-black/20 p-4 shadow-2xl rounded-2xl backdrop-blur-3xl hover:bg-black/30 hover:scale-105 transition-all">
              <h3 className="text-lg font-semibold">آخرین آپدیت ایستگاه‌ها</h3>
              <p className="text-justify mt-2 mx-6 text-gray-300">
                سیتی‌دو بر اساس آخرین لیست ایستگاه‌های شهر تهران ساخته شده و
                آپدیت می‌شود.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mt-16 flex flex-col gap-4">
            <Button
              component={Link}
              href="/stations"
              sx={{ width: "100%" }}
              variant="contained"
            >
              لیست ایستگاه‌های مترو تهران
            </Button>
            <Button
              component={Link}
              href="/contactus"
              sx={{ width: "100%" }}
              variant="outlined"
              color="inherit"
            >
              تماس باما
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
