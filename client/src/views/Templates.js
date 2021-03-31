import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

import PageTitle from "../components/common/PageTitle";
import Dialog from "../components/common/Dialog";
import Template from "./forms/Template";
import Confirm from "../components/common/Confirm";

import { deleteTemplate } from "../utils/actions";
import TemplateView from './ContractView';

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openTemplateDialog: false,
      openViewTemplateDialog: false,
      confirmDialog: false,
      openPopover: false,
      popoverContent: null,
      anchorEl: null,
      template: null,
      templates: []
    }
  }

  openTemplate = () => {
    this.setState({
      openTemplateDialog: true
    });
  };

  openViewTemplate = () => {
    this.setState({
      openViewTemplateDialog: true
    });
  };

  closeDialog = () => {
    this.setState({
      openTemplateDialog: false,
      openViewTemplateDialog: false,
      template: null,
      confirmDialog: false
    });
  };

  createTemplate = () => {
    this.setState({
      dialogTitle: 'Ajouter un Modèle'
    }, this.openTemplate);
  }

  editTemplate = (id) => {
    const template = this.getTemplate(id);
    this.setState({
      template,
      dialogTitle: `Modifier (${template.t_name})`
    }, this.openTemplate);
  }

  viewTemplate = (id) => {
    const template = this.getTemplate(id);
    this.setState({
      template,
      dialogTitle: `Apercu de: (${template.t_name})`
    }, this.openViewTemplate);
  }

  deleteTemplate = (id) => {
    const template = this.getTemplate(id);
    this.setState({
      confirmDialog: true,
      dialogTitle: `Supprimer ${template.t_name}?`,
      deleteTemplateId: id
    });
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

  getTemplates = () => {
    fetch('/template/findAll')
      .then(response => response.json())
      .then(data => this.setState({ templates: data }))
      .catch(error => console.error(error.message));
  }

  handleCallback = () => {
    this.getTemplates();
    this.closeDialog();
  }

  componentDidMount() {
    this.getTemplates();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.openTemplateDialog}
          onClose={this.closeDialog}
          width={'xl'}
          content={<Template template={this.state.template} callback={this.handleCallback} />}
        />
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.openViewTemplateDialog}
          onClose={this.closeDialog}
          width={'xl'}
          content={<TemplateView template={this.state.template} />}
        />
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.confirmDialog}
          onClose={this.closeDialog}
          width='sm'
          content={
            <Confirm
              text={'Êtes-vous sûr de vouloir supprimer ce modèle?'}
              onConfirm={() => deleteTemplate(this.state.deleteTemplateId, this.handleCallback)}
              onCancel={this.closeDialog}
            />}
        />
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle lg="10" title="Modèles" subtitle="Liste de tous les modèles" className="text-sm-left" />
          <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.createTemplate}>
            <AddIcon /> AJOUTER MODÈLE
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
                        Nom du modèle
                      </th>
                      <th scope="col" className="border-0">
                        Nombre de parties
                      </th>
                      <th scope="col" className="border-0">
                        Contrôles
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.templates.map((t, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{t.t_name}</td>
                            <td>{t.number_parties}</td>
                            <td className='list-controls'>
                              <Tooltip title="Apercu du Modèle">
                                <IconButton aria-label="view template" color="primary" onClick={() => this.viewTemplate(t.id)}>
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Modifier Modèle">
                                <IconButton aria-label="edit template" color="primary" onClick={() => this.editTemplate(t.id)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Supprimer Modèle">
                                <IconButton aria-label="delete template" color="secondary"
                                  onClick={() => this.deleteTemplate(t.id)}>
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
