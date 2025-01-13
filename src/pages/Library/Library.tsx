import {
  Button,
  Text,
  Container,
  Paper,
  Flex,
  SimpleGrid,
} from "@mantine/core";
import { CharacterSheet } from "../../types/CharacterSheet";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const navigate = useNavigate();
  const sheets = useSelector((state: RootState) => state.library.sheets);

  const card = (sheet: CharacterSheet) => (
    <Paper shadow="xs" p="sm" key={sheet.key}>
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
        <Button onClick={() => navigate("./create")}>
          Create
        </Button>
      </Flex>
      <SimpleGrid cols={4}>{cards}</SimpleGrid>
    </Container>
  );
}
