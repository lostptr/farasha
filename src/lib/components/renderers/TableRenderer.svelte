<script lang="ts">
  interface TableCell {
    text: string;
    tokens: any[];
    header: boolean;
    align: 'center' | 'left' | 'right' | null;
  }

  export let headers: TableCell[] = [];
  export let rows: TableCell[][] = [];
</script>

<div class="table-wrap">
  <table class="table caption-bottom">
    <thead>
      <tr>
        {#each headers as header}
          <th>{header.text}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each rows as row}
        <tr>
          {#each row as rowCell}
            <td>{rowCell.text}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
