export interface Trait {
  id: TraitId;
  name: string;
  category: string;
  cost: TraitCost;
  description: string[];
  incompatible?: TraitId[];
  subtrait?: SubtraitParent[];
  tags?: TraitTag[];
}

export type TraitId = string;
export type TraitTag = string;
export type TraitCost = ConditionalCosts | SingleCost;

export type SingleCost = BaseCost & ExtendedCost;

type BaseCost = {
  hunger?: number;
};

type ExtendedCost = { cute?: number; creep?: number } | { cute_or_creep: number };

export type ConditionalCosts = {
  [name: string]: SingleCost;
};

export type SubtraitParent = 'standalone' | 'any' | TraitId;
