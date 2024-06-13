module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.(ts|js)'
  ],
  testEnvironment: "node",
  moduleNameMapper: require('tsconfig-paths-jest')(require('./tsconfig.json')),
};
