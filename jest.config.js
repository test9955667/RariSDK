const {defaults} = require('jest-config');
const config = {
    verbose: true,
};

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx']
};