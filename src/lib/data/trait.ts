import traitsJson from './content/traits.json';
import type { Trait, TraitId } from '$lib/types/trait';

const traits = traitsJson as Trait[];
const traitMap = new Map<TraitId, Trait>(traits.map((t) => [t.id, t]));

function getTraitById(id: TraitId): Trait | undefined {
  return traitMap.get(id);
}

export { traits, getTraitById };
