import { Flex, Text } from "@chakra-ui/react";
type CardInfoDashboardProps = {
  title: string;
  value: string;
  icon: any;
};
export default function CardInfoDashboard({
  title,
  value,
  icon,
}: CardInfoDashboardProps) {
  return (
    <Flex
      rounded={"12px"}
      shadow={"md"}
      border={"1px solid #b8b8b8cc"}
      wrap={"wrap"}
      alignItems={"start"}
      p={4}
      w={"100%"}
      _hover={{ shadow: "xl" }}
    >
      <Flex w={"full"} justifyContent={"space-between"}>
        <Text fontSize={"md"}>{title}</Text>
        <Flex
          bg="rgba(129, 200, 137, 0.6)"
          alignItems={"center"}
          rounded={"8px"}
          p={2}
        >
          {icon}
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          {value}
        </Text>
      </Flex>
    </Flex>
  );
}
