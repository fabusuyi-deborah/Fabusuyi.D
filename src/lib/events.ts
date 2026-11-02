/** Small window events so distant components (footer, shortcuts) can open header menus. */
export const OPEN_BUILDING = "portfolio:open-building";
export const TOGGLE_BUILDING = "portfolio:toggle-building";
export const OPEN_MENU = "portfolio:open-menu";

export function emit(name: string) {
  window.dispatchEvent(new Event(name));
}

/** True when the header is showing the mobile menu instead of the full nav. */
export function isCompactNav() {
  return window.matchMedia("(max-width: 899.98px)").matches;
}
