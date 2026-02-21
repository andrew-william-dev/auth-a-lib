import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/auth-a-lib.esm.js',
            format: 'esm',
            sourcemap: true,
        },
        {
            file: 'dist/auth-a-lib.umd.js',
            format: 'umd',
            name: 'AuthA',
            sourcemap: true,
            globals: {
                axios: 'axios'
            }
        }
    ],
    external: ['axios'],
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: ['> 1%', 'last 2 versions', 'not dead']
                    }
                }]
            ]
        }),
        terser()
    ]
};
