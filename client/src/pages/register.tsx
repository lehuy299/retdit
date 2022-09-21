import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import Wrapper from '../components/Wrapper'

const Register = () => {
  return (
    <Wrapper>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={values => console.log(values)
        }>
            {({ values, handleChange }) => (
                <Form>
                    <FormControl>
                        <FormLabel htmlFor='username'>
                            Username
                        </FormLabel>
                        <Input  
                            id='username'
                            placeholder='Username'
                            value={values.username}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Form>
            )}
        </Formik>
    </Wrapper>
    
  )
}

export default Register