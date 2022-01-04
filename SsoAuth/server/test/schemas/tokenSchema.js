// Schema for Token database
let tokenSchema = {
    "title": "Token",
    "type": "object",
    "properties": {
        "user_id": {"type": "number"},
        "token": {"type": "string"},
        "expires": {"type": "string"},
        "createdAt": {"type": "string"},
        "time_to_live": {"type": "string"},
        "user_ip": {"type": "string"},
        "source_url": {"type": "string"}
    },
    "required": ["user_id", "token", "expires", "createdAt", "time_to_live", "user_ip", "source_url"]
};

module.exports = {tokenSchema};