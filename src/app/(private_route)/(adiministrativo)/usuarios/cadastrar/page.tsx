"use client"; // Marca o componente para uso no cliente
import UserRegisterProvider from "@/provider/UserRegister";
import { Box, Button, Divider, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import UserCreate from "@/actions/user/create";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import BotaoCancelar from "@/components/botoes/btn_cancelar";
import Permissoes from "@/components/usuarios_component/permissoes";

// Componente de cadastro de usuário com layout responsivo e clean code
export default function CadastrarUsuario() {
  return (
    <Flex
      // minH="90.9dvh"
      bg="gray.100"
      py={{ base: 4, md: 8 }}
      px={{ base: 2, md: 2 }}
    >
      <Box
        w={"100%"}
        bg="gray.50"
        borderRadius="1rem"
        boxShadow="lg"
        h={"100%"}
        p={{ base: 4, md: 8 }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "start", md: "center" }}
          mb={4}
          gap={2}
        >
          <Heading fontSize={{ base: "xl", md: "2xl" }}>Criar Usuário</Heading>
          {/* Box vazio para alinhar o título se necessário, pode ser removido se não houver nada à direita */}
          <Box></Box>
        </Flex>
        <Divider my={2} borderColor="gray.400" />
        <CardCreateUpdate.Form action={UserCreate}>
          <UserRegisterProvider>
            <VStack spacing={6} align="stretch" w="full">
              {/* Seção Dados Pessoais */}
              <Box as="section">
                <Heading as="h3" size="md" mb={3} fontWeight="semibold">
                  Dados Pessoais
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                  <CardCreateUpdate.GridCpf />
                  <CardCreateUpdate.GridName />
                  <CardCreateUpdate.GridUser />
                  <CardCreateUpdate.GridRegisterTel />
                  <CardCreateUpdate.GridEmail />
                </SimpleGrid>
              </Box>

              {/* Seção Associações */}
              <Box as="section">
                <Heading as="h3" size="md" mb={3} fontWeight="semibold">
                  Associações
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                  <CardCreateUpdate.GridUserConstrutora />
                  <CardCreateUpdate.GridUserEmpreendimento />
                  <CardCreateUpdate.GridUserFinanceiro />
                </SimpleGrid>
              </Box>

              {/* Seção Acesso e Hierarquia */}
              <Box as="section">
                <Heading as="h3" size="md" mb={3} fontWeight="semibold">
                  Acesso e Hierarquia
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  <CardCreateUpdate.GridUserCargo />
                  <CardCreateUpdate.GridUserHierarquia />
                </SimpleGrid>
              </Box>

              {/* Seção Senha */}
              <Box as="section">
                <Heading as="h3" size="md" mb={3} fontWeight="semibold">
                  Senha
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  <CardCreateUpdate.GridUserSenha />
                  <CardCreateUpdate.GridUserConfirSenha />
                </SimpleGrid>
              </Box>

              {/* Seção Permissões - O componente Permissoes já possui seu próprio Heading e estrutura interna */}
              <Permissoes />
            </VStack>
          </UserRegisterProvider>

          <Divider my={6} borderColor="gray.400" />
          <Flex w="full" justify="flex-end" gap={4} mb={4}>
            <Button type="submit" colorScheme="green" size="md" className="btn">
              Salvar
            </Button>
            <BotaoCancelar
              colorScheme="red"
              variant="outline"
              size="md"
              className="btn"
            />
          </Flex>
        </CardCreateUpdate.Form>
      </Box>
    </Flex>
  );
}
