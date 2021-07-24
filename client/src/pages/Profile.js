import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileBar from "../components/ProfileBar";

export default function Profile({ setLoading }) {
    return (
        <Container fluid>
            <Row>
                <Col className="nav-class">
                    <ProfileBar setLoading={setLoading} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Profile Page</h1>
                </Col>
            </Row>
        </Container>
    )
}
