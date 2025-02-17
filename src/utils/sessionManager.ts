
const SESSION_KEY = 'terminal_shown';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const shouldShowTerminal = (): boolean => {
  const lastShown = sessionStorage.getItem(SESSION_KEY);
  if (!lastShown) return true;

  const lastShownTime = parseInt(lastShown, 10);
  const now = Date.now();

  if (now - lastShownTime > SESSION_DURATION) {
    return true;
  }

  return false;
};

export const markTerminalAsShown = (): void => {
  sessionStorage.setItem(SESSION_KEY, Date.now().toString());
};
