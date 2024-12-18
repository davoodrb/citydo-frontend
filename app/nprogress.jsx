"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NProgressBar() {
  return (
    <ProgressBar
      height="4px"
      color="#ffb703"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
