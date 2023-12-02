# TypeScript with esbuild

This project is a template for developing and building
[TypeScript](https://www.typescriptlang.org/) apps with
[esbuild](https://esbuild.github.io/), with minimal fuss and as few development
dependencies as humanly possible. It is designed for people who are writing
relatively simple applications and don't want the overhead of a full build
system like [Vite](https://vitejs.dev/). With this template, you get:

- An `npm run build` command that runs the TypeScript compiler on your code to
  check types, and then runs `esbuild` to compile it to JavaScript and bundle it
  with its dependencies into a single file.

- An `npm start` command that does all of the above in "watch" mode so that your
  code will be rechecked and rebuilt whenever it changes, and serves the app via
  a development web server on localhost.

- An `npm run build:prod` command that works just like `npm run build`, but with
  minification.

And that's it. If you want to use a framework, you get to run `npm install`
yourself. If you want unit tests, you get to install your own unit test
framework. If you want JSX support, you can configure TypeScript for that and
esbuild will support it automatically.

This setup is designed to allow you to pretend that node, esbuild, and the
bewildering JavaScript tooling ecosystem doesn't exist, and write code the way
you would if everything in the world natively supported ECMAScript modules.
Wouldn't that be nice? I hope to live in that world someday, but until then,
this is the best I could do.

## Directory structure

- `src`: contains your source code.
- `dist`: contains everything that will be served to users.  You should be able
  to just run a static file server from this directory to serve your app.
- `scripts`: contains the build scripts and build configuration. You should
  generally never need to touch these unless you want to do something fancy.

## Serving for development

If you run `npm start`, your app will be served using esbuild's local development server.  Anything you stick in [dist](dist) will get served alongside the compiled JavaScript.

The experience you get from this should be identical to just running `tsc -watch` with a separate dev server.  When you run `npm start`, `tsc` will be run to check your types.  If it fails, you'll see the errors in your console and the server will not be started.  If it succeeds, esbuild will be run in watch mode to compile and serve your files.  `tsc` will be run again every time esbuild kicks off a new build, so if you introduce a type error while the server is already running, you'll see the errors and the compiled output won't be updated (just like `tsc -watch`).

Note that because we're typechecking your code every time it changes, **incremental builds will be slower than if you were just using esbuild alone**.  We're optimizing for ease of use here rather than speed.  If you want to turn off typechecking and just let your IDE tell you when you have type errors, you probably don't need this project template at all and can just run `esbuild --bundle` on the command line.

## Configuring your build

Pretty much all configuration of esbuild is done via the
[tsconfig.json](tsconfig.json). esbuild will read the
[tsconfig.json](tsconfig.json) file when it runs, and will [try to compile the
code the same way tsc would given that
configuration](https://esbuild.github.io/content-types/#tsconfig-json). For the
most part, you can pretend you're just running
[`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) like
normal. There are
[a few things esbuild doesn't support](https://esbuild.github.io/content-types/#typescript-caveats),
but most of them are pretty obscure.

The few options that need to be passed directly to esbuild, such as the path to the output file (which is `dist/main.js` by default) and the target JavaScript version, can be found in [scripts/config.mjs](scripts/config.mjs), which is just a JSON object conforming to the esbuild [BuildOptions interface](https://github.com/evanw/esbuild/blob/main/lib/shared/types.ts).

## Build environments

Just about the only "batteries-included" part of this template is that when you
build using `npm run build`, an esbuild define called `DEVELOPMENT` will be set to `true`.  This means you can do things like this in your TypeScript code:

```ts
declare const DEVELOPMENT: boolean;
if (DEVELOPMENT) {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}
```

This example enables live reloading in your development server.

When you run `npm run build:prod`, `DEVELOPMENT` is instead set to `false`.  If
you want to introduce more build environments for some reason, look at [scripts/build_prod.mjs](scripts/build_prod.mjs) to see how it does it.

## FAQ

**Q: Why aren't you using the TypeScript compiler to compile the code?**

A: It is possible to run `tsc` first and then bundle the JavaScript files it
produces, or even to run `tsc` inside esbuild using a plugin and then bundle the
result. But esbuild recommends against doing this for a couple of reasons. The
first reason is that it's way slower than just running esbuild directly on the
TypeScript files, but since we're running `tsc` to do typechecking before every
build anyway, we don't care about that. The other reason, though, is that the
output of esbuild is both smaller and more standards-compliant than the output
of `tsc`. See
[this GitHub issue](https://github.com/evanw/esbuild/issues/1984#issuecomment-1029553917)
for more details on this from the author of esbuild.

**Q: Is this template suitable for developing a TypeScript module?**

A: Not as configured by default, no, but some changes to the [tsconfig.json](tsconfig.json) should get you there.

