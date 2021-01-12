import { merge } from 'webpack-merge';
import defaultConfig from './webpack.config';

export default merge(defaultConfig, {
  output: {
    libraryTarget: 'umd',
    library: 'react-modalflow',
    filename: 'react-modalflow.umd.js',
  },
  externals: {
    react: 'react',
    yup: 'yup',
  },
});
