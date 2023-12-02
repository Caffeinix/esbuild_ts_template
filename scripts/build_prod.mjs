// The ESBuild build script for production.  This is used in `npm run build:prod`.
import * as esbuild from "esbuild";
import { config } from "./config.mjs";

await esbuild.build({
  ...config,
  minify: true,
  define: { DEVELOPMENT: "false" },
});
