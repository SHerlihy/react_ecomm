import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Image } from "react-bootstrap";

const OrderProductDetails = ({ cart }) => {
  return (
    <ListGroup variant="flush">
      {cart.cartItems.map((item, index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col md={1}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
            </Col>
            <Col md={4}>
              {item.qty} x ${item.price} = ${item.qty * item.price}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default OrderProductDetails;
