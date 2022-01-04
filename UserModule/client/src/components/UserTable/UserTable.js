import User from "../User";
import { Table } from "react-bootstrap";

// User Table Component
function UserTable({ users, posted, setPosted }) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">Name</th>
          <th scope="col">Surname</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              posted={posted}
              setPosted={setPosted}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

export default UserTable;
