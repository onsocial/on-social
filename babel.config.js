module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@App': './App',
            '@assets/*': './src/assets/**',
            '@components/*': './src/components/**',
            '@screens/*': './src/screens/**',
            '@hooks/*': './src/hooks/**',
            '@contexts/*': './src/contexts/**',
            '@navigation/*': './src/navigation/**',
            '@services/*': './src/services/**',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
        },
      ],
    ],
  };
};
