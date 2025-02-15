import { useEffect, useState } from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { StepProps } from "./types";

export default function TraitSelection({ sheet, setSheet, onBackPressed, onNextPressed }: StepProps) {
  const [playerName, setPlayerName] = useState(sheet.playerName);
  useEffect(() => {
    setSheet({
      ...sheet,
      playerName,
    });
  }, [playerName]);
  
  const back = () => {
    onBackPressed();
  };

  const next = () => {
    onNextPressed();
  };


  return (
    <>
      <p>editing sheet {sheet.key}</p>

      <TextInput
        value={playerName}
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
      

        <Group justify="space-between" mt="xl">
          <Button variant="default" onClick={back}>
            Back
          </Button>
          <Button onClick={next}>Next</Button>
        </Group>
 
    </>
  );
}
