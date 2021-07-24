import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MessagesBox() {
    return (
        <Container fluid className="message-container">
            <Row>
                <Col className="message-header">
                    <h1>Conversation with "Name"</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>messages here</h1>
                </Col>
            </Row>
            <Row className="message-footer">
                <Col xl="12">
                    <Container fluid className="message-input">
                        <Row>
                            <Col sm="10">
                                <div class="form__group field">
                                    <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                                    <label for="name" class="form__label">Type Your Message Here!</label>
                                </div>
                            </Col>
                            <Col sm="2">
                                <button className="message-button learn-more">Send Message</button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
