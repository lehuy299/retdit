import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'

interface InputFieldProps {
    name: string,
    label: string,
    placeholder: string,
    type: string
}

const InputField = (props: InputFieldProps) => {
    const [field, {error}] = useField(props)

    return (
        <FormControl>
            <FormLabel htmlFor='username'>
                {props.label}
            </FormLabel>
            <Input
                {...field}
                {...props}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}

export default InputField