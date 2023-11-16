const esbuild = require('esbuild')

const build = async () => {
  console.time('build')
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    // minify: true,
    // sourcemap: 'inline',
    outfile: 'g-lite.js',
    format: 'esm',
    target: ['es6'],
    pure: ['console.log'],
  })
}

build()