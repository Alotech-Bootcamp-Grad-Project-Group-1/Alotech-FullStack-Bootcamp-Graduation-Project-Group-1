// Schema for Logs
let logSchema = {
    "title": "Log",
    "type": "object",
    "properties": {
        "id": {"type": "number"},
        "log": {"type": "string"},
    },
    "required": ["log"],
};

module.exports = {logSchema};