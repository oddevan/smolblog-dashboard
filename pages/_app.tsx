import BSIcon from "@/components/BSIcon";
import "@/styles/smolblog.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar variant="dark" style={{ backgroundColor: "#191b20" }}>
        <Container>
          <Navbar.Brand href="/" as={Link}>
            Smolblog
          </Navbar.Brand>
          <Button variant="success">New Post</Button>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </Fragment>
  );
}
