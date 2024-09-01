import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Other configurations...
  setupFilesAfterEnv: ['./jest-setup.ts'], // Adjust the path if necessary
};

export default config;
