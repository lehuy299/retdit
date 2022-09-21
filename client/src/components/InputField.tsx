import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'

interface InputFieldProps {
    name: string,
    label: string,
    placeholder: string
}

const InputField = (props: InputFieldProps) => {
    const [field, {error}] = useField(props)

    return (
        <FormControl>
            <FormLabel htmlFor='username'>
                {props.label}
            </FormLabel>
            <Input
                id={field.name}
                placeholder={props.placeholder}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}

export default InputField