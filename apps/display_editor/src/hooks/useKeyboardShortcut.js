import { useEffect } from 'react';

export const useKeyboardShortcut = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput =
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable;

      if (isInput) return;

      const shortcutEntries = Array.isArray(shortcuts) ? shortcuts : Object.entries(shortcuts);

      for (const entry of shortcutEntries) {
        let keys, callback;

        if (Array.isArray(entry)) {
          [keys, callback] = entry;
        } else {
          continue;
        }

        const keyList = Array.isArray(keys) ? keys : [keys];

        if (keyList.includes(e.key)) {
          e.preventDefault();
          callback(e);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};
