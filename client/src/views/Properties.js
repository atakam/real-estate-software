import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { IconButton, Tooltip, Popover, Typography } from '@material-ui/core';
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
      openPopover: false,
      popoverContent: null,
      anchorEl: null,
      property: null,
      properties: [],
      managers: []
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
      confirmDialog: false,
      popoverContent: null,
      openPopover: false,
      anchorEl: null
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

  getManager = (id) => {
    let manager = {};
    this.state.managers.forEach((t) => {
      if (t.id === id) {
        manager = t;
      }
    });
    manager.name = manager.firstName ? manager.firstName + ' ' + manager.lastName : '';
    return manager;
  }

  getProperties = () => {
    fetch('/property/findAll')
      .then(response => response.json())
      .then(data => this.setState({ properties: data }))
      .catch(error => console.error(error.message));
  }

  getManagers = () => {
    fetch('/manager/findAll')
      .then(response => response.json())
      .then(data => this.setState({ managers: data }))
      .catch(error => console.error(error.message));
  }

  handleCallback = () => {
    this.getProperties();
    this.closeDialog();
  }

  openPopover = ({ notes, anchorEl }) => {
    this.setState({
      popoverContent: notes || 'Pas de notes',
      anchorEl,
      openPopover: true
    });
  }

  componentDidMount() {
    this.getProperties();
    this.getManagers();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.openPropertyDialog}
          onClose={this.closeDialog}
          content={
            <Property
              property={this.state.property}
              callback={this.handleCallback}
              managers={this.state.managers}
            />
          }
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
        <Popover
          open={this.state.openPopover}
          anchorEl={this.state.anchorEl}
          onClose={this.closeDialog}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={'list-notes'}>{this.state.popoverContent}</Typography>
        </Popover>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle lg="10" title="Propriétés" subtitle="Liste de tous les proprietés" className="text-sm-left" />
          <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.createProperty}>
            <AddIcon /> AJOUTER PROPRIÉTÉ
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
                        Concierge
                      </th>
                      <th scope="col" className="border-0">
                        Contrat
                      </th>
                      <th scope="col" className="border-0">
                        Notes
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
                            <td>{this.getManager(t.manager_id).name}</td>
                            <td>{t.contract_id}</td>
                            <td>
                              <Button outline size="sm" theme="secondary" className="mb-2 mr-1" onClick={(e) => this.openPopover({ notes: t.notes, anchorEl: e.currentTarget })}>
                                Notes
                              </Button>
                            </td>
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
