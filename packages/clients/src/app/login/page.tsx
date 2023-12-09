'use client'

import { VStack, ButtonGroup, FormControl, FormLabel, Button, FormErrorMessage, Input, Heading, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup';
// @ts-ignore 
import { formSchemaLogin } from '@app-messages/common';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/services/axios-instance';
import { useContext, useEffect } from 'react';
import { AccountContext } from './AccountContext';

interface Inputs {
    username: string;
    password: string
}

const Login = () => {
    const { setUser } = useContext(AccountContext);
    const toast = useToast();
    const { register, handleSubmit, formState, reset } = useForm<Inputs>({
        resolver: yupResolver(formSchemaLogin),
    });
    const { errors } = formState;

    const router = useRouter();

    const onSubmit = (data: any) => {
        axiosInstance.post('/auth/login', data)
            .then((res) => {
                reset();
                router.push('/home');
                setUser({...res.data});
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
            <Heading>Login</Heading>
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

            <ButtonGroup pt='1rem' >
                <Button colorScheme='teal' type='submit'>Entrar</Button>
                <Button onClick={() => router.push('/register')}>Criar Conta</Button>
            </ButtonGroup>
        </VStack>
    )
}

export default Login