<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="error-container">
  {#if page.status === 404}
    <h1 class="text-6xl font-bold">404 - Not Found</h1>
    <p class="text-lg text-gray-400 mt-4">Sorry, the page you're looking for doesn't exist. <a href="/" class="text-cyan-200 hover:underline">Return To Home?</a></p>
  {:else}
    <h1 class="text-6xl font-bold">{page.status} - Oops!</h1>
    <p class="text-lg text-gray-400 mt-4">Something went wrong. Please try again later.</p>
  {/if}
</div>

