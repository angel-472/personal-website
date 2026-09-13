// Light/dark theme state. The pre-paint script in src/app.html decides the
// starting value (stored choice, else the OS preference) and stamps it on
// <html>; everything here just keeps that in sync after hydration.
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'diaza-theme';

/** Matches html[data-theme="dark"] in src/app.css and the pre-paint script. */
const PAGE_COLOR: Record<Theme, string> = {
  light: '#f4f4f5',
  dark: '#09090b'
};

function readStored(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
}

function currentDocumentTheme(): Theme {
  if (!browser) return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

let current = $state<Theme>(currentDocumentTheme());

function apply(next: Theme) {
  current = next;
  if (!browser) return;
  document.documentElement.dataset.theme = next;
  document.documentElement.style.colorScheme = next;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', PAGE_COLOR[next]);
}

export const theme = {
  get current() {
    return current;
  },

  get isDark() {
    return current === 'dark';
  },

  set(next: Theme) {
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing and friends: the toggle still works for this session.
    }
  },

  toggle() {
    this.set(current === 'dark' ? 'light' : 'dark');
  },

  /**
   * Follows the OS while the visitor hasn't picked a theme themselves.
   * Returns the matchMedia cleanup, so callers can use it straight from onMount.
   */
  followSystem() {
    if (!browser) return;
    // The document may have been restored from bfcache with a theme this
    // module never saw, so re-sync before listening.
    apply(readStored() ?? currentDocumentTheme());

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStored()) apply(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }
};
