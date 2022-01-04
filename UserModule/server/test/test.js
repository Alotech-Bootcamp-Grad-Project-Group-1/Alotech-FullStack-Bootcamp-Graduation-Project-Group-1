require("dotenv").config();
const chai = require('chai');
chai.use(require('chai-json-schema'));

const setDB = require('./tests/setDB');

const getUsersTest =  require('./tests/getUsersTest');
const createUserTest = require('./tests/createUserTest');
const getUserTest = require('./tests/getUserTest');
const updateUserTest = require('./tests/updateUserTest');
const deleteUserTest = require('./tests/deleteUserTest');

// Runs Tests
describe('User Module API', async function() {

    await setDB;
    await createUserTest;
    await getUsersTest;
    await getUserTest;
    await updateUserTest;
    await deleteUserTest;

});
