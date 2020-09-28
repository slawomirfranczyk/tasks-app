import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bulma-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import 'react-datepicker/dist/react-datepicker.min.css';
import pl from 'date-fns/locale/pl';
const { Input, Textarea, Field, Control, Label, Help } = Form;
registerLocale('pl', pl);

export const FormField = ({ label, ...props }) => {

    const [field] = useField(props);
    const { setFieldValue, touched, errors, handleBlur } = useFormikContext();
    const inputValidationState = touched[field.name] ? (errors[field.name] ? 'is-danger' : 'is-success') : '';
    const errorMessage = touched[field.name] && errors[field.name];

    const fieldTypes = {
        text: () => <Input id={field.name} {...field} {...props} className={inputValidationState}/>,
        textarea: () => <Textarea id={field.name} {...field} {...props} className={inputValidationState}/>,
        date: () => <DatePicker
            locale="pl"
            popperPlacement="top-start"
            id={field.name}
            {...field}
            {...props}
            dateFormat="yyyy-MM-dd h:mm"
            showTimeSelect
            placeholderText={props.placeholder}
            selected={field.value}
            onChange={val => {
                handleBlur({target: {name: field.name}});
                setFieldValue(field.name, val)
            }}
            minDate={new Date()}
            className={`input ${inputValidationState}`}
        />
    };

    return (
        <Field>
            <Label htmlFor={field.name}>{label}</Label>
            <Control>
                {fieldTypes[props.type] && fieldTypes[props.type]()}
            </Control>
            {inputValidationState === 'is-danger' && <Help color='danger'>{errorMessage}</Help>}
        </Field>
    );
};

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string
};

FormField.defaultProps = {
    type: 'text'
};