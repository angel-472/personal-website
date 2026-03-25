<script>
// @ts-nocheck

  let props = $props();
  let { href, children } = props;
  import { onMount } from 'svelte';

  const isUnderlined = props.isUnderlined ?? false;
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'));

  let element;

  onMount(() => {
    // Get nearest parent bg color
    if(isUnderlined !== false){
      let parent = element.parentElement;
      let i = 0;
      let textColor;
      while (parent) {
        const bgColor = getComputedStyle(parent).backgroundColor;
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
            console.log("Found parent with bg color: " + bgColor);
            textColor = bgColor;
            break;
          }
          let newParent = parent.parentElement;
          console.log(newParent);
          parent = parent.parentElement;
          console.log(bgColor);
          if(i++ > 50) {
            console.warn("Reached maximum parent traversal limit (cause we're not crashing the macbook again)");
            break;
          }
      }
      if(textColor) {
        element.addEventListener('mouseenter', () => element.style.color = textColor)
        element.addEventListener('mouseleave', () => element.style.color = '');
      }
    }
  });
</script>


<!-- Represents a link element with styling -->
<a bind:this={element} href={href} class="{props.class} {isUnderlined ? 'underline decoration-dashed underline-offset-5 text-cyan-200 hover:no-underline hover:bg-cyan-200 px-1' : ''} hover:text-cyan-200 transition-colors duration-300" target="{isExternal ? '_blank' : ''}" rel="{isExternal ? 'noopener noreferrer' : ''}">
  {@render children()}
</a>