/**
 * Provides two Emotion caches, one for right-to-left (RTL) and one for left-to-right (LTR) text direction.
 * The RTL cache uses the `stylis-plugin-rtl` plugin to handle RTL styles, while the LTR cache does not.
 * These caches can be used to ensure consistent styling across different text directions in an application.
 */
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
