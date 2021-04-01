import React, { useEffect } from "react";

const View = ({ template, tenant, property, contract }) => {

    const id = template ? template.id : null;
    const [html, setHTML] = React.useState([]);
    const getSections = () => {
        fetch('/template_sections/findAll/' + id)
            .then(response => response.json())
            .then(data => {
                const res = [];
                data.map((c, idx) => {
                    let _html = JSON.parse(c.content).content;
                    // Tenant
                    _html = _html.replaceAll('{tenant_name}', tenant.firstName + ' ' + tenant.lastName);
                    _html = _html.replaceAll('{tenant_phone}', tenant.phoneNumber);
                    _html = _html.replaceAll('{tenant_email}', tenant.email);
                    _html = _html.replaceAll('{tenant_cni}', tenant.cni);
                    _html = _html.replaceAll('{tenant_cni_date}', tenant.cni_date && tenant.cni_date.split('T')[0]);
                    _html = _html.replaceAll('{tenant_address}', tenant.address);
                    _html = _html.replaceAll('{tenant_job}', tenant.job);

                    // Property
                    _html = _html.replaceAll('{property_name}', property.propertyName);
                    _html = _html.replaceAll('{property_unit}', property.unit);
                    _html = _html.replaceAll('{property_area}', property.surface_area);

                    // Contract
                    _html = _html.replaceAll('{contract_duration}', contract.duration);
                    _html = _html.replaceAll('{contract_start}', contract.start_date && contract.start_date.split('T')[0]);
                    _html = _html.replaceAll('{contract_end}', contract.end_date && contract.end_date.split('T')[0]);
                    _html = _html.replaceAll('{contract_amount}', contract.amount);

                    res.push(<div key={idx} dangerouslySetInnerHTML={{ __html: _html }} />);
                })

                setHTML(res);
            })
            .catch(error => console.error(error.message));
    }

    useEffect(() => {
        template && getSections();
    }, [template]);

    return (
        <div className='contract-container' id='contract-container'>
            <hr />
            <div className='contract-content'>
                {html.map((v) => v)}
            </div>
        </div>
    )
}

export default View;
