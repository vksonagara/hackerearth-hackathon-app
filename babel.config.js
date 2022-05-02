module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@assets': './src/assets',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@services': './src/services',
          '@styles': './src/styles',
          '@store': './src/store',
          '@lib': './src/lib',
          '@utils': './src/utils',
          '@config': './src/config',
        },
      },
    ],
  ],
};
