import React from "react";
import {
    Card,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    Button
} from "shards-react";

const UserAccountDetails = ({ onConfirm, onCancel, text }) => {
    return (
        <Card small className="lg-8">
            {/* <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
        </CardHeader> */}
            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Row>
                        <Col>
                            <Form>
                                <Row form>
                                    <Col md="12" className="form-group">
                                        {text}
                                    </Col>
                                </Row>

                                <Button theme="secondary" onClick={onCancel}>Cancel</Button>
                                <Button theme="danger" onClick={onConfirm}
                                    style={{ float: 'right' }}>Confirm</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default UserAccountDetails;
