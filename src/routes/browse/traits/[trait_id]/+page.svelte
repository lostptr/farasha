<script lang="ts">
  import { page } from '$app/state';
  import { getTraitById } from '$lib/data/trait';
  import type { TraitId } from '$lib/types/trait';
  import ArrowBackIcon from '~icons/material-symbols/arrow-back';
  import { marked } from 'marked';
  import { resolve } from '$app/paths';

  let id: TraitId = page.params.trait_id ?? '0';
  let trait = getTraitById(id)!;
</script>

<div class="flex flex-col items-start">
  <a class="btn preset-filled" href={resolve('/browse/traits')}>
    <ArrowBackIcon />
    <span>Back</span>
  </a>

  <div class="p-8">
    <div class="mb-8 grid grid-cols-[1fr_auto] items-center">
      <h1 class="h1">
        {trait.name}
      </h1>
      <div class="px-8">
        <span class="badge preset-tonal-primary font-bold uppercase">
          {trait.category}
        </span>
      </div>
    </div>

    <div>
      {#each trait.subtrait as sub}
        {sub}
      {/each}
    </div>

    <div class="trait-description">
      {#each trait.description as desc}
        {@html marked(desc)}
        <br />
      {/each}
    </div>
  </div>
</div>
