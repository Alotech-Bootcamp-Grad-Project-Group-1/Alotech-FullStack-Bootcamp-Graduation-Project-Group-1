const fs = require('fs');

const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


const userSchema = require('../schemas/userSchema');
const testUsers = require('../schemas/testUsers');
const { indexUrl } = require('../testConfig');
let userIds = [];


const createUserTest = describe('Create user', function() {

    it('should return 201', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testUsers.testUser1)
        .end(function(error, response) {
            expect(response.statusCode).to.equal(201);
            userIds.push(response.body.user.id);
            fs.writeFileSync('./test/schemas/testUsers.txt', userIds.toString());
            done();
        });
    });

    it('should return status success', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testUsers.testUser2)
        .end(function(error, response) {
            // Response body status should be success
            expect(response.body.status).to.equal("success");
            userIds.push(response.body.user.id);
            fs.writeFileSync('./test/schemas/testUsers.txt', userIds.toString());
            done();
        });
    });

    it('should return "User created" message', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testUsers.testUser3)
        .end(function(error, response) {
            expect(response.body.message).to.equal("User created");
            userIds.push(response.body.user.id);
            fs.writeFileSync('./test/schemas/testUsers.txt', userIds.toString());
            done();
        });
    });

    it('should return user as user objects', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testUsers.testUser4)
        .end(function(error, response) {
            expect(response.body.user).to.be.jsonSchema(userSchema);
            userIds.push(response.body.user.id);
            fs.writeFileSync('./test/schemas/testUsers.txt', userIds.toString());
            done();
        });
    });
});

module.exports = createUserTest;