import Image from "next/image";

function Footer() {
  return (
    <div className="mt-auto">
      <div className="md:flex justify-between items-center bg-[#1976d2] text-white mt-16 p-4 rounded-t-3xl">
        <div className="w-fit h-fit mx-auto md:mx-0 p-2">
          <Image
            src="/images/logo.png"
            width={130}
            height={100}
            alt="citydo-logo"
            priority={true}
          />
          <span>محاسبه‌گر زمان‌بندی حمل‌ونقل عمومی</span>
        </div>
        <span className="text-center text-sm block mt-4">
          Citydo. All rights reserved © 2024
        </span>
      </div>
    </div>
  );
}

export default Footer;
