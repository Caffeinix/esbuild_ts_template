import './sample-element';

declare const DEVELOPMENT: boolean;
if (DEVELOPMENT) {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}
