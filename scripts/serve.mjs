// An ESBuild serve script.  This is used in `npm start`.
import * as esbuild from "esbuild";
import * as child_process from "child_process";
import { readFile } from "fs/promises";

const config = JSON.parse(
  await readFile(new URL("./config.json", import.meta.url))
);

let _lastBuildFailed = false;

// A small esbuild plugin that runs tsc before each rebuild.
//
// If tsc detects any type-checking errors, the plugin returns an error to
// esbuild to prevent it from continuing.  This emulates the behavior of tsc
// when used alone, but if you want esbuild to keep going and try to compile
// even if the types don't validate, you can replace "errors" below with
// "warnings".
const typecheckBeforeRebuilding = {
  name: "typecheck-before-rebuilding",
  setup(build) {
    build.onStart(() => {
      return new Promise((resolve) => {
        const tsc = child_process.exec(
          "node node_modules/typescript/bin/tsc --pretty",
          {},
          (error, stdout, stderr) => {
            if (error === null) {
              if (_lastBuildFailed) {
                console.log('TypeScript type-checking succeeded');
                _lastBuildFailed = false;
              }
              resolve({});
            } else {
              _lastBuildFailed = true;
              process.stdout.write(stdout);
              resolve({
                errors: [
                  {
                    pluginName: "typecheck-before-rebuilding",
                    text: `TypeScript type-checking failed`,
                    detail: stderr ?? stdout,
                  },
                ],
              });
            }
          }
        );
      });
    });
  },
};

const ctx = await esbuild.context({
  ...config,
  plugins: [typecheckBeforeRebuilding],
});

await ctx.watch();
console.log(`esbuild is watching for changes...`);

const servedir = "dist";
const { host, port } = await ctx.serve({ servedir, host: "127.0.0.1" });
console.log(`esbuild is serving "${servedir}" at ${host}:${port}...`);
