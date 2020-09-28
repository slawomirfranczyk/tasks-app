import React from 'react';
import {Modal} from "./Modal";
import { Button } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import { deleteTask } from "../services";

export const RemoveTaskModal = ({onClose, ...props}) => {

    const {match: {params: {id}}} = props;
    const dispatch = useDispatch();
    const handleRemoveTask = () => {
        dispatch(deleteTask(id));
        onClose();
    };

    return (
        <Modal
            show={!!id}
            headerTitle={'Usuń zadanie'}
            buttons={
                <>
                    <Button className="is-white" onClick={onClose}>Anuluj</Button>
                    <Button className="is-danger" onClick={handleRemoveTask}>Usuń</Button>
                </>
            }
        >
            <p>Czy napewno chcesz usunąć zadanie?</p>
        </Modal>
    )
};