import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: ['assets/src/javascripts/application.js'],
    output: {
      name: 'application',
      file: 'assets/javascripts/application.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve({ skip: [ 'jquery' ] }),
      commonjs(),
      inject({
        include: '**/*.js',
        exclude: 'node_modules/**',

        $: 'jquery'
      }),
      terser({
        output: {
          comments: false
        }
      }),
      sourcemaps()
    ]
  }
];