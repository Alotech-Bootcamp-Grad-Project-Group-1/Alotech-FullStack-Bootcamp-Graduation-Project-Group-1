import { useState } from "react";
import axios from "axios";

const configData = require("../../config.json");

// User info component
function User({ user, setPosted }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Handles updating user info
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (
      oldPassword === "" ||
      newPassword === "" ||
      oldPassword === user.user_password
    ) {

      //user info
      const data = {
        username: user.username,
        user_name: user.user_name,
        user_surname: user.user_surname,
        user_password: newPassword,
        user_email: user.user_email,
        user_type: user.user_type,
      };

      //updates user info
      axios
        .put(`${configData.apiUrl}/users/${user.id}`, data)
        .then((res) => {
          setPosted(true);
          alert("Successfully updated password!");
        })
        .catch((err) => {
          alert("Error");
        });
    } else {
      alert("You have entered an incorrect password");
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row shadow">
        <div className="col-md-6 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              alt="user avatar"
              src="https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png"
            />
            <span className="font-weight-bold">{user.username}</span>
            <span className="text-black-50">{user.user_email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-6 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">User Info</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={user.username}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={user.user_name}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={user.user_surname}
                  readOnly
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={user.user_email}
                  readOnly
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  value={user.user_password}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "5px" }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#updatePassword"
                >
                  Button
                </button>
                {/* Modal for update password */}
                <div
                  className="modal fade"
                  id="updatePassword"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="updatePasswordLabel">
                          Update Password
                        </h5>
                      </div>
                      <form onSubmit={(e) => handleUpdatePassword(e)}>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="oldPassword" className="form-label">
                              Old password:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="oldPassword"
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                              New password:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
