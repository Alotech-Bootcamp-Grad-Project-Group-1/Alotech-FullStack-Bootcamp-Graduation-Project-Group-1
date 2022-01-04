import { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const { getCookie } = require("../../../../utility/Utility");

const configData = require("../../../../config.json");

// Update User Component
function UpdateUser({ user, setPosted }) {

  // States for show and showPassword
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sets show false
  const handleClose = () => setShow(false);
  // Sets show true
  const handleShow = () => setShow(true);

  // States for user info
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.user_name);
  const [surname, setSurname] = useState(user.user_surname);
  const [email, setEmail] = useState(user.user_email);
  const [role, setRole] = useState(user.user_type);
  const [password, setPassword] = useState(user.user_password);

  // This is invoked when form is submitted
  function handleSubmit(e) {
    e.preventDefault();

    // user id
    const id = user.id;

    // user info
    const data = {
      username: username,
      user_name: name,
      user_surname: surname,
      user_password: password,
      user_email: email,
      user_type: role,
    };

    // Gets access token from cookie
    var cookie_token = getCookie("access_token");

    // updates user info
    axios
      .put(`${configData.apiUrl}/users/${id}`, data, {
        headers: {
          access_token: cookie_token,
        },
      })
      .then((res) => {
        setPosted(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error: " + err);
      });

    handleClose();
  }

  return (
    <>
      <Button
        variant="warning"
        className="btn-margin btn-xl btn-edit fa fa-edit"
        onClick={handleShow}
      ></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                value={surname}
                type="text"
                placeholder="Surname"
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>

              <InputGroup>
                <Form.Control
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputGroup.Checkbox
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="user_type">
              <Form.Label>User Type</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUser;
