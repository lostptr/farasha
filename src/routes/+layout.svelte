<script lang="ts">
  import '../app.css';

  import favicon from '$lib/assets/favicon.svg';

  import MartialArtsIcon from '~icons/material-symbols/sports-martial-arts';
  import HomeIcon from '~icons/material-symbols/home';
  import SettingsIcon from '~icons/material-symbols/settings';
  import CategoryIcon from '~icons/material-symbols/category';
  import AwardStarIcon from '~icons/material-symbols/award-star';
  import PersonPlayIcon from '~icons/material-symbols/person-play';
  import ButterflyIcon from '~icons/icon-park-solid/butterfly';

  import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';
  import { resolve } from '$app/paths';

  let { children } = $props();
  let anchorSidebar = 'btn hover:preset-tonal justify-start px-2 w-full';

  const linksSidebar = {
    browse: [
      {
        label: 'Traits',
        href: resolve('/browse/traits'),
        icon: PersonPlayIcon,
      },
      {
        label: 'Techniques',
        href: resolve('/browse/techniques'),
        icon: MartialArtsIcon,
      },
      { label: 'Charms', href: resolve('/browse/charms'), icon: AwardStarIcon },
      { label: 'Items', href: resolve('/browse/items'), icon: CategoryIcon },
    ],
  };
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="grid h-screen max-h-screen grid-flow-row grid-rows-[auto_1fr]">
  <AppBar>
    <AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
      <AppBar.Lead>
        <ButterflyIcon class="size-6" />
      </AppBar.Lead>
      <AppBar.Headline>
        <p class="text-2xl">Farasha</p>
      </AppBar.Headline>
    </AppBar.Toolbar>
  </AppBar>

  <div class="grid min-h-0 w-full grid-cols-[auto_1fr] items-stretch border border-surface-200-800">
    <Navigation layout="sidebar" class="grid grid-rows-[auto_1fr_auto] gap-4">
      <Navigation.Header>
        <Navigation.Group>
          <Navigation.Menu>
            <a href={resolve('/')} class={anchorSidebar}>
              <HomeIcon class="size-5" />
              <span>Home</span>
            </a>
          </Navigation.Menu>
        </Navigation.Group>
      </Navigation.Header>

      <Navigation.Content>
        {#each Object.entries(linksSidebar) as [category, links]}
          <Navigation.Group>
            <Navigation.Label class="pl-2 capitalize">{category}</Navigation.Label>
            <Navigation.Menu>
              {#each links as link (link)}
                {@const Icon = link.icon}
                <a
                  href={link.href}
                  class={anchorSidebar}
                  title={link.label}
                  aria-label={link.label}
                >
                  <Icon class="size-5" />
                  <span>{link.label}</span>
                </a>
              {/each}
            </Navigation.Menu>
          </Navigation.Group>
        {/each}
      </Navigation.Content>

      <Navigation.Footer>
        <a href={resolve('/settings')} class={anchorSidebar} title="Settings" aria-label="Settings">
          <SettingsIcon class="size-5" />
          <span>Settings</span>
        </a>
      </Navigation.Footer>
    </Navigation>

    <div class="overflow-y-auto p-4">
      {@render children?.()}
    </div>
  </div>
</div>
