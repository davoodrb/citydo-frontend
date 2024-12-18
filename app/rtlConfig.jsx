"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function Rtl({ children }) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}

export default Rtl;
