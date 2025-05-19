import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { FaRunning } from "react-icons/fa";

interface AndamentoIconComponentProps {
  andamento?: boolean;
}

export const AndamentoIconComponent = ({ andamento }: AndamentoIconComponentProps) => {
  return (
    <>
      {andamento ? (
        <Tooltip label="Em Andamento">
          <Box as="span">
            <Icon
              as={FaRunning}
              color={"green.500"}
              fontSize={"1.5rem"}
              fontWeight={"900"}
              ms={2}
            />
          </Box>
        </Tooltip>
      ) : (
        <Box as="span">
          <Icon
            as={FaRunning}
            color={"gray.300"}
            fontSize={"1.5rem"}
            fontWeight={"900"}
            cursor="not-allowed"
            m={"auto"}
          />
        </Box>
      )}
    </>
  );
};