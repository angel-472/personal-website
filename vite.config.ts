import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Dev-only: `import.meta.glob` is collected once when the module graph is built,
// so newly added/removed project markdown isn't picked up until a restart.
// Watch the folder and restart the dev server when .md files appear/disappear.
function watchProjects() {
  return {
    name: 'watch-projects',
    apply: 'serve' as const,
    configureServer(server: any) {
      server.watcher.add('src/projects');
      const onChange = (file: string) => {
        const f = file.replace(/\\/g, '/');
        if (f.includes('/src/projects/') && f.endsWith('.md')) {
          server.restart();
        }
      };
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
    }
  };
}

export default defineConfig({

  plugins: [tailwindcss(), sveltekit(), watchProjects()],
  server: { hmr: false },
  resolve: { alias: { src: "/src" } },

});
