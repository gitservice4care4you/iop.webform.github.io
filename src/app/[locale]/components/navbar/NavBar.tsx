"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SpaIcon from "@mui/icons-material/Spa";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import useAppBarHooks from "../../../../hooks/useNavBarHook";
import useLogin from "@/hooks/useLoginHook";
import LanguageSelector from "../select/language_selector/LanguageSelector";
import { useLocale, useTranslations } from "next-intl";
import path from "path";
import { Stack } from "@mui/material";
interface Pages {
  id: number;
  displayName: string;
  pathName: string;
}

function ResponsiveAppBar() {
  const t = useTranslations("Navbar");
  const currentLocale = useLocale();
  const pages: Pages[] = [
    // { id: 1, displayName: t("home"), pathName: "home" },
    { id: 2, displayName: t("form"), pathName: "form" },
    { id: 3, displayName: t("support"), pathName: "support" },
    // { id: 4, displayName: t("about"), pathName: "about" },
  ];
  const settings = ["Logout"];
  const pathname = usePathname();

  const loginHook = useLogin();
  const router = useRouter();

  const {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
  } = useAppBarHooks();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "7.83vh",
          }}
        >
          {/* Logo */}
          {logoDesktop()}
          {/* Mobile menu button */}
          {mobileMenuButton()}
          {/* Mobile Logo */}
          {logoMobile()}
          {/* Desktop NavLinks */}
          {DesktopNavLinks()}
          <LanguageSelector />{" "}
        </Toolbar>
      </Container>
    </AppBar>
  );

  /**
   * Generates the URL path for the current page based on the current locale.
   *
   * If the current page is the "home" page, the URL path will be just the current locale (e.g. "/en").
   * Otherwise, the URL path will be the current locale followed by the page path name (e.g. "/en/about").
   *
   * @param currentLocale - The current locale, e.g. "en", "fr", "es", etc.
   * @param page - An object containing the path name of the current page.
   * @returns The generated URL path for the current page.
   */
  function getPath(page: Pages): string {
    return page.pathName === "form"
      ? `/${currentLocale}`
      : `/${currentLocale}/${page.pathName}`;
  }

  function isCurrentPageSelected(currentPage: string): boolean {
    /**
     * Determines whether the current page matches the provided pathname.
     *
     * @param currentPage - The current page being displayed.
     * @param currentLocale - The current locale being used.
     * @param pathname - The pathname to compare the current page against.
     * @returns `true` if the current page matches the provided pathname, `false` otherwise.
     */
    currentPage === "form"
      ? (currentPage = `/${currentLocale}`)
      : (currentPage = `/${currentLocale}/${currentPage}`);

    if (currentPage === pathname) {
      return true;
    } else {
      return false;
    }
  }

  function userAvatar() {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center" fontSize={16}>
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }

  function DesktopNavLinks() {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          height: "100%",
        }}
      >
        {pages.map((page: Pages, index: number) => (
          <Link
            key={index}
            shallow={true}
            href={getPath(page)}
            style={{ textDecoration: "none" }}
          >
            <Box
              width={95}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                backgroundColor: isCurrentPageSelected(page.pathName)
                  ? "background.default"
                  : null,
                height: "100%", // Add this line
                cursor: "pointer",
              }}
            >
              <Button
                key={page.id}
                onClick={(_e) => {
                  router.push(getPath(page), { scroll: false });
                }}
                disableRipple
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                  my: 2,
                  color: isCurrentPageSelected(page.pathName)
                    ? "primary"
                    : "background.default",
                  textTransform: "capitalize",
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "semi-bold",
                  letterSpacing: "1px",
                  height: "100%",
                }} // Add this line }}
              >
                {" "}
                {page.displayName}
              </Button>
            </Box>
          </Link>
        ))}
      </Box>
    );
  }

  function logoMobile() {
    return (
      <>
        <SpaIcon
          sx={{
            display: { xs: "flex", md: "none" },
            me: 1,
            width: "35px",
            height: "35px",
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
          }}
        ></Box>
        {/* <Typography
          variant="h4"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,

            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          IOP
        </Typography> */}
      </>
    );
  }

  function logoDesktop() {
    return (
      <>
        <SpaIcon
          sx={{
            display: { xs: "none", md: "flex" },
            marginInlineEnd: "10px",
            width: "35px",
            height: "35px",
            // flexGrow: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
          }}
        ></Box>
        {/* <Typography
          variant="h4"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            // fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          IOP
        </Typography> */}
      </>
    );
  }

  function mobileMenuButton() {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          alignItems: "start",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={(_e) => {
            handleCloseNavMenu();
          }}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page: Pages, index) => (
            <MenuItem
              key={page.id}
              onClick={() => {
                handleCloseNavMenu();
              }}
            >
              <Typography key={index} textAlign="center">
                <Link href={getPath(page)}>{page.displayName}</Link>
              </Typography>
            </MenuItem>
          ))}
        </Menu>
        <Box
          sx={{
            flexGrow: 1,
          }}
        ></Box>
      </Box>
    );
  }
}
export default ResponsiveAppBar;
