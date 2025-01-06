export interface CharacterSheet {
  key: string;
  name?: string;
  playerName?: string;
}

export function createBlankSheet(): CharacterSheet {
  return {
    key: crypto.randomUUID(),
  };
}