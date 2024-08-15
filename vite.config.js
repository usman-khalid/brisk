/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('vite');
const postCSSMixinsPlugin = require('postcss-mixins');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const blocksDir = path.resolve(__dirname, './blocks');
const blocks = fs.readdirSync(blocksDir, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

const blockEntries = glob.sync(path.join(blocksDir, '**/!(*.module).{css,js}'));

const staticEntries = [
  'scripts/**/*.js',
  'styles/styles.css',
  'styles/lazy-styles.css',
  'styles/fonts.css',
].flatMap((pattern) => glob.sync(path.resolve(__dirname, pattern)));

const inputEntries = [...staticEntries, ...blockEntries];

const assetPathMap = {
  image: 'assets/images',
  font: 'assets/fonts',
  default: 'assets',
};

const getFileCategory = (name) => {
  if (/\.(gif|jpe?g|tiff?|png|webp|bmp|svg)$/i.test(name)) return 'image';
  if (/\.(woff|woff2|eot|ttf)$/i.test(name)) return 'font';
  return 'default';
};

export default defineConfig({
  css: {
    postcss: {
      plugins: [postCSSMixinsPlugin()],
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    rollupOptions: {
      preserveEntrySignatures: true,
      treeshake: true,
      input: inputEntries,
      output: {
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo;
          const blockName = name.split('.')[0];
          const isBlock = blocks.includes(blockName);
          const category = getFileCategory(name);
          const isStaticAsset = !['css', 'js'].some((ext) => name.includes(ext));

          let filePath;

          if (isBlock) {
            filePath = `blocks/${blockName}/${blockName}.min.[ext]`;
          } else if (isStaticAsset) {
            filePath = `${assetPathMap[category]}/[name].[ext]`;
          } else {
            filePath = 'assets/[name].min.[ext]';
          }

          return filePath;
        },
        entryFileNames: (entry) => {
          const { name } = entry;
          const blockName = name.split('.')[0];
          const isBlock = blocks.includes(blockName);
          const isModule = name.endsWith('.module');
          const fileName = isModule ? `${blockName}.classes` : name;

          return isBlock
            ? `blocks/${blockName}/${fileName}.min.js`
            : 'scripts/[name].min.js';
        },
        chunkFileNames: 'vendor/[name]-[hash].min.js',
      },
    },
  },
});
