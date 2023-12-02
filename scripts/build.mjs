// The ESBuild build script.  This is used in `npm run build`.
import * as esbuild from "esbuild";
import {config} from './config.mjs';

await esbuild.build(config);
