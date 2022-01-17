import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import GetWidths from "../../../utils/GetWidths";
import { Button } from "../../../styled";
import { FaBars } from "react-icons/fa";

interface IProps {
  isSidebarActive: Boolean;
  setIsSidebarActive: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Header = ({ isSidebarActive, setIsSidebarActive }: IProps) => {
  return (
    <Flex
      as="article"
      bgGradient="linear(to-br, blue.200, purple.100,orange.100)"
      w={GetWidths(["100%", "250px", "100%"])}
      px={3}
      justifyContent={"space-between"}
      borderRadius={{ base: 0, sm: 10 }}
      mr={GetWidths(["0", "1rem", "0"])}
    >
      <Flex
        h={GetWidths(["72px", "100%", "136px"])}
        justifyContent={GetWidths(["center", "flex-end", "flex-end"])}
        flexDir={"column"}
        color={"white"}
        p={GetWidths(["0", "1rem", "1rem"])}
      >
        <Text fontWeight={"600"} fontSize={GetWidths(["15px", "20px", "20px"])}>
          Frontend Mentor
        </Text>
        <Text>Product Board</Text>
      </Flex>
      <Button
        onClick={() => setIsSidebarActive(!isSidebarActive)}
        display="flex"
      >
        {!isSidebarActive ? (
          <FaBars style={{ color: "white" }} />
        ) : (
          <AiOutlineClose style={{ color: "white" }} />
        )}
      </Button>
    </Flex>
  );
};

export default Header;
