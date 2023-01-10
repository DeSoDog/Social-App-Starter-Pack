import { Aside, MediaQuery, Text } from "@mantine/core";

export default function MantineSideBar() {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 250 }}>
        <Text>Application sidebar</Text>
      </Aside>
    </MediaQuery>
  );
}
