import "@mantine/core/styles.css";
import {
  AppShell,
  MantineProvider,
  Title,
} from "@mantine/core";
import { theme } from "./theme";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell header={{ height: 60 }}>
        <AppShell.Header p="md">
          <Title order={3}>Farasha</Title>
        </AppShell.Header>
        <AppShell.Main bg="var(--mantine-color-dark-8)">
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
