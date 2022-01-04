import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";

// User Component
function User({ user, posted, setPosted }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.user_name}</td>
      <td>{user.user_surname}</td>
      <td>{user.user_email}</td>
      <td>{user.user_type}</td>
      <td>
        <UpdateUser user={user} posted={posted} setPosted={setPosted} />
        <DeleteUser user={user} setPosted={setPosted} />
      </td>
    </tr>
  );
}

export default User;
