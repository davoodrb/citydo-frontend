"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toFarsiNumber } from "./utils/toFarsiNumber";

function NotFoundPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => (prevCount != 0 ? prevCount - 1 : prevCount));
    }, 1000);

    setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center font-semibold text-2xl w-4/6 mx-auto flex h-screen items-center justify-center">
      <div>
        <p className="leading-10">صفحه‌ای دنبالش می‌گردی رو پیدا نکردم! 💔</p>
        <p className="mt-16 text-base">
          انتقال به صفحه‌اصلی در {toFarsiNumber(countdown)} ثانیه
        </p>
        <Link href="/">
          <p className="text-base block mt-4 underline">برو صفحه اصلی</p>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
