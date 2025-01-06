import { CharacterSheet } from "./CharacterSheet";
import { parse, stringify } from "./utils/map";

const SHEETS_KEY: string = "sheets";

export function useSheetQuery(): CharacterSheet[] {
  const storeMap = getMap<CharacterSheet>(SHEETS_KEY);
  return [...storeMap.values()];
}

type StoreMap<T> = Map<string, T>;

function getMap<T>(key: string): StoreMap<T> {
  const serialized = localStorage.getItem(key);
  return (serialized) ? parse(serialized) : new Map<string, T>();
}

export function saveSheet(sheet: CharacterSheet) {
  const storeMap = getMap<CharacterSheet>(SHEETS_KEY);
  storeMap.set(sheet.key, sheet);
  localStorage.setItem(SHEETS_KEY, stringify(storeMap));
}

