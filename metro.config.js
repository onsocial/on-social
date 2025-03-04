const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

// Customize the resolver
defaultConfig.resolver = {
  ...defaultConfig.resolver,
  // Add support for additional source extensions (TypeScript, CSS, etc.)
  sourceExts: [...defaultConfig.resolver.sourceExts, 'ts', 'tsx', 'css'],
  // Ensure SVGs are treated as assets
  assetExts: [...defaultConfig.resolver.assetExts, 'svg'],
  // Define path aliases
  extraNodeModules: {
    '@assets': `${__dirname}/src/@assets`,
    '@components': `${__dirname}/src/@components`,
    '@screens': `${__dirname}/src/@screens`,
    '@hooks': `${__dirname}/src/@hooks`,
    '@contexts': `${__dirname}/src/@contexts`,
    '@navigation': `${__dirname}/src/@navigation`,
    '@services': `${__dirname}/src/@services`,
    '@styles': `${__dirname}/src/@styles`,
    '@utils': `${__dirname}/src/@utils`,
  },
};

// Export the config with NativeWind
module.exports = withNativeWind(defaultConfig, {
  input: './src/styles/global.css',
});
