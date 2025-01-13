import { TextInput } from "@mantine/core";
import { CharacterSheet } from "../../types/CharacterSheet";
import { useEffect, useState } from "react";

interface Props {
  sheet: CharacterSheet;
  setSheet: React.Dispatch<React.SetStateAction<CharacterSheet>>;
}

export default function GeneralInfo({ sheet, setSheet }: Props) {
  const [name, setName] = useState(sheet.name);

  useEffect(() => {
    setSheet({
      ...sheet,
      name
    });
  }, [name])

  return (
    <>
      <p>editing sheet {sheet.key}</p>

      <TextInput
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
    </>
  );
}
