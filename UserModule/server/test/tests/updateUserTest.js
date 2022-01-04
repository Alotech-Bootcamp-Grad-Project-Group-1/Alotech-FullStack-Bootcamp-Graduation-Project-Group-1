const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const userSchema = require('../schemas/userSchema');
const { indexUrl, access_token } = require('../testConfig');
const {generateUser} = require('../schemas/testUsers');
let userId;
let updateUser = generateUser();

// Tests update user
const updateUserTest = describe('Update user', function() {

    it('should create a user for test', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.statusCode).to.equal(201);
            userId = response.body.user.id;
            done();
        });
    });

    it('should return 200', function(done) {
        chai.request(indexUrl)
        .put(`users/${userId}`)
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(updateUser)
        .end(function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return status success', function(done) {
        chai.request(indexUrl)
        .put(`users/${userId}`)
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(updateUser)
        .end(function(error, response) {
            expect(response.body.status).to.equal("success");
            done();
        });
    });

    it('should return "User updated" message', function(done) {
        chai.request(indexUrl)
        .put(`users/${userId}`)
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(updateUser)
        .end(function(error, response) {
            expect(response.body.message).to.equal("User updated");
            done();
        });
    });

    it('should return user as user objects', function(done) {
        chai.request(indexUrl)
        .put(`users/${userId}`)
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(updateUser)
        .end(function(error, response) {
            expect(response.body.user).to.be.jsonSchema(userSchema);
            done();
        });
    });
});

module.exports = updateUserTest;