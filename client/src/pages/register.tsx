import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'

const Register = () => {
  return (
    <Wrapper>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={values => console.log(values)
        }>
            {({ isSubmitting }) => (
                <Form>
                    <FormControl>
                        <InputField
                            name='username'
                            label='username'
                            placeholder='Username'
                        />
                        <InputField
                            name='password'
                            label='password'
                            placeholder='Password'
                        />
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