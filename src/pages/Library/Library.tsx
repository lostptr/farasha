import {
  Button,
  Text,
  Container,
  Paper,
  Flex,
  SimpleGrid,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { CharacterSheet } from "../../types/CharacterSheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdOutlineMoreVert } from "react-icons/md";
import { removeSheet } from "@store/library";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Dialog } from "@components";

export default function Library() {
  const navigate = useNavigate();
  const sheets = useSelector((state: RootState) => state.library.sheets);
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedSheet, setSelectedSheet] = useState("");
  const promptDeletion = (key: string) => {
    // TODO: refactor this confirmation prompt into something more elegant like this:
    // const op: boolean = await confirm("Are you sure?", "This cannot be undone!!!");
    setSelectedSheet(key);
    open();
  };

  const deleteSheet = (option: boolean) => {
    if (option) {
      dispatch(removeSheet({ key: selectedSheet }));
    }
    close();
  };

  const card = (sheet: CharacterSheet) => (
    <Paper shadow="xs" p="sm" key={sheet.key}>
      <div style={{ display: "flex" }}>
        <Text size="xl" style={{ flexGrow: 1 }}>
          {sheet.name}
        </Text>
        <Menu shadow="md" width={150} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="transparent" color="white">
              <MdOutlineMoreVert />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              color="red"
              leftSection={<MdDeleteForever />}
              onClick={() => promptDeletion(sheet.key)}
            >
              Delete sheet
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Text></Text>
      </div>
      <Text size="md" c="dimmed">
        {sheet.playerName}
      </Text>
    </Paper>
  );
  const cards = sheets.map(card);

  return (
    <Container p="md">
      <Flex style={{ marginBottom: 16 }}>
        <Button onClick={() => navigate("./create")}>Create</Button>
      </Flex>
      <SimpleGrid cols={4}>{cards}</SimpleGrid>

      <Dialog
        opened={opened}
        title="Are you sure?"
        message="This action cannot be undone!"
        onSubmit={deleteSheet}
        confirmMessage="Yes, delete it"
      ></Dialog>
    </Container>
  );
}
