import React from "react";
import {Card} from "react-bulma-components";
import FontAwesome from "react-fontawesome";
import {withRouter} from "react-router-dom";

const FooterItem = ({className, iconName, text, history, to}) => (
    <Card.Footer.Item renderAs="a" className={className} onClick={() => { history.push(to) }}>
        <FontAwesome name={iconName}/>&nbsp;{text}
    </Card.Footer.Item>
);
const FooterItemLink = withRouter(FooterItem);

export const TaskCard = ({ id, name, dateEnd }) => (
    <Card style={{ marginBottom: "1rem" }}>
        <Card.Header>
            <Card.Header.Title>
                {name}
            </Card.Header.Title>
        </Card.Header>
        <Card.Footer>
            <Card.Footer.Item renderAs="span" className="has-text-black">
                <FontAwesome name="calendar"/>&nbsp;
                {dateEnd && `${dateEnd.toLocaleString([], {dateStyle: 'short', timeStyle: 'short'})}`}
            </Card.Footer.Item>
            <FooterItemLink
                to={`/${id}/edit`}
                text='Edytuj'
                iconName='edit'
                className='has-text-link'
            />
            <FooterItemLink
                to={`/${id}/remove`}
                text='Usuń'
                iconName='trash'
                className='has-text-danger'
            />
        </Card.Footer>
    </Card>
);