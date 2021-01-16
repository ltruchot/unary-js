export default {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/src/**/*.test.js',
  ],
  transform: {
    '.js': 'jest-esm-transformer',
  },
};
