/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react";
import { Sidebar, MainContent } from "../components/HomePage";
const HomePage = () => {
  return (
    <>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Sidebar />
        <MainContent />
      </Flex>
    </>
  );
};

export default HomePage;
