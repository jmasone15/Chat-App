import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SideColumn({ convos, getMessages }) {

    const capFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (convos.length) {
        return (
            <Container className="side-column">
                <Row className="side-row">
                    <Col style={{ textAlign: "center" }}>
                        <h3><u>Your Conversations</u></h3>
                    </Col>
                </Row>
                {convos.map(c => (
                    <Row>
                        <Col>
                            <p onClick={(e) => getMessages(e, c._id, c.user2)} id={c._id} className="convo-person">{capFirstLetter(c.user2)}</p>
                        </Col>
                    </Row>
                ))}
            </Container>
        )
    } else {
        return (
            <p style={{ display: "none" }}>test</p>
        )
    }
}
