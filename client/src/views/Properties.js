import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';

import PageTitle from "../components/common/PageTitle";
import Dialog from "../components/common/Dialog";
import Property from "./forms/Property";
import Confirm from "../components/common/Confirm";

import { deleteProperty } from "../utils/actions";

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openPropertyDialog: false,
      confirmDialog: false,
      property: null,
      properties: []
    }
  }

  openProperty = (property) => {
    this.setState({
      openPropertyDialog: true
    });
  };

  closeDialog = () => {
    this.setState({
      openPropertyDialog: false,
      property: null,
      confirmDialog: false
    });
  };

  createProperty = () => {
    this.setState({
      dialogTitle: 'Ajouter une Propriété'
    }, this.openProperty);
  }

  editProperty = (id) => {
    const property = this.getProperty(id);
    this.setState({
      property,
      dialogTitle: `Modifier (${property.propertyName} ${property.unit})`
    }, this.openProperty);
  }

  deleteProperty = (id) => {
    const property = this.getProperty(id);
    this.setState({
      confirmDialog: true,
      dialogTitle: `Supprimer ${property.propertyName} ${property.unit}?`,
      deletePropertyId: id
    });
  }

  getProperty = (id) => {
    let property = null;
    this.state.properties.forEach((t) => {
      if (t.id === id) {
        property = t;
      }
    });
    return property;
  }

  getProperties = () => {
    fetch('/property/findAll')
      .then(response => response.json())
      .then(data => this.setState({ properties: data }))
      .catch(error => console.error(error.message));
  }

  handleCallback = () => {
    this.getProperties();
    this.closeDialog();
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.openPropertyDialog}
          onClose={this.closeDialog}
          content={<Property property={this.state.property} callback={this.handleCallback} />}
        />
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.confirmDialog}
          onClose={this.closeDialog}
          width='sm'
          content={
            <Confirm
              text={'Êtes-vous sûr de vouloir supprimer cette proprieté?'}
              onConfirm={() => deleteProperty(this.state.deletePropertyId, this.handleCallback)}
              onCancel={this.closeDialog}
            />}
        />
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle lg="10" title="Propriétés" subtitle="Liste de tous les proprietés" className="text-sm-left" />
          <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.createProperty}>
            <AddIcon /> AJOUTER LOCATAIRE
          </Button>
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              {/* <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader> */}
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Nom
                      </th>
                      <th scope="col" className="border-0">
                        Unité
                      </th>
                      <th scope="col" className="border-0">
                        Gerant
                      </th>
                      <th scope="col" className="border-0">
                        Notes
                      </th>
                      <th scope="col" className="border-0">
                        Contrat
                      </th>
                      <th scope="col" className="border-0">
                        Statut
                      </th>
                      <th scope="col" className="border-0">
                        Contrôles
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.properties.map((t, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{t.propertyName}</td>
                            <td>{t.unit}</td>
                            <td>{t.manager}</td>
                            <td>{t.notes}</td>
                            <td>{t.contract_id}</td>
                            <td>{t.isActive ?
                              <Button outline size="sm" theme="success" className="mb-2 mr-1">
                                Actif
                            </Button> :
                              <Button outline size="sm" theme="danger" className="mb-2 mr-1">
                                Suspendu
                            </Button>}</td>
                            <td className='list-controls'>
                              <Tooltip title="Modifier Propriété">
                                <IconButton aria-label="edit property" color="primary" onClick={() => this.editProperty(t.id)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Modifier Contrat">
                                <IconButton aria-label="edit contract" color="primary">
                                  <DescriptionIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Supprimer Propriété">
                                <IconButton aria-label="delete property" color="secondary"
                                  onClick={() => this.deleteProperty(t.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tables;
