import { merge } from 'webpack-merge';
import defaultConfig from './webpack.config';

export default merge(defaultConfig, {
  output: {
    filename: 'react-modalflow.cjs.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
    yup: 'yup',
  },
});
