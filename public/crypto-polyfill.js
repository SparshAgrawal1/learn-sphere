// Alternative implementation for browsers that don't support crypto.randomUUID
(function() {
  if (typeof window !== 'undefined') {
    try {
      // Only add if window.crypto exists but randomUUID doesn't
      if (window.crypto && !window.crypto.randomUUID) {
        window.crypto.randomUUID = function() {
          // Simple UUID v4 implementation
          return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        };
      }
    } catch (e) {
      console.warn('Failed to polyfill crypto.randomUUID', e);
    }
  }
})();



