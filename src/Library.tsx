import {
  Button,
  Text,
  Container,
  Paper,
  Flex,
  SimpleGrid,
} from "@mantine/core";

export default function Library() {
  const card = (
    <Paper shadow="xs" p="sm">
      <Text size="xl">Mrs. Blackwood</Text>
      <Text size="md" c="dimmed">
        Milestone 1
      </Text>
    </Paper>
  );
  const cards = [...Array(5).keys()].map(() => card);

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
