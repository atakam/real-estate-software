import React from "react";
import {
    Card,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    FormTextarea,
    Button
} from "shards-react";
import { updateProperty, createProperty } from "../../utils/actions";

const UserAccountDetails = ({ property, callback }) => {

    const id = property ? property.id : null;
    const [propertyName, setPropertyName] = React.useState(property ? property.propertyName : '');
    const [unit, setUnit] = React.useState(property ? property.unit : '');
    const [isActive, setActive] = React.useState(property ? property.isActive : true);
    const [notes, setNotes] = React.useState(property ? property.notes : '');

    const values = {
        id,
        propertyName,
        unit,
        isActive,
        notes
    };

    const submitProperty = () => {
        if (id) { // update property
            updateProperty(values, callback);
        } else { // create property
            createProperty(values, callback);
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
                                        <label htmlFor="fePropertyName">Nom de propriété</label>
                                        <FormInput
                                            id="fePropertyName"
                                            placeholder="Nom de propriété"
                                            value={propertyName}
                                            onChange={(e) => setPropertyName(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feUnit">Unité</label>
                                        <FormInput
                                            id="feUnit"
                                            placeholder="Unité"
                                            value={unit}
                                            onChange={(e) => setUnit(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feActive">Statut</label>
                                        <FormSelect
                                            id="feActive"
                                            value={isActive}
                                            onChange={(e) => setActive(e.currentTarget.value)}
                                        >
                                            <option value={true} >Actif</option>
                                            <option value={false}>Suspendre</option>
                                        </FormSelect>
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
                                <Button theme="accent" onClick={submitProperty}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default UserAccountDetails;
