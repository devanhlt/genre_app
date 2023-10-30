// const { defaults: tsjPreset } = require("ts-jest/presets")

/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  // ...tsjPreset,
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.ts?(x)", "**/*.test.js?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.maestro/", "@react-native"],
  testEnvironment: "jsdom",
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "<rootDir>/test/setup.ts",
  ],
}
