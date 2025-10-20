// rollup.config.esm.js - ESM build
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/copycat-js.esm.js',
        format: 'esm',
        sourcemap: true
    },
    plugins: [
        replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true }),
        resolve(),
        commonjs(),
        terser()
    ]
};
