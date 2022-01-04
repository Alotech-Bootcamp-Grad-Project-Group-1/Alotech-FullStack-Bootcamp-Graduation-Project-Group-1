const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { authUrl } = require('../testConfig');

let tokenReq = {
    username: "admin",
    user_password: "admin",
    redirectURL: "http://127.0.0.1:3010",
}

// Tests User login
const loginUserTest = describe('Login user', function() {

    it('should return auth as true', function(done) {
        chai.request(authUrl)
        .post("auth")
        .send(tokenReq)
        .end(function(error, response) {
            expect(response.body.auth).to.be.true;
            done();
        });
    });

    it('should return session message', function(done) {
        chai.request(authUrl)
        .post("auth")
        .send(tokenReq)
        .end(function(error, response) {
            expect(response.body.msg).to.oneOf(['new session', 'session continue']);
            done();
        });
    });

    it('should return user id', function(done) {
        chai.request(authUrl)
        .post("auth")
        .send(tokenReq)
        .end(function(error, response) {
            expect(response.body.user_id).to.be.a('number');
            done();
        });
    });

    it('should return token a token', function(done) {
        chai.request(authUrl)
        .post("auth")
        .send(tokenReq)
        .end(function(error, response) {
            expect(response.body.token).to.be.a('string');
            done();
        });
    });
});

module.exports = loginUserTest;