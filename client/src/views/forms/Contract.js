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
import { updateContract, createContract } from "../../utils/actions";

const UserAccountDetails = ({ contract, callback }) => {

    const id = contract ? contract.id : null;
    const [firstName, setFirstName] = React.useState(contract ? contract.firstName : '');
    const [lastName, setLastName] = React.useState(contract ? contract.lastName : '');
    const [phoneNumber, setPhoneNumber] = React.useState(contract ? contract.phoneNumber : '');
    const [waNumber, setWANumber] = React.useState(contract ? contract.waNumber : '');
    const [email, setEmail] = React.useState(contract ? contract.email : '');
    const [notes, setNotes] = React.useState(contract ? contract.notes : '');

    const values = {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        waNumber,
        notes
    };

    const submitContract = () => {
        if (id) { // update contract
            updateContract(values, callback);
        } else { // create contract
            createContract(values, callback);
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
                                <Button theme="accent" onClick={submitContract}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default UserAccountDetails;
