import React from 'react';
import { Modal as BulmaModal } from 'react-bulma-components';

export const Modal = ({show=true, headerTitle, children, buttons}) => {

    return (
        <BulmaModal show={show} onClose={() => ""}>
            <BulmaModal.Card>
                <BulmaModal.Card.Head showClose={false}>
                    <BulmaModal.Card.Title>{headerTitle}</BulmaModal.Card.Title>
                </BulmaModal.Card.Head>
                <BulmaModal.Card.Body>
                    {children}
                </BulmaModal.Card.Body>
                <BulmaModal.Card.Foot style={{alignItems: "center", justifyContent: "flex-end"}}>
                    {buttons}
                </BulmaModal.Card.Foot>
            </BulmaModal.Card>
        </BulmaModal>
    )
};