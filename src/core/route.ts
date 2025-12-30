export function route(e: Event): void {
  e.preventDefault();
  const target = e.target as HTMLAnchorElement | null;
  if (!target) return;

  window.history.pushState({}, "", target.href);
}

declare global {
  interface Window {
    route: (e: Event) => void;
  }
}

window.route = route;
