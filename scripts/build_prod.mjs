// The ESBuild build script for production.  This is used in `npm run build:prod`.
import * as esbuild from "esbuild";
import { readFile } from "fs/promises";

const config = JSON.parse(
  await readFile(new URL("./config.json", import.meta.url))
);
await esbuild.build({
  ...config,
  minify: true,
  define: { DEVELOPMENT: "false" },
});
