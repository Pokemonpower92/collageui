const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        jsx: 'react-jsx',  // This tells ts-jest how to handle JSX
        tsconfig: {
          jsx: 'react-jsx'  // Local tsconfig just for tests
        }
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

export default config;