import { CharacterSheet } from "@types";

export function createBlankSheet(): CharacterSheet {
  return {
    key: crypto.randomUUID(),
    name: '',
    playerName: ''
  };
}