import Icon from "@/components/Icon";
import "@/styles/smolblog.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { Breadcrumb, Button, Container, Nav, Navbar } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar variant="dark" style={{ backgroundColor: "#191b20" }}>
        <Container>
          <Navbar.Brand href="/" as={Link}>
            <img
              src="/smolblog.wordmark.ondark.svg"
              className="d-inline-block align-top"
              alt="Smolblog"
              style={{ width: "auto", height: "30px" }}
            />
          </Navbar.Brand>
          <Button variant="success">
            <Icon icon="PlusLg" />
            New Post
          </Button>
        </Container>
      </Navbar>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/" linkAs={Link}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Sites</Breadcrumb.Item>
        </Breadcrumb>
        <Component {...pageProps} />
      </Container>
    </Fragment>
  );
}
