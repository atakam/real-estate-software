import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';

import PageTitle from "../components/common/PageTitle";
import Dialog from "../components/common/Dialog";
import NewTenant from "./forms/NewTenant";

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openTenantDialog: false,
      tenant: null,
      tenants: []
    }
  }

  openTenant = () => {
    this.setState({
      openTenantDialog: true
    });
  };

  closeTenant = () => {
    this.setState({
      openTenantDialog: false,
      tenant: null
    });
  };

  editTenant = (id) => {
    this.setState({
      tenant: this.getTenant(id)
    }, this.openTenant);
  }

  getTenant = (id) => {
    let tenant = null;
    this.state.tenants.forEach((t) => {
      if (t.id === id) {
        tenant = t;
      }
    });
    this.setState({ tenant });
  }

  getTenants = () => {
    return []
  }

  handleCallback = () => {
    this.getTenants();
    this.closeTenant();
  }

  componentDidMount() {
    this.getTenants();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Dialog
          title={'Ajouter un Locataire'}
          open={this.state.openTenantDialog}
          onClose={this.closeTenant}
          content={<NewTenant tenant={this.state.tenant} callback={this.handleCallback} />}
        />
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle lg="10" title="Locataires" subtitle="Liste de tous les locataires" className="text-sm-left" />
          <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.openTenant}>
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
                    <tr>
                      <td>1</td>
                      <td>Austin Takam Nzokam</td>
                      <td>514-967-0418</td>
                      <td>514-967-0418</td>
                      <td>austin.takam@sihone.com</td>
                      <td>SOHELI E41</td>
                      <td>ACTIVE</td>
                      <td className='list-controls'>
                        <Tooltip title="Modifier Locataire">
                          <IconButton aria-label="edit tenant" color="primary" onClick={this.editTenant}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Modifier Contrat">
                          <IconButton aria-label="edit contract" color="primary">
                            <DescriptionIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer Locataire">
                          <IconButton aria-label="delete tenant" color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
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
