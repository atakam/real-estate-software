import React, { useEffect } from "react";

const View = ({ template }) => {

    const id = template ? template.id : null;
    const [html, setHTML] = React.useState([]);
    const getSections = () => {
        fetch('/template_sections/findAll/' + id)
            .then(response => response.json())
            .then(data => {
                const res = [];
                data.map((c, idx) => {
                    res.push(<div key={idx} dangerouslySetInnerHTML={{ __html: JSON.parse(c.content).content }} />);
                })
                setHTML(res);
            })
            .catch(error => console.error(error.message));
    }

    useEffect(() => {
        template && getSections();
    }, [template]);

    return (
        <div className='contract-container'>
            <hr />
            <div className='contract-content'>
                {html.map((v) => v)}
            </div>
        </div>
    )
}

export default View;
