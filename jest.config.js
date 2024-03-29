const { defaults: tsjPreset } = require("ts-jest/presets")

/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  // ...tsjPreset,
  preset: "jest-expo",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
    "jest-runner",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.maestro/", "@react-native"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "<rootDir>/test/setup.ts",
  ],
  moduleNameMapper: { "^app/(.*)$": "<rootDir>/app/$1", "^assets/(.*)$": "<rootDir>/assets/$1" },
}
