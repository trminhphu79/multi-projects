const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apps/server/chat'),
  },
  optimization: {
    usedExports: true, // Enable tree-shaking by marking unused exports
    sideEffects: false, // Ensure side-effect-free modules are identified
    minimize: true, // Enable code minimization
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
