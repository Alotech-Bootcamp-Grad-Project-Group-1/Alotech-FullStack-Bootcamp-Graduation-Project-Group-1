import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const { getCookie } = require("../../../../utility/Utility");

const configData = require("../../../../config.json");

// Delete User Component
function DeleteUser({ user, setPosted }) {

  //State for show
  const [show, setShow] = useState(false);

  // Sets show false
  const handleClose = () => setShow(false);

  // Sets show true
  const handleShow = () => setShow(true);

  // deletes user by id
  function deleteUser(e) {
    const id = user.id;
    e.preventDefault();

    // deletes user by id from users database
    axios
      .delete(`${configData.apiUrl}/users/${id}`, {
        headers: {
          access_token: getCookie("access_token"),
        },
      })
      .then((res) => {
        setPosted(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  }

  return (
    <>
      <Button
        variant="danger"
        className="btn-delete btn-margin btn-xl fa fa-trash"
        onClick={handleShow}
      ></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Are you sure to delete user <strong>{user.username}</strong>?
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => deleteUser(e)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
