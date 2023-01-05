module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            features: './src/features',
            apis: './src/apis',
            configs: './src/configs',
            states: './src/states',
            components: './src/components',
            utils: './src/utils',
            enums: './src/enums',
            modules: './src/modules',
          },
        },
      ],
    ],
  }
}
