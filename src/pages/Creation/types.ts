import { CharacterSheet } from "@types";


export interface StepProps {
  sheet: CharacterSheet;
  setSheet: React.Dispatch<React.SetStateAction<CharacterSheet>>;
  onBackPressed: () => void;
  onNextPressed: () => void;
}