// The ESBuild build script.  This is used in `npm run build`.
import * as esbuild from "esbuild";
import { readFile } from "fs/promises";

const config = JSON.parse(
  await readFile(new URL("./config.json", import.meta.url))
);
await esbuild.build(config);
