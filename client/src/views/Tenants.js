import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';

import PageTitle from "../components/common/PageTitle";
import Dialog from "../components/common/Dialog";
import Tenant from "./forms/Tenant";
import Confirm from "../components/common/Confirm";

import { deleteTenant } from "../utils/actions";

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openTenantDialog: false,
      confirmDialog: false,
      tenant: null,
      tenants: []
    }
  }

  openTenant = (tenant) => {
    this.setState({
      openTenantDialog: true
    });
  };

  closeDialog = () => {
    this.setState({
      openTenantDialog: false,
      tenant: null,
      confirmDialog: false
    });
  };

  createTenant = () => {
    this.setState({
      dialogTitle: 'Ajouter un Locataire'
    }, this.openTenant);
  }

  editTenant = (id) => {
    const tenant = this.getTenant(id);
    this.setState({
      tenant,
      dialogTitle: `Modifier (${tenant.firstName} ${tenant.lastName})`
    }, this.openTenant);
  }

  deleteTenant = (id) => {
    const tenant = this.getTenant(id);
    this.setState({
      confirmDialog: true,
      dialogTitle: `Supprimer ${tenant.firstName} ${tenant.lastName}?`,
      deleteTenantId: id
    });
  }

  getTenant = (id) => {
    let tenant = null;
    this.state.tenants.forEach((t) => {
      if (t.id === id) {
        tenant = t;
      }
    });
    return tenant;
  }

  getTenants = () => {
    fetch('/tenant/findAll')
      .then(response => response.json())
      .then(data => this.setState({ tenants: data }))
      .catch(error => console.error(error.message));
  }

  handleCallback = () => {
    this.getTenants();
    this.closeDialog();
  }

  componentDidMount() {
    this.getTenants();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.openTenantDialog}
          onClose={this.closeDialog}
          content={<Tenant tenant={this.state.tenant} callback={this.handleCallback} />}
        />
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.confirmDialog}
          onClose={this.closeDialog}
          width='sm'
          content={
            <Confirm
              text={'Êtes-vous sûr de vouloir supprimer ce locataire?'}
              onConfirm={() => deleteTenant(this.state.deleteTenantId, this.handleCallback)}
              onCancel={this.closeDialog}
            />}
        />
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle lg="10" title="Locataires" subtitle="Liste de tous les locataires" className="text-sm-left" />
          <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.createTenant}>
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
                        Téléphone
                      </th>
                      <th scope="col" className="border-0">
                        WhatsApp
                      </th>
                      <th scope="col" className="border-0">
                        Email
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
                      this.state.tenants.map((t, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{t.firstName + ' ' + t.lastName}</td>
                            <td>{t.phoneNumber}</td>
                            <td>{t.waNumber}</td>
                            <td>{t.email}</td>
                            <td>{t.property_id}</td>
                            <td>{t.isActive ?
                              <Button outline size="sm" theme="success" className="mb-2 mr-1">
                                Actif
                            </Button> :
                              <Button outline size="sm" theme="danger" className="mb-2 mr-1">
                                Suspendu
                            </Button>}</td>
                            <td className='list-controls'>
                              <Tooltip title="Modifier Locataire">
                                <IconButton aria-label="edit tenant" color="primary" onClick={() => this.editTenant(t.id)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Modifier Contrat">
                                <IconButton aria-label="edit contract" color="primary">
                                  <DescriptionIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Supprimer Locataire">
                                <IconButton aria-label="delete tenant" color="secondary"
                                  onClick={() => this.deleteTenant(t.id)}>
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
