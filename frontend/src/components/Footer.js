import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col data-test="copyright" className="text-center py-3">
            Copyright &copy; ProShop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
