const chai = require('chai');
chai.use(require('chai-json-schema'));

const setDB = require('./tests/setDB');

const loginUserTest =  require('./tests/loginUserTest');
const isTokenValidTest = require('./tests/isTokenValidTest');

// Runs Tests
describe('User Module API', async function() {

    await setDB;
    await loginUserTest;
    await isTokenValidTest
});
