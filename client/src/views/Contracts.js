import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { IconButton, Tooltip, Popover, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import DownloadIcon from '@material-ui/icons/GetApp';

import PageTitle from "../components/common/PageTitle";
import Dialog from "../components/common/Dialog";
import Contract from "./forms/Contract";
import Confirm from "../components/common/Confirm";
import ContractView from './ContractView';

import { deleteContract } from "../utils/actions";
import { getDateDayDiff } from "../utils/utils";

import { downloadDoc } from '../utils/actions';

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openContractDialog: false,
      confirmDialog: false,
      openPopover: false,
      popoverContent: null,
      anchorEl: null,
      contract: null,
      contracts: [],
      templates: [],
      properties: [],
      tenants: [],
      tabValue: 0,
      docxPath: ''
    }
  }

  openContract = (contract) => {
    this.setState({
      openContractDialog: true
    });
  };

  closeDialog = () => {
    this.setState({
      openContractDialog: false,
      viewContractDialog: false,
      contract: null,
      confirmDialog: false,
      popoverContent: null,
      openPopover: false,
      anchorEl: null,
      tabValue: 0
    });
  };

  createContract = () => {
    this.setState({
      dialogTitle: 'Créer un Contrat'
    }, this.openContract);
  }

  editContract = (id) => {
    const contract = this.getContract(id);
    this.setState({
      contract,
      dialogTitle: `Modifier Contrat No. ${contract.reference}`
    }, this.openContract);
  }

  viewContract = (id) => {
    const contract = this.getContract(id);
    this.setState({
      contract,
      dialogTitle: `Apercu du Contrat No. ${contract.reference}`,
      viewContractDialog: true
    });
  }

  deleteContract = (id) => {
    const contract = this.getContract(id);
    this.setState({
      confirmDialog: true,
      dialogTitle: `Supprimer Contrat No. ${contract.reference}`,
      deleteContractId: id
    });
  }

  setTabValue = (tabValue) => {
    this.setState({ tabValue })
  }

  getContract = (id) => {
    let contract = null;
    this.state.contracts.forEach((t) => {
      if (t.id === id) {
        contract = t;
      }
    });
    return contract;
  }

  getContracts = () => {
    fetch('/contract/findAll')
      .then(response => response.json())
      .then(data => this.setState({ contracts: data }))
      .catch(error => console.error(error.message));
  }

  getTemplates = () => {
    fetch('/template/findAll')
      .then(response => response.json())
      .then(data => this.setState({ templates: data }))
      .catch(error => console.error(error.message));
  }

  getTenants = () => {
    fetch('/tenant/findAll')
      .then(response => response.json())
      .then(data => this.setState({ tenants: data }))
      .catch(error => console.error(error.message));
  }

  getProperties = () => {
    fetch('/property/findAll')
      .then(response => response.json())
      .then(data => this.setState({ properties: data }))
      .catch(error => console.error(error.message));
  }

  handleCallback = () => {
    this.getContracts();
    this.closeDialog();
  }

  openPopover = ({ notes, anchorEl }) => {
    this.setState({
      popoverContent: notes || 'Pas de notes',
      anchorEl,
      openPopover: true
    });
  }

  getTenant = (tid) => {
    let tenant = null;
    this.state.tenants.forEach((t) => {
      if (t.id == tid) {
        tenant = t;
      }
    });
    return tenant;
  }

  getTemplate = (id) => {
    let template = null;
    this.state.templates.forEach((t) => {
      if (t.id === id) {
        template = t;
      }
    });
    return template;
  }

  getTenantDisplay = (tids) => {
    return JSON.parse(tids).map((tid) => {
      const tenant = this.getTenant(tid);
      return (
        <div className='tenant-list-contract'>{tenant.firstName + ' ' + tenant.lastName}</div>
      );
    });
  }

  getProperty = (pid) => {
    let _property = {
      propertyName: '',
      unit: ''
    };
    this.state.properties.forEach((t) => {
      if (t.id == pid) {
        _property = t;
      }
    });
    return _property;
  }

  componentDidMount() {
    this.getTemplates();
    this.getTenants();
    this.getProperties();
    this.getContracts();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.openContractDialog}
          onClose={this.closeDialog}
          icons={this.state.tabValue === 2 && this.state.contract &&
            [<IconButton
              aria-label="download"
              onClick={() => downloadDoc(
                {
                  filename: "Contrat-" + this.state.contract.reference + ".docx",
                  values: {
                    headerTitle: this.getTemplate(this.state.contract.template_id).t_name + "<br>N°" + this.state.contract.reference,
                    htmlMarkup: document.getElementById('contract-container').innerHTML
                  }
                })
              }
              color="primary"
            >
              <DownloadIcon />
            </IconButton>]
          }
          fullScreen
          content={<Contract contract={this.state.contract} templates={this.state.templates} tenants={this.state.tenants} properties={this.state.properties} callback={this.handleCallback} setTabValue={this.setTabValue} />}
        />
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.viewContractDialog && this.state.contract}
          onClose={this.closeDialog}
          icons={this.state.contract &&
            [<IconButton
              aria-label="download"
              onClick={() => downloadDoc(
                {
                  filename: "Contrat-" + this.state.contract.reference + ".docx",
                  values: {
                    headerTitle: this.getTemplate(this.state.contract.template_id).t_name + "<br>N°" + this.state.contract.reference,
                    htmlMarkup: document.getElementById('contract-container').innerHTML
                  }
                })
              }
              color="primary"
            >
              <DownloadIcon />
            </IconButton>]
          }
          fullScreen
          content={
            <ContractView
              template={this.state.contract && this.getTemplate(this.state.contract.template_id)}
              tenant={this.state.contract && this.getTenant(JSON.parse(this.state.contract.tenant_ids)[0])}
              property={this.state.contract && this.getProperty(this.state.contract.property_id)}
              contract={this.state.contract}
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
              text={'Êtes-vous sûr de vouloir supprimer ce contrat?'}
              onConfirm={() => deleteContract(this.state.deleteContractId, this.handleCallback)}
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
          <PageTitle lg="10" title="Contrats" subtitle="Liste de tous les contrats" className="text-sm-left" />
          <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.createContract}>
            <AddIcon /> AJOUTER CONTRAT
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
                        No. de référence
                      </th>
                      <th scope="col" className="border-0">
                        Modèle
                      </th>
                      <th scope="col" className="border-0">
                        Locataires
                      </th>
                      <th scope="col" className="border-0">
                        Propriété
                      </th>
                      <th scope="col" className="border-0">
                        Date de revision
                      </th>
                      <th scope="col" className="border-0">
                        Notes
                      </th>
                      <th scope="col" className="border-0">
                        Contrôles
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.contracts.map((t, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{t.reference}</td>
                            <td>{this.state.templates.length > 0 && this.getTemplate(t.template_id).t_name}</td>
                            <td>
                              <Button outline size="sm" theme="primary" className="mb-2 mr-1" onClick={(e) => this.openPopover({ notes: this.getTenantDisplay(t.tenant_ids), anchorEl: e.currentTarget })}>
                                Voir Locataires
                              </Button>
                            </td>
                            <td>{this.getProperty(t.property_id).propertyName + ' - ' + this.getProperty(t.property_id).unit}</td>
                            <td style={getDateDayDiff({ referenceDate: new Date(t.revision_date), dateToCompare: new Date() }) <= 30 ? { color: 'red' } : { color: 'initial' }}>
                              {t.revision_date && t.revision_date.split('T')[0]}
                            </td>
                            <td>
                              <Button outline size="sm" theme="secondary" className="mb-2 mr-1" onClick={(e) => this.openPopover({ notes: t.notes, anchorEl: e.currentTarget })}>
                                Notes
                              </Button>
                            </td>
                            <td className='list-controls'>
                              <Tooltip title="View Contrat">
                                <IconButton aria-label="edit contract" color="primary" onClick={() => this.viewContract(t.id)}>
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Modifier Contrat">
                                <IconButton aria-label="edit contract" color="primary" onClick={() => this.editContract(t.id)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Supprimer Contrat">
                                <IconButton aria-label="delete contract" color="secondary"
                                  onClick={() => this.deleteContract(t.id)}>
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
