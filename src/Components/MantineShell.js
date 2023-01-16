//Using Matine UI to build out frontend.
//Docs: https://mantine.dev/core/app-shell/
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Wallet from "../pages/Wallet";
import Notifications from "../pages/Notifications";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";
import { AppShell, useMantineTheme } from "@mantine/core";

import MantineHeader from "../Components/MantineHeader";
import MantineNavBar from "../Components/MantineNavBar";
import MantineFooter from "../Components/MantineFooter";
import MantineSideBar from "../Components/MantineSideBar";

export default function MantineShell() {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<MantineNavBar />}
      aside={<MantineSideBar />}
      footer={<MantineFooter />}
      header={<MantineHeader />}
    >
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AppShell>
  );
}
