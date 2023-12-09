'use client'

import { VStack, ButtonGroup, FormControl, FormLabel, Button, FormErrorMessage, Input, Heading, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup';
// @ts-ignore
import { formSchemaRegister } from '@app-messages/common';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/services/axios-instance';

interface Inputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const toast = useToast()
  const { register, handleSubmit, formState, reset } = useForm<Inputs>({
    resolver: yupResolver(formSchemaRegister),
  });
  const { errors } = formState;

  const router = useRouter()

  const onSubmit = (data: any) => {

    const body = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    axiosInstance.post('/auth/register', body)
      .then((res) => {
        reset();
        router.push('/home')
      }).catch((err) => {
        toast({
          title: 'Erro',
          description: err.response.statusText,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      })
  }

  return (
    <VStack
      as='form'
      w={{ base: '900', md: '500px' }}
      m='auto'
      justify='center'
      h='100vh'
      spacing='1rem'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Registrar</Heading>
      <FormControl isInvalid={errors.username && formState.touchedFields?.username}>
        <FormLabel fontSize='lg' >Usuário</FormLabel>
        <Input
          placeholder='Usuário'
          autoComplete='off'
          size='lg'
          {...register("username")}
        />
        {errors.username?.message &&
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        }
      </FormControl>

      <FormControl isInvalid={errors.username && formState.touchedFields?.username}>
        <FormLabel fontSize='lg' >Email</FormLabel>
        <Input
          placeholder='Email'
          autoComplete='off'
          size='lg'
          {...register("email")}
        />
        {errors.username?.message &&
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        }
      </FormControl>

      <FormControl isInvalid={errors.password && formState.touchedFields?.password}>
        <FormLabel fontSize='lg'>Senha</FormLabel>
        <Input
          placeholder='Senha'
          autoComplete='off'
          size='lg'
          type='password'
          {...register("password")}
        />
        {errors.password?.message &&
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        }
      </FormControl>

      <FormControl isInvalid={errors.username && formState.touchedFields?.username}>
        <FormLabel fontSize='lg' >Confirmar Senha</FormLabel>
        <Input
          placeholder='Confirmar Senha'
          autoComplete='off'
          size='lg'
          type='password'
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message &&
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        }
      </FormControl>

      <ButtonGroup pt='1rem' >
        <Button colorScheme='teal' type='submit'>Registrar</Button>
        <Button onClick={() => router.push('/login')}>Voltar</Button>
      </ButtonGroup>
    </VStack>
  )
}

export default SignUp