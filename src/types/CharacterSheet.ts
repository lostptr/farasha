export interface CharacterSheet {
  key: string;
  name?: string;
  playerName?: string;
  description?: string;
  size?: BugSize;
}

export type BugSize = "small" | "medium" | "large";

export interface TemplateStats {
  might: number;
  insight: number;
  shell: number;
  grace: number;
  heart: number;
  stamina: number;
  soul: number;
  cute: number;
  spook: number;
  bonusCuteSpook: number;
  speed: number;
  hungerStart: number;
  hungerMax: number;
}

export const BLANK_STATS: TemplateStats = {
  might: 0,
  insight: 0,
  shell: 0,
  grace: 0,
  heart: 0,
  stamina: 0,
  soul: 0,
  cute: 0,
  spook: 0,
  bonusCuteSpook: 0,
  speed: 0,
  hungerStart: 0,
  hungerMax: 0,
};

export const BASE_STATS: { [key in BugSize]: TemplateStats } = {
  small: {
    might: 2,
    insight: 3,
    shell: 3,
    grace: 4,
    heart: 6,
    stamina: 3,
    soul: 3,
    cute: 1.5,
    spook: 1,
    bonusCuteSpook: 1,
    speed: 7,
    hungerStart: -1,
    hungerMax: 15,
  },
  medium: {
    might: 3,
    insight: 3,
    shell: 3,
    grace: 3,
    heart: 7,
    stamina: 3,
    soul: 3,
    cute: 1,
    spook: 1,
    bonusCuteSpook: 1.5,
    speed: 6,
    hungerStart: 4,
    hungerMax: 20,
  },
  large: {
    might: 4,
    insight: 3,
    shell: 4,
    grace: 2,
    heart: 8,
    stamina: 3,
    soul: 3,
    cute: 1,
    spook: 1.5,
    bonusCuteSpook: 1,
    speed: 5,
    hungerStart: 9,
    hungerMax: 25,
  },
};
