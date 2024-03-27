// vite.config.ts
import glob from "fast-glob";
import { createLogger, defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// Vite Plugin type
import path from "path";
import rimraf from "rimraf";
import { Plugin } from "vite";

const entries = glob.sync(["./src/entry/**/*.{tsx,ts,js,jsx}"]);
const assetFolder = "./assets";

const removeFilesPrefix = (): Plugin => {
  const logger = createLogger();
  let files: string[] = [];
  return {
    name: "remove-prefix",
    buildStart: () => {
      files = glob.sync([`${assetFolder}/__packages__*.js`]);
    },
    writeBundle: (_opts, bundle) => {
      const newFiles = Object.values(bundle).map(
        (file) => `${assetFolder}/${file.fileName}`
      );

      const filesToBeRemoved = files.filter((file) => !newFiles.includes(file));

      if (filesToBeRemoved.length === 0) {
        logger.info("No files to be removed");
      }

      filesToBeRemoved.forEach((file) => {
        logger.warn(`Purging ${file}`);
        rimraf.sync(file);
      });
    },
  };
};

export default defineConfig({
  plugins: [solidPlugin(), removeFilesPrefix()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "./assets",
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        chunkFileNames: "__packages__deps__[name]-[hash].js",
      },
    },
    lib: {
      entry: entries,
      fileName: (_format, entry) => `__packages__${entry}.js`,
      formats: ["es"],
      name: "shopifyPackages",
    },
  },
});
