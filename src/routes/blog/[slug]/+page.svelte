<script lang="ts">
  import { page } from '$app/state';
  import { fly } from 'svelte/transition'
  import { backOut } from 'svelte/easing';

  let { data } = $props();
</script>

{@render data.post.default()}