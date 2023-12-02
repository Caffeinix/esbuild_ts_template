# Scripts

This directory contains build scripts that can be invoked using `npm run`.

- **build** (`npm run build`): runs the TypeScript compiler to check types, then
  runs esbuild in development mode to compile to bundled JavaScript. The
  compiler output goes into [dist](../dist). This will overwrite any compiled
  JavaScript files from production builds with their development versions.

- **build_prod** (`npm run build:prod`): runs the TypeScript compiler to check
  types, then runs esbuild in production mode to compile to bundled and minified
  JavaScript. The compiler output goes into [dist](../dist). This will overwrite
  any compiled JavaScript files from development builds with their production
  versions.

- **serve** (`npm start`): runs the TypeScript compiler in watch mode to check
  types, then runs esbuild in development mode to compile to bundled JavaScript
  (checking types again on each rebuild), and then starts a development server
  on localhost. If you have code in your app to enable
  [esbuild live reload](https://esbuild.github.io/api/#live-reload), your page
  will be live reloaded whenever you save a file.