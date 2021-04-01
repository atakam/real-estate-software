import React from "react";
import {
    Card,
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    FormTextarea,
    Button
} from "shards-react";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Tooltip } from '@material-ui/core';
import SimpleTabs from "../../components/common/Tabs";
import { updateContract, createContract } from "../../utils/actions";
import { getTodayDate } from "../../utils/utils";
import ContractView from '../ContractView';

const UserAccountDetails = ({ contract, templates, tenants, properties, setTabValue, callback }) => {

    const id = contract ? contract.id : null;
    const [template, setTemplate] = React.useState(contract && contract.template_id ? contract.template_id : templates[0].id || '');
    const [property, setProperty] = React.useState(contract && contract.property_id ? contract.property_id : '');
    const [landlord, setLandlord] = React.useState(contract ? contract.landlord : 'Mme MAGNE Epse TAKAM Odile');
    const [tenant_ids, setTenants] = React.useState(contract ? JSON.parse(contract.tenant_ids) : []);
    const [lender, setLender] = React.useState(contract ? contract.lender : 'LE CREDIT FONCIER DU CAMEROUN');
    const [reference, setReference] = React.useState(contract ? contract.reference : '');

    const [rent_type, setRentType] = React.useState(contract && contract.rent_type || 'unfurnished');
    const [duration, setDuration] = React.useState(contract ? contract.duration : '');
    const [payment_frequency, setPaymentFrequency] = React.useState(contract && contract.payment_frequency || 'monthly');
    const [amount, setAmount] = React.useState(contract ? contract.duration : '');
    const [deposit, setDeposit] = React.useState(contract ? contract.deposit : '');
    const [caution, setCaution] = React.useState(contract ? contract.caution : '');
    const [start_date, setStartDate] = React.useState(contract ? contract.start_date.split('T')[0] : getTodayDate());
    const [deposit_date, setDepositDate] = React.useState(contract ? contract.deposit_date.split('T')[0] : getTodayDate());
    const [revision_date, setRevisionDate] = React.useState(contract ? contract.revision_date.split('T')[0] : getTodayDate({ addYear: 1 }));
    const [payment_location, setPaymentLocation] = React.useState(contract ? contract.payment_location : '');
    const [notes, setNotes] = React.useState(contract ? contract.notes : '');

    const values = {
        id,
        reference,
        template_id: template,
        property_id: property,
        lender,
        landlord,
        tenant_ids: JSON.stringify(tenant_ids),

        rent_type,
        duration,
        payment_frequency,
        amount,
        deposit,
        caution,
        start_date: start_date.split('T')[0],
        deposit_date: deposit_date.split('T')[0],
        revision_date: revision_date.split('T')[0],
        payment_location,
        notes
    };

    const submitContract = () => {
        if (id) { // update contract
            updateContract(values, callback);
        } else { // create contract
            createContract(values, callback);
        }
    }

    const addTenant = (tid) => {
        setTenants([...tenant_ids, tid]);
    }

    const removeTenant = (tid) => {
        const tids = [...tenant_ids];
        const index = tids.indexOf(tid);
        if (index > -1) {
            tids.splice(index, 1);
        }
        setTenants(tids);
    }

    const getTenant = (tid) => {
        let tenant = null;
        tenants.forEach((t) => {
            if (t.id == tid) {
                tenant = t;
            }
        });
        return tenant;
    }

    const getTemplate = () => {
        let _template = null;
        templates.forEach((t) => {
            if (t.id == template) {
                _template = t;
            }
        });
        return _template;
    }

    const getProperty = () => {
        let _property = null;
        properties.forEach((t) => {
            if (t.id == property) {
                _property = t;
            }
        });
        return _property;
    }

    const step1 = {
        label: 'Engagement',
        content: (
            <Row>
                <Col>
                    <Form>
                        <Row form>
                            <Col md="6" className="form-group">
                                <label htmlFor="feTemplate">Modèle</label>
                                <FormSelect
                                    id="feTemplate"
                                    value={template}
                                    onChange={(e) => setTemplate(e.currentTarget.value)}
                                >
                                    {
                                        templates.map((t) => {
                                            return (
                                                <option key={t.id} value={t.id} >{t.t_name}</option>
                                            );
                                        })
                                    }
                                </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                                <label htmlFor="feReference">Numero de reference</label>
                                <FormInput
                                    id="feReference"
                                    placeholder="Reference"
                                    value={reference}
                                    onChange={(e) => setReference(e.currentTarget.value)}
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row form>
                            <Col md="6" className="form-group">
                                <label htmlFor="feLandlord">Le Bailleur</label>
                                <FormInput
                                    id="feLandlord"
                                    placeholder="Bailleur"
                                    value={landlord}
                                    onChange={(e) => setLandlord(e.currentTarget.value)}
                                />
                            </Col>
                            {
                                Number(getTemplate().number_parties) > 2 && (
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feLender">Le Preteur</label>
                                        <FormInput
                                            id="feLender"
                                            placeholder="Preteur"
                                            value={lender}
                                            onChange={(e) => setLender(e.currentTarget.value)}
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                        <Row form>
                            {
                                tenant_ids.map((tid, idx) => {
                                    return (
                                        <>
                                            <Col md="4" className="form-group">
                                                <label htmlFor="feTenant">{'Locataire #' + (idx + 1)}</label>
                                                <FormInput
                                                    id="feTenant"
                                                    placeholder={"Locataire #" + (idx + 1)}
                                                    value={getTenant(tid).firstName + '' + getTenant(tid).lastName}
                                                    disabled
                                                />
                                                <Tooltip title="Supprimer Locataire" className='delete-tenant-contract'>
                                                    <IconButton aria-label="delete template" color="secondary"
                                                        onClick={() => removeTenant(tid)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Col>
                                        </>
                                    );
                                })
                            }
                            <Col md="4" className="form-group">
                                <label htmlFor="feTenant">Locataire</label>
                                <FormSelect
                                    id="feTenant"
                                    value={''}
                                    onChange={(e) => addTenant(e.currentTarget.value)}
                                >
                                    <option value={''} >{'Sélectionnez un locataire'}</option>
                                    {
                                        tenants.map((t) => {
                                            if (!tenant_ids.includes(String(t.id))) {
                                                return (
                                                    <option key={t.id} value={t.id} >{t.firstName + ' ' + t.lastName}</option>
                                                );
                                            } else {
                                                return <></>;
                                            }
                                        })
                                    }
                                </FormSelect>
                            </Col>
                        </Row>
                        <hr />
                        <Row form>
                            <Col md="6" className="form-group">
                                <label htmlFor="feProperty">Le Logement</label>
                                <FormSelect
                                    id="feProperty"
                                    value={property}
                                    onChange={(e) => setProperty(e.currentTarget.value)}
                                >
                                    <option value={''} >{'Sélectionnez un logement'}</option>
                                    {
                                        properties.map((t) => {
                                            return (
                                                <option key={t.id} value={t.id} >{t.propertyName + ' ' + t.unit}</option>
                                            );
                                        })
                                    }
                                </FormSelect>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        )
    };

    const step2 = {
        label: 'Charateristiques du bail',
        content: (
            <Row>
                <Col>
                    <Form>
                        <Row form>
                            <Col md="4" className="form-group">
                                <label htmlFor="feType">Type de Bail</label>
                                <FormSelect
                                    id="feType"
                                    value={rent_type}
                                    onChange={(e) => setRentType(e.currentTarget.value)}
                                >
                                    <option value={'unfurnished'} >{'Non Meublé'}</option>
                                    <option value={'furnished'} >{'Meublé'}</option>
                                </FormSelect>
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="feDuration">Durée du Bail</label>
                                <FormInput
                                    id="feDuration"
                                    placeholder="Durée"
                                    value={duration}
                                    onChange={(e) => setDuration(e.currentTarget.value)}
                                />
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="fePayFrequency">Fréquence de paiement</label>
                                <FormSelect
                                    id="fePayFrequency"
                                    value={payment_frequency}
                                    onChange={(e) => setPaymentFrequency(e.currentTarget.value)}
                                >
                                    <option value={'monthly'} >{'Mensuel'}</option>
                                    <option value={'yealry'} >{'Anuel'}</option>
                                </FormSelect>
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="feAmount">Montant du Bail</label>
                                <FormInput
                                    id="feAmount"
                                    placeholder="Montant"
                                    value={amount}
                                    onChange={(e) => setAmount(e.currentTarget.value)}
                                />
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="feDeposit">Montant du Depôt</label>
                                <FormInput
                                    id="feDeposit"
                                    placeholder="Depôt"
                                    value={deposit}
                                    onChange={(e) => setDeposit(e.currentTarget.value)}
                                />
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="feCaution">Montant de la Caution</label>
                                <FormInput
                                    id="feCaution"
                                    placeholder="Caution"
                                    value={caution}
                                    onChange={(e) => setCaution(e.currentTarget.value)}
                                />
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="feStartDate">Date de Début du Bail</label>
                                <FormInput
                                    type="date"
                                    id="feStartDate"
                                    placeholder="Date de Début du Bail"
                                    value={start_date}
                                    onChange={(e) => setStartDate(e.currentTarget.value)}
                                />
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="feDepositDate">Date de Versement du Depôt</label>
                                <FormInput
                                    type="date"
                                    id="feDepositDate"
                                    placeholder="Date de Versement du Depôt"
                                    value={deposit_date}
                                    onChange={(e) => setDepositDate(e.currentTarget.value)}
                                />
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="feRevisionDate">Date de Revision du Bail</label>
                                <FormInput
                                    type="date"
                                    id="feRevisionDate"
                                    placeholder="Date de Revision du Bail"
                                    value={revision_date}
                                    onChange={(e) => setRevisionDate(e.currentTarget.value)}
                                />
                            </Col>
                            <Col md="4" className="form-group">
                                <label htmlFor="fePaymentLocation">Lieu de Paiement</label>
                                <FormInput
                                    id="fePaymentLocation"
                                    placeholder="Lieu de Paiement"
                                    value={payment_location}
                                    onChange={(e) => setPaymentLocation(e.currentTarget.value)}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            {/* Description */}
                            <Col md="12" className="form-group">
                                <label htmlFor="feDescription">Autres Notes</label>
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
        )
    };

    const step3 = {
        label: 'Apercu',
        content: (
            <ContractView
                template={getTemplate()}
                tenant={getTenant(tenant_ids[0])}
                property={getProperty()}
                contract={{ ...values }}
            />
        )
    };

    return (
        <Card small className="lg-8">
            {/* <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
        </CardHeader> */}
            <SimpleTabs items={[step1, step2, step3]} setTabValue={setTabValue} />
        </Card>
    )
}

export default UserAccountDetails;
