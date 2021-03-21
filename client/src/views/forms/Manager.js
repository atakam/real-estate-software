import React from "react";
import {
    Card,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    FormTextarea,
    Button
} from "shards-react";
import { updateManager, createManager } from "../../utils/actions";

const UserAccountDetails = ({ manager, callback }) => {

    const id = manager ? manager.id : null;
    const [firstName, setFirstName] = React.useState(manager ? manager.firstName : '');
    const [lastName, setLastName] = React.useState(manager ? manager.lastName : '');
    const [phoneNumber, setPhoneNumber] = React.useState(manager ? manager.phoneNumber : '');
    const [waNumber, setWANumber] = React.useState(manager ? manager.waNumber : '');
    const [email, setEmail] = React.useState(manager ? manager.email : '');
    const [notes, setNotes] = React.useState(manager ? manager.notes : '');

    const values = {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        waNumber,
        notes
    };

    const submitManager = () => {
        if (id) { // update manager
            updateManager(values, callback);
        } else { // create manager
            createManager(values, callback);
        }
    }

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
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feFirstName">Prenom</label>
                                        <FormInput
                                            id="feFirstName"
                                            placeholder="Prenom"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feLastName">Nom</label>
                                        <FormInput
                                            id="feLastName"
                                            placeholder="Nom"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.currentTarget.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="fePhoneNumber">Numero de Téléphone</label>
                                        <FormInput
                                            id="fePhoneNumber"
                                            placeholder="Numero de Téléphone"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feWANumber">WhatsApp Number</label>
                                        <FormInput
                                            id="feWANumber"
                                            placeholder="WhatsApp Number"
                                            value={waNumber === null ? phoneNumber : waNumber}
                                            onChange={(e) => setWANumber(e.currentTarget.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feEmail">Email</label>
                                        <FormInput
                                            type="email"
                                            id="feEmail"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.currentTarget.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    {/* Description */}
                                    <Col md="12" className="form-group">
                                        <label htmlFor="feDescription">Notes</label>
                                        <FormTextarea id="feDescription" rows="5"
                                            value={notes}
                                            onChange={(e) => setNotes(e.currentTarget.value)}
                                        />
                                    </Col>
                                </Row>
                                <Button theme="accent" onClick={submitManager}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default UserAccountDetails;
