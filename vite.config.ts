import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Dev-only: `import.meta.glob` is collected once when the module graph is built,
// so newly added/removed markdown isn't picked up until a restart.
// Watch the content folders and restart the dev server when .md files appear/disappear.
function watchContent(dirs: string[]) {
  return {
    name: 'watch-content',
    apply: 'serve' as const,
    configureServer(server: any) {
      for (const dir of dirs) server.watcher.add(dir);
      const onChange = (file: string) => {
        const f = file.replace(/\\/g, '/');
        if (f.endsWith('.md') && dirs.some((dir) => f.includes(`/${dir}/`))) {
          server.restart();
        }
      };
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
    }
  };
}

export default defineConfig({

  plugins: [tailwindcss(), sveltekit(), watchContent(['src/projects', 'src/posts'])],
  server: { hmr: false },
  resolve: { alias: { src: "/src" } },

});
