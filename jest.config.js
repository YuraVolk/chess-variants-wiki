/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@moveGeneration/(.*)$": "<rootDir>/src/main/client/ts/logic/movegen/$1",
    "^@components/(.*)$": "<rootDir>/src/main/client/ts/components/$1",
    "^@utils/(.*)$": "<rootDir>/src/main/client/ts/utils/$1",
    "^@client/(.*)$": "<rootDir>/src/main/client/$1"
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: { metaObjectReplacement: { url: 'https://www.url.com' } }
            }
          ]
        }
      }
    ]
  }
};