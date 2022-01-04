const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { authUrl, access_token } = require('../testConfig');

// Tests if the token is valid or not
const isTokenValidTest = describe('Is token valid', function() {

    it('should return status 200', function(done) {
        chai.request(authUrl)
        .post("auth/token")
        .send(access_token)
        .end(function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return valid as true', function(done) {
        chai.request(authUrl)
        .post("auth/token")
        .send(access_token)
        .end(function(error, response) {
            expect(response.body.valid).to.equal(true);
            done();
        });
    });

    it('should return user role "isAdmin" as true', function(done) {
        chai.request(authUrl)
        .post("auth/token")
        .send(access_token)
        .end(function(error, response) {
            expect(response.body.isAdmin).to.equal(true);
            done();
        });
    });

    it('should return message', function(done) {
        chai.request(authUrl)
        .post("auth/token")
        .send(access_token)
        .end(function(error, response) {
            expect(response.body.msg).to.be.a('string');
            done();
        });
    });
});

module.exports = isTokenValidTest;