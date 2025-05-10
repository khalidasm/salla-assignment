import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import tailwind, { tailwindHMR, setPluginConfigurationDefaults } from 'stencil-tailwind-plugin';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

setPluginConfigurationDefaults({
  enableDebug: false,
  tailwindCssPath: './src/styles/tailwind.css',
});

export const config: Config = {
  namespace: 'stencil-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      externalRuntime: false,
      dir: 'dist/components'
    },
    reactOutputTarget({
      outDir: '../react-app/src/components',
      stencilPackageName: '@salla-assignment/stencil-components'
    }),
    vueOutputTarget({
      componentCorePackage: '@salla-assignment/stencil-components',
      proxiesFile: '../vue-app/src/components.ts',
      includeImportCustomElements: true,
      customElementsDir: 'dist/components'
    }),
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: '/stencil-components/',
      copy: [
        {
          src: '**/*.{html,css,js,json,ts,tsx}',
          dest: 'www'
        }
      ]
    },
  ],
  plugins: [
    sass(),
    tailwind(),
    tailwindHMR(),
  ],
};
