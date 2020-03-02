const path = require('path');
require('dotenv-yaml').config({ path: path.resolve(__dirname, '.env.yml') });

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['handlers/*.js', 'helpers/*.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 75,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    'exceptions',
  ],
  testPathIgnorePatterns: ['__tests__/stub', '__tests__/utils', '__tests__/mocks']
};
