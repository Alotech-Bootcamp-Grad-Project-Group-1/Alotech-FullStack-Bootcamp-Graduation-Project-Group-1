const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const {indexUrl, access_token} = require('../testConfig');
const {generateUser} = require('../schemas/testUsers');
let userIds = [];

const db = require("../../models");
const sequelize = db.sequelize;
const username = "test name";

// Tests delete user 
const deleteUserTest = describe('Delete user', function() {

    it('should create a user for test', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.statusCode).to.equal(201);
            userIds.push(response.body.user.id);
            done();
        });
    });

    it('should create a user for test 2', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.statusCode).to.equal(201);
            userIds.push(response.body.user.id);
            done();
        });
    });

    it('should create a user for test 3', function(done) {
        chai.request(indexUrl)
        .post("users")
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send(generateUser())
        .end(function(error, response) {
            expect(response.statusCode).to.equal(201);
            userIds.push(response.body.user.id);
            done();
        });
    });
    
    it('should return 200', function(done) {
        chai.request(indexUrl)
        .delete(`users/${userIds[0]}`)
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
        .delete(`users/${userIds[1]}`)
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send({})
        .end(function(error, response) {
            // Response body status should be success
            expect(response.body.status).to.equal("success");
            done();
        });
    });

    it('should return "User deleted" message', function(done) {
        chai.request(indexUrl)
        .delete(`users/${userIds[2]}`)
        .set('Content-Type', 'application/json')
        .set(access_token)
        .send({})
        .end(function(error, response) {
            expect(response.body.message).to.equal("User deleted");
            done();
        });
    });

    it('should remove created users from db', function(done) {
        sequelize
        .query("DELETE FROM users WHERE user_name = :_user_name;", { replacements: { _user_name: username } })
        .then((v) => {
            if (v.length > 0) {
                done();
            } else {
                done();
            }
        }).catch(err => {
            console.log(err);
            done();
        });
    });

});

module.exports = deleteUserTest;