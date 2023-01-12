import { Link } from "react-router-dom";
import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Autocomplete,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MantineThemeButton from "../Components/MantineThemeButton";
import {
  IconBellRinging,
  IconSettings,
  IconReceipt2,
  IconHome2,
  IconUser,
  IconDeviceDesktopAnalytics,
  IconMessages,
  IconSearch,
} from "@tabler/icons";
import { useState } from "react";
import Deso from "deso-protocol";
import { PublicKey } from "../State/App.state";
import { useRecoilState } from "recoil";

const deso = new Deso();

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

//Docs for this NavBar from Mantine UI Header Components - https://ui.mantine.dev/category/headers
//Add BoilerPlate and adjust for your project. Super easy!
export default function MantineHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const [publicKey, setPublicKey] = useRecoilState(PublicKey);
  return (
    <Box pb={5}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Text
            component={Link}
            to="/"
            sx={{ fontWeight: "bold", fontSize: 22, lineHeight: 1.4 }}
          >
            DeSo Template App
          </Text>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              icon={<IconSearch size={16} stroke={1.5} />}
              data={["Deso App Template"]}
            />
          </Group>

          <Group className={classes.hiddenMobile}>
            <MantineThemeButton />

            {publicKey ? (
              <Button
                variant="default"
                onClick={async () => {
                  await deso.identity.logout(publicKey);
                  // eslint-disable-next-line no-restricted-globals
                  location.reload();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={async () => {
                  await deso.identity.login();
                  const loggedInUserKey = deso.identity.getUserKey();
                  setPublicKey(loggedInUserKey);
                }}
              >
                Login
              </Button>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="DeSo Template App"
        size="md"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to="/" className={classes.link}>
            <IconHome2 className={classes.linkIcon} />
            <Text sx={{ marginLeft: 10 }} align="center">
              Home
            </Text>
          </Link>
          <Link to="/profile" className={classes.link}>
            <IconUser />
            <Text sx={{ marginLeft: 10 }} align="center">
              Profile
            </Text>
          </Link>
          <Link to="/discover" className={classes.link}>
            <IconDeviceDesktopAnalytics />
            <Text sx={{ marginLeft: 10 }} align="center">
              Discover
            </Text>
          </Link>
          <Link to="/messages" className={classes.link}>
            <IconMessages />
            <Text sx={{ marginLeft: 10 }} align="center">
              Messages
            </Text>
          </Link>
          <Link to="/notifications" className={classes.link}>
            <IconBellRinging />
            <Text sx={{ marginLeft: 10 }} align="center">
              Notifications
            </Text>
          </Link>
          <Link to="/wallet" className={classes.link}>
            <IconReceipt2 />
            <Text sx={{ marginLeft: 10 }} align="center">
              Wallet
            </Text>
          </Link>
          <Link to="/settings" className={classes.link}>
            <IconSettings />
            <Text sx={{ marginLeft: 10 }} align="center">
              Settings
            </Text>
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <MantineThemeButton />
            {publicKey ? (
              <Button
                variant="default"
                onClick={async () => {
                  await deso.identity.logout(publicKey);
                  // eslint-disable-next-line no-restricted-globals
                  location.reload();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={async () => {
                  await deso.identity.login();
                  const loggedInUserKey = deso.identity.getUserKey();
                  setPublicKey(loggedInUserKey);
                }}
              >
                Login
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
