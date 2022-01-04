const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const CryptoJs = require("crypto-js");
const {authUrl, access_token} = require('../testConfig');
chai.use(chaiHttp);


const db = require("../../models");
const sequelize = db.sequelize;

const User = require("../../models").User;

// password for admin user
let password = "admin";

// salt password
let salt_password = password + process.env.SALT_PASS;
// hashs salt password
let user_password_hash = CryptoJs.SHA256(salt_password).toString();

// User admin object 
let admin = {
    username: 'admin',
    user_name: 'admin',
    user_surname: 'admin',
    user_password: user_password_hash,
    user_email: 'admin@mail.com',
    user_type: 'admin',
};

// token requirements
let tokenReq = {
    username: "admin",
    user_password: "admin",
    redirectURL: "http://127.0.0.1:3010",
}

let token = '';

// Creates admin user and tests
const setDB = describe('Create admin and get token for tests', function() {

    it('should create admin to db, should fail if exists', function(done) {
        sequelize
        .query("SELECT * FROM users WHERE username = :_username", { replacements: { _username: "admin" } })
        .then((v) => {
            User.createUser(
                admin.username,
                admin.user_name,
                admin.user_surname,
                admin.user_password,
                admin.user_email,
                admin.user_type,
            )
            .then(() => {
                done();
            })
            .catch((err) => {
                done();
            });
        })
    });

    it('should create token', function(done) {
        chai.request(authUrl)
        .post("auth")
        .send(tokenReq)
        .end(function(error, response) {
            token = response.body.token;
            access_token['token'] = token;
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

});

module.exports = setDB;