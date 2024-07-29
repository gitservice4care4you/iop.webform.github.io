"use client";
import { CacheProvider } from "@emotion/react";
import { useLocale } from "next-intl";
import React from "react";
import caches from "@/hooks/useCacheHook";
/**
 * A React component that provides a CacheProvider for the current locale, ensuring that the appropriate cache (RTL or LTR) is used for rendering.
 *
 * This component is used to wrap the application or specific parts of the application that require different caching strategies based on the user's locale.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the CacheProvider.
 * @returns {React.ReactElement} - The CacheProviderRTL component.
 */

const { rtlCache, ltrCache } = caches;
type Props = {
  children: React.ReactNode;
};
function CacheProviderRTL({ children }: Props) {
  /**
   * Renders a `CacheProvider` component with the appropriate cache value based on the current locale.
   *
   * If the current locale is "ar" or "fa", the `rtlCache` is used, otherwise the `ltrCache` is used.
   *
   * @param {React.ReactNode} children - The child components to render within the `CacheProvider`.
   * @returns {React.ReactElement} - The `CacheProvider` component with the appropriate cache value.
   */
  const currentLocale = useLocale();
  const rtl = currentLocale === "ar" || currentLocale === "fa" ? true : false;
  return (
    <CacheProvider value={rtl ? rtlCache : ltrCache}>{children}</CacheProvider>
  );
}

export default CacheProviderRTL;
