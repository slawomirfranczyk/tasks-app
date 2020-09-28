import React, {useEffect, useRef} from 'react';
import {Modal} from "./Modal";
import {Formik, Form} from 'formik';
import {FormField} from './FormField';
import * as yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {getTaskForEdit} from "../redux/actions";
import { Button } from 'react-bulma-components';
import {createTask, updateTask} from "../services";

export const EditTaskModal = ({onClose, onSave, ...props}) => {

    const {match: {params: {id}}} = props;
    const task = useSelector(state => state.taskForEdit);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTaskForEdit(id));
    }, [id, dispatch]);

    const inputs = [
        {
            name: 'name',
            label: 'Nazwa',
            validation: yup.string().trim().required('Uzupełnij nazwę zadania')
        },
        {
            name: 'description',
            label: 'Opis zadania',
            type: 'textarea'
        },
        {
            name: 'dateEnd',
            label: 'Czas zakończenia',
            type: 'date',
            validation: yup.date('Wprowadzono nieprawidłowy format daty').required('Uzupełnij datę')
        }
    ];

    const getValidationRules = inputs => {
        const validationRules = {};
        inputs.forEach(({name, validation}) => {
            validationRules[name] = validation
        });
        return validationRules;
    };

    const initValues = Object.fromEntries(inputs.map(item => [[item.name], '']));
    const validationSchema = yup.object().shape(getValidationRules(inputs));

    const formRef = useRef();
    const handleSubmit = () => {
        if(formRef.current) {
            formRef.current.handleSubmit();
        }
    };

    const handleOnSubmit = async (values) => {
        const { id, dateEnd, ...rest } = values;
        const formattedValues = {...rest, dateEnd: dateEnd && dateEnd.toISOString()};

        if (id) {
            dispatch(updateTask({id, ...formattedValues}))
                .then(onClose);
        } else {
            dispatch(createTask(formattedValues))
                .then(onClose);
        }
    };

    // ===

    return (
        <Modal
            headerTitle={`${id ? 'Edytuj' : 'Dodaj'} zadanie`}
            buttons={
                <>
                    <Button className="is-white" onClick={onClose}>Anuluj</Button>
                    <Button className="is-link" onClick={handleSubmit}>Zapisz</Button>
                </>
            }
        >
            <Formik
                innerRef={formRef}
                initialValues={task || initValues}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
            >
                <Form autoComplete="off">
                    {
                        inputs.map(({name, label, type}, index) =>
                            <FormField name={name} label={label} type={type} placeholder={label} key={index}/>)
                    }
                </Form>
            </Formik>
        </Modal>
    )
};