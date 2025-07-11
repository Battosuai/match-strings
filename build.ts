import type { BuildConfig } from 'bun';
import dts from 'bun-plugin-dts';

const defaultBuildConfig: BuildConfig = {
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
};

await Bun.build({
    ...defaultBuildConfig,
    plugins: [dts()],
    format: 'cjs',
    naming: '[dir]/[name].js',
});
