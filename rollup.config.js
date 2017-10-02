import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  plugins: [
    buble(),
    commonjs(),
    nodeResolve()
  ],
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'assert',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ]
}
