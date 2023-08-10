/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@hooks$': '<rootDir>/src/hooks/index.ts',
    '^@utils$': '<rootDir>/src/utils/index.ts',
    '^@common$': '<rootDir>/src/common/index.ts',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};

module.exports = config;
