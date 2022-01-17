import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import GoBack from "../GoBack";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex
      bg="black.400"
      w="100%"
      justifyContent={"space-between"}
      h={{ base: "100px", sm: "113px" }}
      as="header"
      borderRadius={{ base: "0", sm: 10 }}
      color={"white.100"}
      p="0 10px"
      alignItems={"center"}
      mb={{ base: "0", sm: "2rem" }}
    >
      <VStack spacing={-1}>
        <GoBack iconColor={"#fff"} />
        <Text fontWeight={"bold"} fontSize={{ base: "18px", sm: "24px" }}>
          Roadmap
        </Text>
      </VStack>
      <Button
        onClick={() => navigate("/create")}
        size="sm"
        leftIcon={<AiOutlinePlus />}
        background="purple.100"
        _hover={{ background: "purple.200" }}
        variant="solid"
      >
        Add Feedback
      </Button>
    </Flex>
  );
};

export default Header;
