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
import { updateTenant, createTenant } from "../../utils/actions";

const UserAccountDetails = ({ tenant, callback }) => {

    const id = tenant ? tenant.id : null;
    const [firstName, setFirstName] = React.useState(tenant ? tenant.firstName : '');
    const [lastName, setLastName] = React.useState(tenant ? tenant.lastName : '');
    const [dateOfBirth, setDOB] = React.useState(tenant ? tenant.dateOfBirth : '');
    const [phoneNumber, setPhoneNumber] = React.useState(tenant ? tenant.phoneNumber : '');
    const [waNumber, setWANumber] = React.useState(tenant ? tenant.waNumber : '');
    const [email, setEmail] = React.useState(tenant ? tenant.email : '');
    const [isActive, setActive] = React.useState(tenant ? tenant.isActive : true);
    const [cni, setCNI] = React.useState(tenant ? tenant.cni : '');
    const [cni_date, setCNIDate] = React.useState(tenant ? tenant.cni_date : '');
    const [address, setAddress] = React.useState(tenant ? tenant.address : '');
    const [job, setJob] = React.useState(tenant ? tenant.job : '');
    const [notes, setNotes] = React.useState(tenant ? tenant.notes : '');

    const values = {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        waNumber,
        dateOfBirth: dateOfBirth.split('T')[0],
        isActive,
        cni,
        cni_date: cni_date.split('T')[0],
        job,
        address,
        notes
    };

    const submitTenant = () => {
        if (id) { // update tenant
            updateTenant(values, callback);
        } else { // create tenant
            createTenant(values, callback);
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
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feDOB">Date de Naissance</label>
                                        <FormInput
                                            type="date"
                                            id="feDOB"
                                            placeholder="Date de Naissance"
                                            value={dateOfBirth}
                                            onChange={(e) => setDOB(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feCNI">Numero de CNI</label>
                                        <FormInput
                                            id="feCNI"
                                            placeholder="CNI"
                                            value={cni}
                                            onChange={(e) => setCNI(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feCNIDate">Date deliverance (CNI)</label>
                                        <FormInput
                                            type="date"
                                            id="feCNIDate"
                                            placeholder="Date de deliverance"
                                            value={cni_date}
                                            onChange={(e) => setCNIDate(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feJob">Profession</label>
                                        <FormInput
                                            id="feJob"
                                            placeholder="Preofession"
                                            value={job}
                                            onChange={(e) => setJob(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feAddress">Domicilié à</label>
                                        <FormInput
                                            id="feAddress"
                                            placeholder="Domicilié à"
                                            value={address}
                                            onChange={(e) => setAddress(e.currentTarget.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="4" className="form-group">
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
                                <Button theme="accent" onClick={submitTenant}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default UserAccountDetails;
