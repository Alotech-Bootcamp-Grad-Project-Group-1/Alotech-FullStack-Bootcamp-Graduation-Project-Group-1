// Schema for User
let userSchema = {
    "title": "User",
    "type": "object",
    "properties": {
        "id": {"type": "number"},
        "username": {"type": "string"},
        "user_name": {"type": "string"},
        "user_surname": {"type": "string"},
        "user_password": {"type": "string"},
        "user_email": {"type": "string"},
        "user_type": {"type": "string"},
    },
    "required": ["id", "username", "user_name", "user_surname", "user_password", "user_email", "user_type"]
};

module.exports = {userSchema};