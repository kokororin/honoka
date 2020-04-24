import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import banner from 'rollup-plugin-banner';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default {
  input: 'src/honoka.js',
  output: [
    {
      name: 'honoka',
      file: pkg.browser,
      format: 'umd'
    },
    {
      name: 'honoka',
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd',
      plugins: [terser()]
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.browser.replace('.js', '.cjs.js'),
      format: 'cjs',
      esModule: false
    }
  ],
  plugins: [
    babel({ runtimeHelpers: true }),
    resolve(),
    commonjs(),
    replace({ 'process.env.HONOKA_VERSION': JSON.stringify(pkg.version) }),
    banner(`${pkg.name} v${pkg.version}
(c) ${new Date().getFullYear()} ${pkg.author}
Released under the ${pkg.license} License.
${pkg.homepage}`),
    filesize()
  ]
};
