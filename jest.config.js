module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/__test__/*.spec.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
