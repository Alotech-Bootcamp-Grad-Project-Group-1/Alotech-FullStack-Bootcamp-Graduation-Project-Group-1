const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const userSchema = require('../schemas/userSchema');
const { indexUrl, access_token } = require('../testConfig');

// Tests get users
const getUsersTest = describe('Get users', function() {

    it('should return 200', function(done) {
        chai.request(indexUrl)
        .get("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send({})
        .end(function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return status success', function(done) {
        chai.request(indexUrl)
        .get("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send({})
        .end(function(error, response) {
            expect(response.body.status).to.equal("success");
            done();
        });
    });

    it('should return "users found" message', function(done) {
        chai.request(indexUrl)
        .get("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send({})
        .end(function(error, response) {
            expect(response.body.message).to.equal("Users found");
            done();
        });
    });

    it('should return a array of users', function(done) {
        chai.request(indexUrl)
        .get("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send({})
        .end(function(error, response) {
            expect(response.body.users).to.be.a('array');
            done();
        });
    });

    it('should return users as user objects', function(done) {
        chai.request(indexUrl)
        .get("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send({})
        .end(function(error, response) {
            expect(response.body.users).to.be.jsonSchema(userSchema);
            done();
        });
    });
});

module.exports = getUsersTest;