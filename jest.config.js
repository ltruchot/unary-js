module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/src/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
