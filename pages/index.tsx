import Head from "next/head";
import {
  Breadcrumb,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { LightbulbOff } from "react-bootstrap-icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>Smolblog Dashboard</title>
      </Head>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header as="h2" className="h4">
              My Sites
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Post Popular Mosts</ListGroup.Item>
              <ListGroup.Item>madcrasher</ListGroup.Item>
              <ListGroup.Item>
                The <em>Nowhereverse</em>
              </ListGroup.Item>
              <ListGroup.Item>oddEvan.com</ListGroup.Item>
              <ListGroup.Item>Smolblog Free Software Project</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
