const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  sourceExts: [...defaultConfig.resolver.sourceExts, 'css'], // Ensure Metro can handle .css files
  alias: {
    '@assets/*': './src/assets/**',
    '@components/*': './src/components/**',
    '@screens/*': './src/screens/**',
    '@hooks/*': './src/hooks/**',
    '@contexts/*': './src/contexts/**',
    '@navigation/*': './src/navigation/**',
    '@services/*': './src/services/**',
    '@styles/*': './src/styles/**',
    '@utils/*': './src/utils/**',
  },
};

module.exports = withNativeWind(defaultConfig, {
  input: './src/styles/global.css',
});
