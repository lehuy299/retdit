import { useMutation } from '@apollo/client'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { registerMutation } from '../components/graphql-client/mutations'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'

const Register = () => {
    type UserMutationResponse = {
        code: number,
        success: boolean,
        message: string,
        user: string,
        errors: string
    }

    type NewUserInput = {
        username: string,
        email: string,
        password: string
    }

    const initialValues = { username: '', email: '', password: '' }

    const [registerUser, { data, errors }] = useMutation<
        {register: UserMutationResponse},
        {registerInput: NewUserInput}
    >(registerMutation)

    const onRegisterSubmit = (values: NewUserInput) => {
        registerUser({
            variables: {
                registerInput: values
            }
        })
    }

    return (
        <Wrapper>
            {errors && <p>Failed to register</p>}
            {data && data.register.success && <p>Registered successfully {JSON.stringify(data)}</p>}
            <Formik initialValues={initialValues} onSubmit={onRegisterSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <FormControl>
                            <InputField
                                name='username'
                                label='Username'
                                placeholder='Username'
                                type='text'
                            />
                            <Box mt={4}>
                                <InputField
                                    name='email'
                                    label='Email'
                                    placeholder='Email'
                                    type='text'
                                />
                            </Box>
                            <Box mt={4}>
                                <InputField
                                    name='password'
                                    label='Password'
                                    placeholder='Password'
                                    type='password'
                                />
                            </Box>
                            <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>
                                Register
                            </Button>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </Wrapper>

    )
}

export default Register