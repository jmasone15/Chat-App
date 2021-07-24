import React from "react";
import ReactLoading from 'react-loading';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Loading() {
    return (
        <Container>
            <Row>
                <Col>
                    <ReactLoading style={{ fill: "#826AED", width: "900px", margin: "auto" }} type={"bars"} />
                </Col>
            </Row>
        </Container>
    )
}
