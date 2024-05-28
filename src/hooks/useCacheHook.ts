import createCache, { EmotionCache } from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const rtlCache: EmotionCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache: EmotionCache = createCache({
  key: "mui",
});

const caches = {
  rtlCache: rtlCache,
  ltrCache: ltrCache,
};

export default caches;
