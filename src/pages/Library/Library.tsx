import {
  Button,
  Text,
  Container,
  Paper,
  Flex,
  SimpleGrid,
} from "@mantine/core";
import { useSheetQuery } from "../../useSheetQuery";
import { CharacterSheet } from "../../CharacterSheet";

export default function Library() {
  const sheets = useSheetQuery();

  const card = (sheet: CharacterSheet) => (
    <Paper shadow="xs" p="sm">
      <Text size="xl">{sheet.name}</Text>
      <Text size="md" c="dimmed">
        {sheet.playerName}
      </Text>
    </Paper>
  );
  const cards = sheets.map(card);

  return (
    <Container p="md">
      <Flex style={{ marginBottom: 16 }}>
        <Button component="a" href="./create">
          Create
        </Button>
      </Flex>
      <SimpleGrid cols={4}>{cards}</SimpleGrid>
    </Container>
  );
}
