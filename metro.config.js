const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  sourceExts: [...defaultConfig.resolver.sourceExts, 'css'], // Ensure Metro can handle .css files
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
};

module.exports = withNativeWind(defaultConfig, {
  input: './src/assets/global.css',
});
