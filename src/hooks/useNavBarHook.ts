"use client";
import * as React from "react";

const useAppBarHooks = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return {
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
  };
};

export default useAppBarHooks;
