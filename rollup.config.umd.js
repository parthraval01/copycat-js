// rollup.config.umd.js - UMD build for <script> tag usage
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/copycat-js.umd.js',
        format: 'umd',
        name: 'CopyCat',
        sourcemap: true,
        globals: {}
    },
    plugins: [
        replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true }),
        resolve(),
        commonjs(),
        terser()
    ]
};
