import {
  Box,
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip,
} from "@chakra-ui/react";
import { MdOutlineInsertPageBreak } from "react-icons/md";

interface DistratoIconComponentProps extends IconButtonProps {
  distrato?: boolean;
  andamento?: string | null;
}

export const DistratoIconComponent = ({
  distrato,
  andamento,
  ...props
}: DistratoIconComponentProps) => {
  const Aparecer =
    andamento === "APROVADO"
      ? false
      : andamento === "EMITIDO"
      ? false
      : andamento === "REVOGADO"
      ? false
      : true;

  if (!Aparecer) {
    return (
      <Box as="span">
        <Icon
          as={MdOutlineInsertPageBreak}
          color={"gray.300"}
          fontSize={"1.2rem"}
          fontWeight={"900"}
          mx={2}
          cursor="not-allowed"
          mt={1.5}
        />
      </Box>
    );
  } else {
    return (
      <>
        {!distrato ? (
          <Tooltip label="Distrato">
            <Box as="span">
              <IconButton
                colorScheme="red"
                variant="outline"
                size={"sm"}
                icon={<MdOutlineInsertPageBreak />}
                {...props}
              />
            </Box>
          </Tooltip>
        ) : (
          <Box as="span">
            <Icon
              as={MdOutlineInsertPageBreak}
              color={"gray.300"}
              fontSize={"1.2rem"}
              fontWeight={"900"}
              mx={2}
              cursor="not-allowed"
              mt={1.5}
            />
          </Box>
        )}
      </>
    );
  }
};
