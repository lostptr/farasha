<script lang="ts">
  import { resolve } from '$app/paths';
  import { traits } from '$lib/data/trait';
  import type { ConditionalCosts, TraitCost, Trait } from '$lib/types/trait';

  function getNumericCosts(cost: TraitCost): string {
    if (cost.hunger !== undefined) {
      return cost.hunger.toString();
    }

    const hungerCosts = Object.entries(cost as ConditionalCosts).map(([_, c]) => c.hunger ?? 0);

    return `${Math.min(...hungerCosts)}~${Math.max(...hungerCosts)}`;
  }

  function getTraitType(trait: Trait): string {
    if (!trait.subtrait) {
      return 'Trait';
    }
    return trait.subtrait.some((t) => t === 'standalone' || t === trait.id)
      ? 'Trait or Subtrait'
      : 'Subtrait';
  }
</script>

<div>
  traits page

  <div class="table-wrap">
    <table class="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Category</th>
          <th>Cost</th>
          <th>&nbsp;</th>
        </tr>
      </thead>

      <tbody class="[&>tr]:hover:preset-tonal-primary">
        {#each traits as trait}
          <tr>
            <td>
              <span class="badge preset-tonal-primary">
                {getTraitType(trait)}
              </span>
            </td>
            <td>{trait.name}</td>
            <td>{trait.category}</td>
            <td>{getNumericCosts(trait.cost)}</td>
            <td>
              <a
                class="btn preset-outlined-primary-500 btn-sm"
                href={resolve('/browse/traits/[trait_id]', { trait_id: trait.id })}
              >
                View &rarr;
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
