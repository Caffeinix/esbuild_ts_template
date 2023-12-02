// The default ESBuild configuration.  This is used in all the other scripts.

const config = {
  entryPoints: ["src/main.ts"],
  bundle: true,
  sourcemap: true,
  target: "esnext",
  outfile: "dist/main.js",
  define: { DEVELOPMENT: "true" },
  minify: false,
};

export { config };
