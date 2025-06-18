import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,

  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],

  testEnvironment: 'node',

  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@usecase/(.*)$': '<rootDir>/src/usecase/$1',
    '^@util/(.*)$': '<rootDir>/src/util/$1',
  },

  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
