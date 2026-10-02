import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node22",
  clean: true,
  sourcemap: true,
  // @snail/shared exports raw TypeScript, so it must be bundled
  noExternal: ["@snail/shared"],
})
