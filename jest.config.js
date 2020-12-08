module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/src/boolean.ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
