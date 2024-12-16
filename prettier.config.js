export default {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['<BUILT_IN_MODULES>', '', '<THIRD_PARTY_MODULES>', '^@', '', '^[./]'],
  importOrderCaseSensitive: true,
  importOrderParserPlugins: ['typescript'],
  printWidth: 100,
  quoteProps: 'consistent',
  singleQuote: true,
};
