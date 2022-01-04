const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const userSchema = require('../schemas/userSchema');
const {indexUrl, access_token} = require('../testConfig');
const {generateUser} = require('../schemas/testUsers');

// Tests create user 
const createUserTest = describe('Create user', function() {

    it('should return 201', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.statusCode).to.equal(201);
            done();
        });
    });

    it('should return status success', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.body.status).to.equal("success");
            done();
        });
    });

    it('should return "User created" message', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.body.message).to.equal("User created");
            done();
        });
    });

    it('should return user as user objects', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.body.user).to.be.jsonSchema(userSchema);
            done();
        });
    });
});

module.exports = createUserTest;