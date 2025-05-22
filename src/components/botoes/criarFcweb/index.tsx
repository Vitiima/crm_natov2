"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState, useRef } from "react";
import { AuthUser } from "@/types/session";


interface CriarFcwebProps {
  Dados: solictacao.SolicitacaoObjectType;
  user: AuthUser;
}

export function CriarFcweb({ Dados, user }: CriarFcwebProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const hierarquia = user?.hierarquia;
  const route = useRouter();

  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    onClose();
    setLoading(true);
    try {
      const response = await fetch("/api/fcweb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          s_alerta: "ATIVADO",
          referencia: `${new Date().toISOString().split("T")[0].split("-").reverse().join("-")}.${new Date().toLocaleTimeString()}`,
          unidade: "1",
          criou_fc: "API",
          cpf: Dados?.cpf,
          nome: Dados?.nome,
          contador: "NATO_",
          obscont:
            `Criado Por: ${user?.nome} - Empreendimento: ${Dados?.empreedimento.nome} - vendedor: ${Dados?.corretor.nome} - ( ${new Date().toLocaleDateString('pt-BR') } ${new Date().toLocaleTimeString('pt-BR')} )`,
          tipocd: "A3PF Bird5000",
          valorcd: Dados?.valorcd,
          formapgto: "PENDURA",
          telefone: Dados?.telefone,
          email: Dados?.email,
          dtnascimento: Dados?.dt_nascimento,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast({
          title: "Erro ao criar FCWEB",
          description: errorText,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        return;
      }

      const json = await response.json();
      toast({
        title: "Sucesso!",
        description: json.message,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: error.message || "Verifique o console",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      route.refresh();
    }
  };

  return (
    <>
      {hierarquia === "ADM" && (
        <>
          <Button
            colorScheme="cyan"
            size={"sm"}
            isLoading={Loading}
            onClick={onOpen}
          >
            Criar FCWEB
          </Button>
          <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Criar FCWEB
                </AlertDialogHeader>

                <AlertDialogBody>
                  Tem certeza que deseja criar o FCWEB?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    colorScheme="red"
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button colorScheme="green" onClick={handleSubmit} ml={3}>
                    Criar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </>
  );
}
