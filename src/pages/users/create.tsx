import { Box, Flex, Heading, HStack, VStack, Divider, SimpleGrid, Button } from "@chakra-ui/react";
import Link from "next/link";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Digite no minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais'),
});

export default function CreateList() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const handleCreateuser: SubmitHandler<CreateUserFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(data);
  } 

  return (
    <Box>
      <Header />

      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box 
          as="form"
          flex="1" 
          borderRadius={8} 
          p={["6", "8"]} 
          bg="gray.800"
          onSubmit={handleSubmit(handleCreateuser)}
        >
            <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid
                minChildWidth="240px"
                spacing={["6", "8"]}
                w="100%"
              >
                <Input 
                  name="name"
                  label="Nome Completo"
                  error={errors.name}
                  {...register('name')}
                />

                <Input 
                  name="email"
                  label="Email"
                  type="email"
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid
                minChildWidth="240px"
                spacing={["6", "8"]}
                w="100%"
              >
                <Input 
                  name="password"
                  label="Password"
                  type="password"
                  error={errors.password}
                  {...register('password')}
                />

                <Input 
                  name="password_confirm"
                  label="Password Confirm"
                  type="password"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack>

            <Flex
              mt="8"
              justify="flex-end"
            >
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button
                    as="a"
                    colorScheme="whiteAlpha"
                  >
                    Cancelar
                  </Button>
                </Link>

                <Button 
                  type="submit" 
                  colorScheme="pink"
                  isLoading={isSubmitting}
                >Salvar</Button>
              </HStack>
            </Flex>
        </Box>
      </Flex>
    </Box>
  )
}