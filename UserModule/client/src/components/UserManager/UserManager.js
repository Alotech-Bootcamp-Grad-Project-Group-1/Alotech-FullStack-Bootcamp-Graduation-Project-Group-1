import { Container, Row, Col, Card } from "react-bootstrap";
import UserTable from "../UserTable";
import AddUser from "../AddUser";

//User Manager Component
function UserManager({ users, posted, setPosted }) {
  return (
    <Container className="py-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <Card className="rounded-3 shadow">
            <Card.Header className="header-color d-flex justify-content-between align-items-center">
              <h4 className="text-center">User Database</h4>
              <AddUser posted={posted} setPosted={setPosted} />
            </Card.Header>
            <Card.Body>
              {users && (
                <UserTable
                  users={users}
                  posted={posted}
                  setPosted={setPosted}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserManager;
