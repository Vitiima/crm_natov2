"use client";

import BtRemoverDistrato from "@/components/botoes/bt_Remover_Distrato";
import { Box, BoxProps } from "@chakra-ui/react";

interface CardGridDistratoProps extends BoxProps {
  Id: any;
  User: any;
}

export default function CardGridDistrato({ Id, User, ...props }: CardGridDistratoProps) {
  const Hierarquia = User?.hierarquia;

  return (
    <Box {...props}>
      {Hierarquia === "ADM" && (
        <>
          <BtRemoverDistrato id={Id} />
        </>
      )}
      {Hierarquia === "CCA" && (
        <>
          <BtRemoverDistrato id={Id} />
        </>
      )}
    </Box>
  );
}
