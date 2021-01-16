module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/__test__/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
