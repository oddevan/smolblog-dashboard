import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import {
  Breadcrumb,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Head>
        <title>Smolblog Dashboard</title>
      </Head>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/" linkAs={Link}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Sites</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Header as="h2" className="h4">
                My Sites
              </Card.Header>
              <ListGroup>
                <ListGroup.Item>Post Popular Mosts</ListGroup.Item>
                <ListGroup.Item>madcrasher</ListGroup.Item>
                <ListGroup.Item>The Nowhereverse</ListGroup.Item>
                <ListGroup.Item>oddEvan.com</ListGroup.Item>
                <ListGroup.Item>Smolblog Free Software Project</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
