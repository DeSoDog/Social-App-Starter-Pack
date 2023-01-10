import { Footer, Button, Tooltip } from "@mantine/core";
import { IconLogout } from "@tabler/icons";



export default function MantineFooter() {
  return (
    <Footer height={60} p="md">
      <Tooltip position="right" label="Logout">
        <Button>
          <IconLogout size="md" color="gray" />
        </Button>
      </Tooltip>
    </Footer>
  );
}
