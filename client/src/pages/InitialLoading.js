import React from "react";
import ReactLoading from 'react-loading';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slide from "react-reveal/Slide";

export default function InitialLoading() {
    return (
        <Container>
            <Row style={{ marginTop: "15%" }}>
                <Col>
                    <Slide top cascade big>
                        <h1 className="loading-text">Welcome to Chat App!</h1>
                    </Slide>
                </Col>
            </Row>
            <Row style={{ marginTop: "10%" }}>
                <Col>
                    <ReactLoading style={{ fill: "#826AED", width: "300px", margin: "auto" }} type={"spin"} />
                </Col>
            </Row>
        </Container>
    )
}
