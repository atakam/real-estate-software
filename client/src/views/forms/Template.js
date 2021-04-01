import React, { useEffect } from "react";
import {
    Card,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    Button
} from "shards-react";
import AddIcon from '@material-ui/icons/Add';
import { updateTemplate, createTemplate } from "../../utils/actions";
import 'draft-js/dist/Draft.css';
import { getHtmlFromJSDraft, getDraftFromHtml } from '../../utils/template';
import RichText from "../../components/common/richtext/RichText";
import { EditorState } from "draft-js";

const UserAccountDetails = ({ template, callback }) => {

    const id = template ? template.id : null;
    const [t_name, setName] = React.useState(template ? template.t_name : '');
    const [number_parties, setNumParties] = React.useState(template ? template.number_parties : '');
    const [sections, setSections] = React.useState([]);

    const getSections = () => {
        fetch('/template_sections/findAll/' + id)
            .then(response => response.json())
            .then(data => {
                const contentArr = data.map((d) => {
                    return {
                        id: d.id,
                        title: JSON.parse(d.content).title,
                        content: getDraftFromHtml(JSON.parse(d.content).content).toJS()
                    };
                })
                setSections(contentArr)
            })
            .catch(error => console.error(error.message));
    }

    const values = {
        id,
        t_name,
        number_parties,
        sections
    };

    const submitTemplate = () => {
        if (id) { // update template
            values.sections = values.sections.map((d) => {
                return {
                    id: d.id,
                    title: d.title,
                    content: getHtmlFromJSDraft(d.content)
                };
            })
            updateTemplate(values, callback);
        } else { // create template
            createTemplate(values, callback);
        }
    }

    const handleTitleChange = (index, value) => {
        const section = JSON.parse(JSON.stringify(sections));
        section[index].title = value;
        setSections(section);
    }

    const handleContentChange = (index, value) => {
        const section = JSON.parse(JSON.stringify(sections));
        section[index].content = value.toJS();
        setSections(section);
    }

    const addSection = () => {
        const section = JSON.parse(JSON.stringify(sections));
        section.push({
            title: '',
            content: EditorState.createEmpty().toJS(),
            position: sections.length
        });
        setSections(section);
    }

    useEffect(() => {
        template && getSections();
    }, [template]);

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
                                        <label htmlFor="feName">Nom du modèle</label>
                                        <FormInput
                                            id="feName"
                                            placeholder="nom"
                                            value={t_name}
                                            onChange={(e) => setName(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feParties">Nombre de parties</label>
                                        <FormInput
                                            id="feParties"
                                            placeholder="#"
                                            value={number_parties}
                                            onChange={(e) => setNumParties(e.currentTarget.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    {
                                        sections.map((c, idx) => {
                                            return (
                                                <Col md="6" className="form-group" key={idx}>
                                                    <label htmlFor={'t' + idx}>Section #{idx + 1}</label>
                                                    <FormInput
                                                        id={'t' + idx}
                                                        placeholder={'Titre de la section'}
                                                        value={c.title}
                                                        onChange={(e) => handleTitleChange(idx, e.currentTarget.value)}
                                                    />
                                                    <RichText editorState={EditorState.fromJS(c.content)} onChange={(value) => handleContentChange(idx, value)} />
                                                </Col>
                                            );
                                        })
                                    }
                                    <Col md="6" className="form-group">
                                        <label />
                                        <Button outline theme="success" onClick={addSection} className='add-section'><AddIcon /> Add Section</Button>
                                    </Col>
                                </Row>
                                <Button theme="accent" onClick={submitTemplate}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default UserAccountDetails;
