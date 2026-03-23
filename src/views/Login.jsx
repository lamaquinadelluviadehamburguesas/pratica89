import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="mt-3">
      <Row className="align-items-center">
        <Col>
          <h2><i className="bi-person-fill-lock me-2"></i> Login</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
