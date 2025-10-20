// rollup.config.cjs.js - CommonJS build (for Node consumers)
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/copycat-js.cjs.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true }),
        resolve(),
        commonjs(),
        terser()
    ]
};
