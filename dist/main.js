"use strict";
(() => {
  // src/main.ts
  if (true) {
    new EventSource("/esbuild").addEventListener(
      "change",
      () => location.reload()
    );
  }
})();
//# sourceMappingURL=main.js.map
