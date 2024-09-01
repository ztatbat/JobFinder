export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};