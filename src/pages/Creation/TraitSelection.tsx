import { useEffect, useState } from "react";
import { CharacterSheet } from "../../CharacterSheet";
import { TextInput } from "@mantine/core";

interface Props {
  sheet: CharacterSheet;
  setSheet: React.Dispatch<React.SetStateAction<CharacterSheet>>;
}

export default function TraitSelection({ sheet, setSheet }: Props) {
  const [playerName, setPlayerName] = useState(sheet.playerName);
  useEffect(() => {
    setSheet({
      ...sheet,
      playerName,
    });
  }, [playerName]);

  return (
    <>
      <p>editing sheet {sheet.key}</p>

      <TextInput
        value={playerName}
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
    </>
  );
}
