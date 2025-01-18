declare global {
  interface Window {
    global: Window;
  }
}

// Polyfill for global
if (typeof window !== 'undefined') {
  window.global = window;
}

export {};