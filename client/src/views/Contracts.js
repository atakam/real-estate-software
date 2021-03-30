import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { IconButton, Tooltip, Popover, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';

import PageTitle from "../components/common/PageTitle";
import Dialog from "../components/common/Dialog";
import Contract from "./forms/Contract";
import Confirm from "../components/common/Confirm";

import { deleteContract } from "../utils/actions";

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
      contracts: []
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
      contract: null,
      confirmDialog: false,
      popoverContent: null,
      openPopover: false,
      anchorEl: null
    });
  };

  createContract = () => {
    this.setState({
      dialogTitle: 'Ajouter un Contrat'
    }, this.openContract);
  }

  editContract = (id) => {
    const contract = this.getContract(id);
    this.setState({
      contract,
      dialogTitle: `Modifier (${contract.firstName} ${contract.lastName})`
    }, this.openContract);
  }

  deleteContract = (id) => {
    const contract = this.getContract(id);
    this.setState({
      confirmDialog: true,
      dialogTitle: `Supprimer ${contract.firstName} ${contract.lastName}?`,
      deleteContractId: id
    });
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

  componentDidMount() {
    this.getContracts();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.openContractDialog}
          onClose={this.closeDialog}
          width={null}
          content={<Contract contract={this.state.contract} callback={this.handleCallback} />}
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
                            <td>{t.firstName + ' ' + t.lastName}</td>
                            <td>{t.phoneNumber}</td>
                            <td>{t.waNumber}</td>
                            <td>{t.email}</td>
                            <td>
                              <Button outline size="sm" theme="secondary" className="mb-2 mr-1" onClick={(e) => this.openPopover({ notes: t.notes, anchorEl: e.currentTarget })}>
                                Notes
                              </Button>
                            </td>
                            <td className='list-controls'>
                              <Tooltip title="Modifier Contrat">
                                <IconButton aria-label="edit contract" color="primary" onClick={() => this.editContract(t.id)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Modifier Contrat">
                                <IconButton aria-label="edit contract" color="primary">
                                  <DescriptionIcon />
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
