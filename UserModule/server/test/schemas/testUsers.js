// Generate user
exports.generateUser = () => {
    return({
        username: `Test User ${Math.floor(Math.random() * 10000)}`,
        user_name: 'test name',
        user_surname: 'test surname',
        user_password: 'test password',
        user_email: `${Math.floor(Math.random() * 10000)}@mail.com`,
        user_type: 'user',
    });
};